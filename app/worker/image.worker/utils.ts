import { getWasmLib } from "../share";

export function createBitmapImage(
  width: number,
  height: number,
  data: Uint8ClampedArray
) {
  const lib = getWasmLib();
  return lib.Image.from(width, height, data as any);
}
