import { createMessage, MessageType, WorkerMessage } from "./share";
import { imageStore } from "../state";

const worker = new Worker("./worker", { name: 'mine', type: "module" });

worker.addEventListener("message", ({ data: msg }) => {
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
      worker.removeEventListener("message", handler);
      resolve();
    };
    worker.addEventListener("message", handler);
    worker.postMessage(createMessage(MessageType.INIT));
  });
}

export function initImage(data: ImageData) {
  worker.postMessage(createMessage(MessageType.INIT_IMAGE, data));
}

export function getCurrentImageData() {
  worker.postMessage(createMessage(MessageType.GET_CURRENT_IMAGE_DATA));
}

export function setImageSaturation(v: number) {
  worker.postMessage(createMessage(MessageType.SET_IMAGE_SATURATION, v));
}

export function setImageBrightness(v: number) {
  worker.postMessage(createMessage(MessageType.SET_IMAGE_BRIGHTNESS, v));
}
