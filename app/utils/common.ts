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

export function downloadFile(
  file: string | Blob,
  fileType: string,
  fileName: string
) {
  const blob =
    typeof file === "string" ? new Blob([file], { type: fileType }) : file;

  const a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 2000);
}
