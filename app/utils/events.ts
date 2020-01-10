import { EventProxy } from "./eventProxy";

export enum GlobalEventType {
  DRAW_HISTOGRAM = "draw_histogram"
}

export const globalEvent = new EventProxy<GlobalEventType>();
