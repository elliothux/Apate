import { Maybe, PromiseValueType } from "types";

export type WasmModuleType = PromiseValueType<ReturnType<typeof loadWasmLib>>;

let wasmModule: Maybe<WasmModuleType> = null;

export function loadWasmLib() {
  const i = import("../../pkg");
  i.then(w => {
    wasmModule = w;
  });
  return i;
}

export function getWasmLib(): WasmModuleType {
  if (!wasmModule) {
    throw new Error("WASM module not loaded.");
  }
  return wasmModule as WasmModuleType;
}
