import { Maybe } from "types";
import {
  createMessage,
  getWasmLib,
  loadWasmLib,
  MessageType,
  WorkerMessage
} from "../share";
import { getFilter } from "./utils";

const originalData = {
  width: 0,
  height: 0,
  data: new Uint8ClampedArray()
};

const handlersMap = {
  [MessageType.INIT]: async (
    data: Uint8ClampedArray,
    width: number,
    height: number
  ) => {
    originalData.data = data;
    originalData.width = width;
    originalData.height = height;

    await loadWasmLib();
    self.postMessage(createMessage(MessageType.READY));
  },

  [MessageType.LOAD_FILTER]: async ({
    collectionName,
    name
  }: {
    collectionName: string;
    name: string;
  }) => {
    await getFilter(collectionName, name);
    self.postMessage(createMessage(MessageType.LOAD_FILTER, { name }));
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
