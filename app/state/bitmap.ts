import { action, observable, configure } from "mobx";
import { Maybe } from "types";
import { BitMap } from "utils";
import { mainStore } from "./main";

export class BitMapStore {
  public originalImageData: Maybe<ImageData> = null;

  public originalBitMap: Maybe<BitMap> = null;

  public currentBitMap: Maybe<BitMap> = null;

  public initImageData = () => {
    const {
      width,
      height,
      data
    } = (this.originalImageData = this.getImageData());
    this.originalBitMap = BitMap.from(data, width, height);
    this.currentBitMap = BitMap.from(data, width, height, this.onChange);
    setTimeout(() =>     {
      console.log("set: ");
      this.onChange(this.currentBitMap!)
    }, 1000)
  };

  public getImageData = (): ImageData => {
    const { canvasContext, width, height } = mainStore;
    return canvasContext!.getImageData(0, 0, width, height);
  };

  private onChange = (bitmap: BitMap) => {
    mainStore.canvasContext!.putImageData(bitmap.toImageData(), 0, 0);
  };
}

export const bitMapStore = new BitMapStore();

Object.defineProperty(window, "__bitmap_store", {
  get(): BitMapStore {
    return bitMapStore;
  }
});
