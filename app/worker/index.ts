import { throttle } from "throttle-debounce";
import { createMessage, MessageType, WorkerMessage } from "./share";
import { imageStore, mainStore } from "../state";
import { globalEvent, GlobalEventType } from "../utils";

const imageWorker = new Worker("./image.worker", {
  name: "image",
  type: "module"
});

const histogramWorker = new Worker("./histogram.worker", {
  name: "histogram",
  type: "module"
});

imageWorker.addEventListener("message", ({ data: msg }) => {
  if (typeof msg !== "object") {
    return console.log(`Message received at main: ${msg}`);
  }

  const { type, data } = msg as WorkerMessage;

  switch (type) {
    case MessageType.GET_CURRENT_IMAGE_DATA: {
      imageStore.rerenderImage(data);
      updateHistogram(data);
      return;
    }

    case MessageType.READY:
      return;

    default: {
      return console.log(`Invalid message received at main: ${type}`);
    }
  }
});

histogramWorker.addEventListener("message", ({ data: msg }) => {
  if (typeof msg !== "object") {
    return console.log(`Message received at main: ${msg}`);
  }

  const { type, data } = msg as WorkerMessage;

  switch (type) {
    case MessageType.UPDATE_HISTOGRAM: {
      return globalEvent.emit(GlobalEventType.DRAW_HISTOGRAM, data);
    }

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
  // TODO: fix
  iUpdateHistogram(data.data);
  setTimeout(() => iUpdateHistogram(data.data), 1000);
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

function iUpdateHistogram(data: Uint8ClampedArray) {
  histogramWorker.postMessage(
    createMessage(MessageType.UPDATE_HISTOGRAM, {
      data,
      expand: mainStore.expandHistogram
    })
  );
}

export const updateHistogram = throttle(2000, iUpdateHistogram);
