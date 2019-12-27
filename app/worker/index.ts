// @ts-ignore
import { createMessage, MessageType } from "./share";

const worker = new Worker("./worker", { type: "module" });

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
