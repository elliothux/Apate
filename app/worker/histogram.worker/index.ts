import { createMessage, MessageType, WorkerMessage } from "../share";
import {
  drawRGBHistogram,
  generateHistogramData,
  HistogramData
} from "./utils";
import { loadWasmLib } from "../share";
import { Maybe } from "../../types";

const [histogramW, histogramH] = [256, 100];
const canvas = new OffscreenCanvas(histogramW, histogramH);
const ctx = canvas.getContext("2d");

let histogramData: Maybe<HistogramData> = null;

const handlersMap = {
  [MessageType.INIT]: async () => {
    await loadWasmLib();
    self.postMessage(createMessage(MessageType.READY));
  },

  [MessageType.UPDATE_HISTOGRAM]: ({
    data,
    expand,
    width,
    height
  }: {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    expand: boolean;
  }) => {
    const h = expand ? histogramH * 3 : histogramH;
    if (h !== canvas.height) {
      ctx!.canvas.height = h;
      ctx!.clearRect(0, 0, width, h);
    }

    histogramData = generateHistogramData(data, width, height, histogramW, histogramH);
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
