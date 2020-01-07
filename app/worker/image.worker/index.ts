import { Maybe } from "types";
import { createMessage, MessageType, WorkerMessage } from "../share";
import { loadWasmLib } from "./loader";
import { createBitmapImage } from "./utils";
import { getFilter } from "./filter";

let bitmapImage: Maybe<ReturnType<typeof createBitmapImage>> = null;

const handlersMap = {
  [MessageType.INIT]: async () => {
    await loadWasmLib();
    self.postMessage(createMessage(MessageType.READY));
  },

  [MessageType.INIT_IMAGE]: (data: ImageData) => {
    bitmapImage = createBitmapImage(data.width, data.height, data.data);
  },

  [MessageType.GET_CURRENT_IMAGE_DATA]: updateImageData,

  [MessageType.SET_IMAGE_BRIGHTNESS]: (v: number) => {
    bitmapImage!.set_brightness(v);
    updateImageData();
  },

  [MessageType.SET_IMAGE_SATURATION]: (v: number) => {
    bitmapImage!.set_saturation(v);
    updateImageData();
  },

  [MessageType.SET_IMAGE_TEMPERATURE]: (v: number) => {
    bitmapImage!.set_temperature(v);
    updateImageData();
  },

  [MessageType.SET_IMAGE_TINT]: (v: number) => {
    bitmapImage!.set_tint(v);
    updateImageData();
  },

  [MessageType.SET_IMAGE_VIBRANCE]: (v: number) => {
    bitmapImage!.set_vibrance(v);
    updateImageData();
  },

  [MessageType.SET_IMAGE_EXPOSURE]: (v: number) => {
    bitmapImage!.set_exposure(v);
    updateImageData();
  },

  [MessageType.SET_IMAGE_CONTRAST]: (v: number) => {
    bitmapImage!.set_contrast(v);
    updateImageData();
  },

  [MessageType.SET_IMAGE_HIGHLIGHT]: (v: number) => {
    bitmapImage!.set_highlight(v);
    updateImageData();
  },

  [MessageType.SET_IMAGE_SHADOW]: (v: number) => {
    bitmapImage!.set_shadow(v);
    updateImageData();
  },

  [MessageType.APPLY_FILTER]: async ({
    collection,
    name
  }: {
    collection: string;
    name: string;
  }) => {
    const filter = await getFilter(collection, name);
    // TODO
  }
};

self.addEventListener("message", async ({ data: msg }) => {
  if (typeof msg !== "object") {
    return console.log(`Message received at worker: ${msg}`);
  }

  const { type, data } = msg as WorkerMessage;
  const handler = (handlersMap as any)[type];
  if (handler) {
    return handler(data);
  }

  return console.log(`Invalid message received at worker: ${type}`);
});

function updateImageData() {
  const data = bitmapImage!.get_current_data_array();
  self.postMessage(createMessage(MessageType.GET_CURRENT_IMAGE_DATA, data));
}
