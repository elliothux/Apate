import { createMessage, MessageType, WorkerMessage } from "./share";
import { imageStore } from "../state";

const imageWorker = new Worker("./image.worker", {
  name: "image",
  type: "module"
});

imageWorker.addEventListener("message", ({ data: msg }) => {
  if (typeof msg !== "object") {
    return console.log(`Message received at main: ${msg}`);
  }

  const { type, data } = msg as WorkerMessage;

  switch (type) {
    case MessageType.GET_CURRENT_IMAGE_DATA: {
      return imageStore.rerenderImage(data);
    }

    case MessageType.READY:
      return;

    default: {
      return console.log(`Invalid message received at main: ${type}`);
    }
  }
});

export function init(): Promise<void> {
  return new Promise((resolve, reject) => {
    const handler = (message: MessageEvent) => {
      if (message.data.type !== MessageType.READY) {
        return;
      }
      imageWorker.removeEventListener("message", handler);
      resolve();
    };
    imageWorker.addEventListener("message", handler);
    imageWorker.postMessage(createMessage(MessageType.INIT));
  });
}

export function initImage(data: ImageData) {
  imageWorker.postMessage(createMessage(MessageType.INIT_IMAGE, data));
}

export function getCurrentImageData() {
  imageWorker.postMessage(createMessage(MessageType.GET_CURRENT_IMAGE_DATA));
}

export function setImageSaturation(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_SATURATION, v));
}

export function setImageTemperature(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_TEMPERATURE, v));
}

export function setImageTint(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_TINT, v));
}

export function setImageVibrance(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_VIBRANCE, v));
}

export function setImageBrightness(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_BRIGHTNESS, v));
}

export function setImageExposure(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_EXPOSURE, v));
}

export function setImageContrast(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_CONTRAST, v));
}

export function setImageHighlight(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_HIGHLIGHT, v));
}

export function setImageShadow(v: number) {
  imageWorker.postMessage(createMessage(MessageType.SET_IMAGE_SHADOW, v));
}

export function applyFilter(collection: string, name: string) {
  imageWorker.postMessage(
    createMessage(MessageType.APPLY_FILTER, { collection, name })
  );
}

export function unapplyFilter() {
  imageWorker.postMessage(createMessage(MessageType.UNAPPLY_FILTER));
}
