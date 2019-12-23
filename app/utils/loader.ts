import { Maybe, PromiseValueType } from "types";

type ModuleType = PromiseValueType<ReturnType<typeof loadWasmLib>>;

let wasmModule: Maybe<ModuleType> = null;

function loadWasmLib() {
  return import("../../pkg");
}

export async function getWasmLib(): Promise<ModuleType> {
  if (!wasmModule) {
    wasmModule = await loadWasmLib();
  }

  return wasmModule;
}
