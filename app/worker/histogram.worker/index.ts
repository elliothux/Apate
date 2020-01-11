import { createMessage, MessageType, WorkerMessage } from "../share";
import {
  drawRGBHistogram,
  generateHistogramData,
  HistogramData
} from "./utils";
import { loadWasmLib } from "../share";
import { Maybe } from "../../types";

const [width, height] = [256, 100];
const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext("2d");

let histogramData: Maybe<HistogramData> = null;

const handlersMap = {
  [MessageType.INIT]: async () => {
    await loadWasmLib();
    self.postMessage(createMessage(MessageType.READY));
  },

  [MessageType.UPDATE_HISTOGRAM]: ({
    data,
    expand
  }: {
    data: Uint8ClampedArray;
    expand: boolean;
  }) => {
    const h = expand ? height * 3 : height;
    if (h !== canvas.height) {
      ctx!.canvas.height = h;
      ctx!.clearRect(0, 0, width, h);
    }

    histogramData = generateHistogramData(data, 255, 100);
    drawRGBHistogram(ctx!, expand, histogramData);
    const bitmap = canvas.transferToImageBitmap();
    self.postMessage(createMessage(MessageType.UPDATE_HISTOGRAM, bitmap), [
      bitmap
    ]);
  },

  [MessageType.TOGGLE_HISTOGRAM_EXPAND]: (expand: boolean) => {
    drawRGBHistogram(ctx!, expand, histogramData!);
    const bitmap = canvas.transferToImageBitmap();
    self.postMessage(createMessage(MessageType.UPDATE_HISTOGRAM, bitmap), [
      bitmap
    ]);
  }
};

self.addEventListener("message", async ({ data: msg }) => {
  if (typeof msg !== "object") {
    return console.log(`Message received at histogram.worker: ${msg}`);
  }

  const { type, data } = msg as WorkerMessage;
  const handler = (handlersMap as any)[type];
  if (handler) {
    return handler(data);
  }

  return console.log(`Invalid message received at histogram.worker: ${type}`);
});
