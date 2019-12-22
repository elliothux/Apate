import { Maybe } from "../types";

export function loadWasmLib() {
  // return new Promise((resolve, reject) => {
  //   import("../../pkg")
  //     .then(i => {
  //       wasmModule = i;
  //       console.log("Load web assembly module success");
  //       resolve(i);
  //     })
  //     .catch(reject);
  // });
  return import("../../pkg");
}
