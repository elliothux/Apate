import { throttle } from "throttle-debounce";
import { createMessage, MessageType, WorkerMessage } from "./share";
import { filterStore, imageStore, mainStore } from "../state";
import {
  getFilterString,
  globalEvent,
  GlobalEventType,
  saveFilter
} from "../utils";

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
    case MessageType.INIT_IMAGE: {
      return filterStore.loadAll();
    }

    case MessageType.GET_CURRENT_IMAGE_DATA: {
      imageStore.rerenderImage(data);
      return updateHistogram(data, mainStore.width, mainStore.height);
    }

    case MessageType.LOAD_FILTER: {
      const { name, snapshot, filterStr } = data;
      if (filterStr) {
        saveFilter(name, filterStr);
      }
      return filterStore.setFilterLoaded(name, snapshot);
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

export function init(): Promise<any> {
  return Promise.all([
    new Promise(resolve => {
      const handler = (message: MessageEvent) => {
        if (message.data.type !== MessageType.READY) {
          return;
        }
        imageWorker.removeEventListener("message", handler);
        resolve();
      };

      imageWorker.addEventListener("message", handler);
      imageWorker.postMessage(createMessage(MessageType.INIT));
    }),

    new Promise(resolve => {
      const handler = (message: MessageEvent) => {
        if (message.data.type !== MessageType.READY) {
          return;
        }
        histogramWorker.removeEventListener("message", handler);
        resolve();
      };

      histogramWorker.addEventListener("message", handler);
      histogramWorker.postMessage(createMessage(MessageType.INIT));
    })
  ]);
}

export function initImage(data: ImageData) {
  imageWorker.postMessage(createMessage(MessageType.INIT_IMAGE, data));
  updateHistogram(data.data, data.width, data.height);
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

export async function loadFilterCollection(
  collectionName: string,
  filters: string[]
) {
  imageWorker.postMessage(
    createMessage(MessageType.LOAD_FILTER, {
      collectionName,
      filters,
      filterStrings: await Promise.all(filters.map(i => getFilterString(i)))
    })
  );
}

export function applyFilter(collection: string, name: string) {
  imageWorker.postMessage(
    createMessage(MessageType.APPLY_FILTER, { collection, name })
  );
}

export function unapplyFilter() {
  imageWorker.postMessage(createMessage(MessageType.UNAPPLY_FILTER));
}

export const updateHistogram = throttle(
  2000,
  (data: Uint8ClampedArray, width: number, height: number) => {
    histogramWorker.postMessage(
      createMessage(MessageType.UPDATE_HISTOGRAM, {
        data,
        width,
        height,
        expand: mainStore.expandHistogram
      })
    );
  }
);

export function toggleHistogramExpand(expand: boolean) {
  histogramWorker.postMessage(
    createMessage(MessageType.TOGGLE_HISTOGRAM_EXPAND, expand)
  );
}
