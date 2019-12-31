export enum MessageType {
  INIT = "init",
  READY = "ready",
  INIT_IMAGE = "init_image",
  GET_CURRENT_IMAGE_DATA = 'get_current_image_data',
  SET_IMAGE_SATURATION = 'set_image_saturation',
  SET_IMAGE_BRIGHTNESS= 'set_image_brightness',
  SET_IMAGE_TEMPERATURE= 'set_image_temperature',
  SET_IMAGE_TINT= 'set_image_tint',
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
