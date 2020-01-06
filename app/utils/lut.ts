import { Maybe } from "../types";

type LutDataItem = Float32Array;

export interface LookUp3DTable {
  title: string;
  size: number;
  min: LutDataItem;
  max: LutDataItem;
  data: LutDataItem[][][];
  getValue: (x: number, y: number, z: number) => LutDataItem;
}

export function parseLut(str: String): LookUp3DTable {
  const result: LookUp3DTable = {
    title: "untitled",
    size: 0,
    min: Float32Array.from([0, 0, 0]),
    max: Float32Array.from([1, 1, 1]),
    data: [],
    getValue: function(x: number, y: number, z: number) {
      return this.data[x][y][z];
    }
  };

  const data: Float32Array[] = [];

  str.split("\n").forEach((l, i) => {
    const line = l.trim();

    if (line[0] === "#" || line === "") {
      return;
    }

    const parts = line.split(/\s+/);

    switch (parts[0]) {
      case "TITLE": {
        result.title = line.slice(6);
        return;
      }
      case "DOMAIN_MIN": {
        result.min = Float32Array.from(parts.slice(1).map(Number));
        return;
      }
      case "DOMAIN_MAX": {
        result.max = Float32Array.from(parts.slice(1).map(Number));
        return;
      }
      case "LUT_3D_SIZE": {
        result.size = parseInt(parts[1], 10);
        return;
      }
      case "LUT_1D_SIZE": {
        throw new Error("1D lut not supported");
      }
      default: {
        data.push(Float32Array.from(parts.map(Number)));
        return;
      }
    }
  });

  const { size } = result;

  if (size === 0) {
    throw new Error("Lut size not allow ti be zero.");
  }

  const len = size * size * size;
  if (len !== data.length) {
    throw new Error(
      `Lut data length should be ${len}[${size}^3], but is ${data.length}`
    );
  }

  // TODO

  return result;
}
