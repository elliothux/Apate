import { action, observable } from "mobx";
import { Maybe } from "types";
import * as worker from "../worker";
import { imageStore } from "./image";
import { mainStore } from "./main";
import { filters } from "../../filter";

export class FilterStore {
  @observable
  public filters: [string, string[]][] = Object.entries(filters);

  @observable
  public currentCollectionIndex: number = 0;

  @action
  public selectCollection = (index: number) => {
    this.currentCollectionIndex = index;
  };

  @observable
  public appliedFilter: Maybe<[number, number]> = null;

  @observable
  public filterStrength: number = 100;

  @action
  public setFilterStrength = (v: number) => {
    this.filterStrength = v;
  };

  @action
  public selectFilter = (filterIndex: number) => {
    this.appliedFilter = [this.currentCollectionIndex, filterIndex];
    this.filterStrength = 100;

    const [name, filters] = this.filters[this.currentCollectionIndex];
    return this.applyFilter(name, filters[filterIndex]);
  };

  private applyFilter = async (collection: string, name: string) => {
    return worker.applyFilter(collection, name);
  };

  private _applyFilter = async (collection: string, name: string) => {
    const lut = await this.getLut(collection, name);
    const { data: imgData, width, height } = imageStore.getImageData();
    const newData: number[] = [];

    const multiple = lut.size / 255;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = x * 4 + width * 4 * y;
        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];

        const [xo, yo, zo] = [r, g, b].map(i => i * multiple);
        const [[x0, x1, dx], [y0, y1, dy], [z0, z1, dz]] = [xo, yo, zo].map(i =>
          adjacent(i, 0, lut.size - 1)
        );

        const [[r0, g0, b0], [r1, g1, b1]] = [
          Array.from(lut.getValue(x0, y0, z0)),
          Array.from(lut.getValue(x1, y1, z1))
        ];
        const [ri, gi, bi] = [
          lerp(r0, r1, dx),
          lerp(g0, g1, dy),
          lerp(b0, b1, dz)
        ].map((i: number) => clamp(Math.round(i * 255), 0, 255));
        newData.push(ri, gi, bi, 255);
      }
    }

    mainStore.canvasContext!.putImageData(
      new ImageData(Uint8ClampedArray.from(newData), width, height),
      0,
      0
    );
  };
}

export const filterStore = new FilterStore();

Object.defineProperty(window, "__filter_store", {
  get(): FilterStore {
    return filterStore;
  }
});

function adjacent(
  i: number,
  min: number,
  max: number
): [number, number, number] {
  let v1 = clamp(Math.floor(i), min, max);
  let v2 = clamp(Math.ceil(i), min, max);
  let d = i - v1;
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

function lerp(v1: number, v2: number, d: number): number {
  return v1 + (v2 - v1) * d;
}
