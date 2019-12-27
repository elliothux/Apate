export enum MessageType {
  INIT = "init",
  READY = "ready"
}

export interface WorkerMessage<T = any> {
  type: MessageType;
  data?: T;
}

export function createMessage<T>(
  type: MessageType,
  data?: T
): WorkerMessage<T> {
  return { type, data };
}
