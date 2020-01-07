type LutDataItem = Float32Array;

export class ThreeDirectionLookUpTable {
  public readonly title: string;

  public readonly size: number;

  public readonly min: LutDataItem;

  public readonly max: LutDataItem;

  public readonly data: LutDataItem[][][];

  constructor(
    title: string,
    size: number,
    min: LutDataItem,
    max: LutDataItem,
    data: LutDataItem[][][]
  ) {
    this.title = title;
    this.size = size;
    this.min = min;
    this.max = max;
    this.data = data;
  }

  public getValue = (x: number, y: number, z: number): LutDataItem => {
    return this.data[z][y][x];
  };

  public getR = (x: number, y: number, z: number): number => {
    return this.getValue(x, y, z)[0];
  };

  public getG = (x: number, y: number, z: number): number => {
    return this.getValue(x, y, z)[1];
  };

  public getB = (x: number, y: number, z: number): number => {
    return this.getValue(x, y, z)[2];
  };

  static fromString = (str: string): ThreeDirectionLookUpTable => {
    const result = {
      title: "untitled",
      size: 0,
      min: Float32Array.from([0, 0, 0]),
      max: Float32Array.from([1, 1, 1]),
      data: [] as LutDataItem[][][]
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
      throw new Error("Lut size not allow to be zero.");
    }

    const len = size * size * size;
    if (len !== data.length) {
      throw new Error(
        `Lut data length should be ${len}[${size}^3], but is ${data.length}`
      );
    }

    for (let z = 0; z < size; z++) {
      const layer: LutDataItem[][] = [];
      for (let y = 0; y < size; y++) {
        const row: LutDataItem[] = [];
        for (let x = 0; x < size; x++) {
          const index = size * size * z + size * y + x;
          row.push(data[index]);
        }
        layer.push(row);
      }
      result.data.push(layer);
    }

    return new ThreeDirectionLookUpTable(
      result.title,
      result.size,
      result.min,
      result.max,
      result.data
    );
  };
}
