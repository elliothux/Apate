import { EventProxy } from "./eventProxy";

export enum GlobalEventType {
  DRAW_HISTOGRAM = "draw_histogram",
  UPDATE_IMAGE = 'UPDATE_IMAGE'
}

export const globalEvent = new EventProxy<GlobalEventType>();
