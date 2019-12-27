import { getWasmLib, loadWasmLib } from "./loader";
import { createMessage, MessageType, WorkerMessage } from "./share";
import { Maybe } from "../types";

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

function createBitmapImage(
  width: number,
  height: number,
  data: Uint8ClampedArray
) {
  const lib = getWasmLib();
  return lib.Image.from(width, height, data as any);
}

function updateImageData() {
  const data = bitmapImage!.get_current_data_array();
  self.postMessage(createMessage(MessageType.GET_CURRENT_IMAGE_DATA, data));
}