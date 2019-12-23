export type RGB = Uint8ClampedArray;
export type HSL = Uint8ClampedArray;

type ColorItem = [RGB, HSL];
type ColorRow = ColorItem[];
type ColorData = ColorRow[];

export class BitMap {
  constructor(data: Uint8ClampedArray, width: number, height: number) {
    this.data = BitMap.generateData(data, width, height);
  }

  public data: [RGB, HSL][][] = [];

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
      const hsl = new Uint8ClampedArray([0, 0, 0]);
      currentRow[columnIndex] = [rgb, hsl];
      columnIndex++;
    }

    return colorData;
  }

  public static from(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ): BitMap {
    return new BitMap(data, width, height);
  }

  public getRGB = (x: number, y: number): RGB => {
    return this.data[x][y][0];
  };

  public getHSL = (x: number, y: number): HSL => {
    return this.data[x][y][1];
  };
}
