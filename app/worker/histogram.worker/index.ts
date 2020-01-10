import { createMessage, MessageType, WorkerMessage } from "../share";
import { drawRGBHistogram, generateHistogramData } from "./utils";

const [width, height] = [256, 100];
const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext("2d");

const handlersMap = {
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
    }

    const bitmap = canvas.transferToImageBitmap();
    const histogramData = generateHistogramData(data, 255);
    drawRGBHistogram(histogramData, ctx!, width, height, expand);
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
