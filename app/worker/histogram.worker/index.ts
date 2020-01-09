import { createMessage, MessageType, WorkerMessage } from "../share";

const canvas = new OffscreenCanvas(521, 208);

const handlersMap = {
  [MessageType.UPDATE_SAMPLING]: () => {
    const bitmap = canvas.transferToImageBitmap();
    self.postMessage(
      createMessage(MessageType.UPDATE_SAMPLING, { buffer: bitmap }),
      [bitmap]
    );
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
