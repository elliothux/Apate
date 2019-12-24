import { action, observable, configure } from "mobx";
import { Maybe } from "types";
import { BitMap, getWasmLib } from "utils";
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
    // this.originalBitMap = BitMap.from(data, width, height);
    // this.currentBitMap = BitMap.from(data, width, height, this.onChange);
    setTimeout(async () => {
      console.log("set: ");
      const lib = await getWasmLib();
      const instance = lib.Image.from(width, height, data as any);
      console.log(instance.to_data_with_alpha(), instance);
      debugger;
      // this.onChange(this.currentBitMap!)
      // const greydata = (await getWasmLib()).grey(data as any);
      // console.log(greydata);
      // mainStore.canvasContext!.putImageData(
      //   new ImageData(Uint8ClampedArray.from(greydata), width, height),
      //   0,
      //   0
      // );
    }, 1000);
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
