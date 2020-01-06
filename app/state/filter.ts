import { action, observable, runInAction } from "mobx";
import { Maybe } from "types";
import * as worker from "../worker";
import { LookUp3DTable, parseLut } from "../utils/lut";
import AL5 from "./AL5.cube";
import { imageStore } from "./image";

export class FilterStore {
  public filterList: LookUp3DTable[] = [parseLut(AL5)];

  public applyFilter = (index: number) => {
    const { data, size } = this.filterList[index];
    const { data: imgData, width, height } = imageStore.getImageData();
    const multiple = size / 255;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = x * 4 + width * 4 * y;
        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];

        const [xo, yo, zo] = [r, g, b].map(i => i * multiple);
        const [[x0, x1, dx], [y0, y1, dy], [z0, z1, dz]] = [xo, yo, zo].map(i =>
          adjacent(i, 0, size)
        );

      }
    }
  };
}

export const filterStore = new FilterStore();

Object.defineProperty(window, "__filter_store", {
  get(): FilterStore {
    return filterStore;
  }
});

function adjacent(i: number, min: number, max: number): [number, number, number] {
  let v1 = clamp(Math.floor(i), min, max);
  let v2 = clamp(Math.ceil(i), min, max);
  let d = v2 - v1;
  return [v1, v2, d];
}

function clamp(value: number, min: number, max: number): number {
  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
}

function getR(arr: Uint8Array, x: number, y: number, z: number, size: number) {
  const index = x * y * size
}

function lerp() {}
