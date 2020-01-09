import { Maybe } from "types";
import { createMessage, MessageType, WorkerMessage } from "../share";

const handlersMap = {
  [MessageType.UPDATE_SAMPLING]: () => {

  }
};

self.addEventListener("message", async ({ data: msg }) => {
  if (typeof msg !== "object") {
    return console.log(`Message received at sampling.worker: ${msg}`);
  }

  const { type, data } = msg as WorkerMessage;
  const handler = (handlersMap as any)[type];
  if (handler) {
    return handler(data);
  }

  return console.log(`Invalid message received at sampling.worker: ${type}`);
});