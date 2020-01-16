import * as React from "react";
import { Maybe } from "../types";

export function noop() {}

export function preventSyntheticEvent<T = HTMLElement, E = Event>(
  e: React.SyntheticEvent<T, E> | Event
) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

export function isNumber(i: any): boolean {
  return typeof i === "number";
}

let mainCanvas: Maybe<HTMLCanvasElement> = null;

export function getMainCanvas(): Maybe<HTMLCanvasElement> {
  if (!mainCanvas) {
    mainCanvas = document.querySelector<HTMLCanvasElement>("#main-canvas");
  }
  return mainCanvas;
}
