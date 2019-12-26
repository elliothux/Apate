import { action, observable } from "mobx";
import { mainStore } from "./main";
import { getWasmLib } from "../utils";
import { Maybe } from "../types";
import { debounce } from "debounce";

const DEBOUNCE_TIMEOUT = 200;

export class EditorStore {
  public bitmap: Maybe<ReturnType<typeof getBitMapImage>> = null;

  public initImageData = () => {
    const { width, height, data } = this.getImageData();
    this.bitmap = getBitMapImage(width, height, data);
  };

  public getImageData = (): ImageData => {
    const { canvasContext, width, height } = mainStore;
    return canvasContext!.getImageData(0, 0, width, height);
  };

  public rerenderImage = () => {
    const data = new ImageData(
      Uint8ClampedArray.from(this.bitmap!.get_current_data_array()),
      mainStore.width,
      mainStore.height
    );
    mainStore.canvasContext!.putImageData(data, 0, 0);
  };

  /**
   * @desc 饱和度
   */
  @observable
  public saturation: number = 0;

  @action
  public setSaturation = (v: number) => {
    this.saturation = v;
    this.setBitmapSaturation(v);
    console.time("v");
  };

  private setBitmapSaturation = (v: number) => {
    this.bitmap!.set_saturation(v + 100);
    this.rerenderImage();
    console.timeEnd("v");
  };
  /**
   * @desc 明度
   */
  @observable
  public brightness: number = 0;

  @action
  public setBrightness = (v: number) => {
    this.brightness = v;
    window.setTimeout(() => this.setBitmapBrightness(v), 0);
  };

  private setBitmapBrightness = (v: number) => {
    this.bitmap!.set_brightness(v + 100);
    this.rerenderImage();
  };
}

function getBitMapImage(
  width: number,
  height: number,
  data: Uint8ClampedArray
) {
  return getWasmLib().Image.from(width, height, data as any);
}

export const editorStore = new EditorStore();

Object.defineProperty(window, "__editor_store", {
  get(): EditorStore {
    return editorStore;
  }
});
