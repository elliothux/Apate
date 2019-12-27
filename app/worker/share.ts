export enum MessageType {
  INIT = "init",
  READY = "ready",
  INIT_IMAGE = "init_image",
  GET_CURRENT_IMAGE_DATA = 'get_current_image_data',
  SET_IMAGE_SATURATION = 'set_image_saturation',
  SET_IMAGE_BRIGHTNESS= 'set_image_brightness',
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
