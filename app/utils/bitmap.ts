import { hslToRgb, rgbToHsl } from "./color";

export type RGB = Uint8ClampedArray;
export type HSL = Uint8ClampedArray;

type ColorItem = [RGB, HSL];
type ColorRow = ColorItem[];
type ColorData = ColorRow[];

export class BitMap {
  constructor(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    onChange?: (i: BitMap) => void
  ) {
    this.data = BitMap.generateData(data, width, height);
    this.width = width;
    this.height = height;
    if (onChange) {
      this.onChange = onChange;
    }
  }

  private onChange: (i: BitMap) => void = () => {};

  public width: number;

  public height: number;

  public data: [RGB, HSL][][] = [];

  public getRGB = (x: number, y: number): RGB => {
    return this.data[x][y][0];
  };

  public getHSL = (x: number, y: number): HSL => {
    return this.data[x][y][1];
  };

  public toImageData = (): ImageData => {
    const { width, height } = this;
    const data: Uint8ClampedArray = new Uint8ClampedArray(width * 4 * height);

    let index = 0;
    this.data.forEach(row =>
      row.forEach(([rgb]) => {
        const currentIndex = index * 4;
        data.set(rgb, currentIndex);
        data.set(new Uint8ClampedArray(1), currentIndex + 3);
        index++;
      })
    );

    return new ImageData(data, this.width, this.height);
  };

  public changeS = (change: number) => {
    this.data.forEach(row =>
      row.forEach(([rgb, hsl]) => {
        hsl[1] += change;
        rgb.set(hslToRgb(hsl[0], hsl[1], hsl[2]));
      })
    );
    this.onChange(this);
  };

  public static generateData(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ): ColorData {
    const colorData: ColorData = new Array(height);
    let currentRow: [RGB, HSL][] = new Array(width);
    let rowIndex = 0;
    let columnIndex = 0;

    for (let i = 0; i <= data.length; i += 4) {
      if (columnIndex === width) {
        colorData[rowIndex] = currentRow;
        currentRow = new Array(width);
        columnIndex = 0;
        rowIndex++;
      }

      const rgb = new Uint8ClampedArray(data.subarray(i, i + 3));
      const hslValue = rgbToHsl(rgb[0], rgb[1], rgb[2]);
      const hsl = new Uint8ClampedArray(hslValue);
      currentRow[columnIndex] = [rgb, hsl];
      columnIndex++;
    }

    return colorData;
  }

  public static from(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    onChange?: (i: BitMap) => void
  ): BitMap {
    return new BitMap(data, width, height, onChange);
  }
}
