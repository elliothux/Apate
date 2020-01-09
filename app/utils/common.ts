import * as React from "react";

export function noop() {}

export function preventSyntheticEvent<T = HTMLElement, E = Event>(
  e: React.SyntheticEvent<T, E> | Event
) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
