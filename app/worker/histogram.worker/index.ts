import { createMessage, MessageType, WorkerMessage } from "../share";
import { drawRGBHistogram, generateHistogramData } from "./utils";

const canvas = new OffscreenCanvas(256, 100);
const ctx = canvas.getContext("2d");

const handlersMap = {
  [MessageType.UPDATE_HISTOGRAM]: (data: Uint8ClampedArray) => {
    const bitmap = canvas.transferToImageBitmap();
    const histogramData = generateHistogramData(data, 255);
    drawRGBHistogram(histogramData, ctx!, 256, 100);

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
