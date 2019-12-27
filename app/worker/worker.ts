import { loadWasmLib } from "./loader";
import { createMessage, MessageType, WorkerMessage } from "./share";

self.addEventListener("message", async ({ data: msg }) => {
  if (typeof msg !== "object") {
    console.log(`Worker message called: ${msg}`);
  }

  const { type, data } = msg as WorkerMessage;

  switch (type) {
    case MessageType.INIT: {
      await loadWasmLib();
      self.postMessage(createMessage(MessageType.READY));
      break;
    }

    default: {
      console.log(`Worker message called: ${type}`);
    }
  }
});
