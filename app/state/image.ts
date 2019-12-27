import { action, observable } from "mobx";
import { mainStore } from "./main";
import * as worker from "../worker";

export class ImageStore {
  public initImageData = () => {
    worker.initImage(this.getImageData());
  };

  public getImageData = (): ImageData => {
    const { canvasContext, width, height } = mainStore;
    return canvasContext!.getImageData(0, 0, width, height);
  };

  public rerenderImage = (data: Uint8ClampedArray) => {
    const image = new ImageData(data, mainStore.width, mainStore.height);
    mainStore.canvasContext!.putImageData(image, 0, 0);
  };

  /**
   * @desc 饱和度
   */
  @observable
  public saturation: number = 0;

  @action
  public setSaturation = (v: number) => {
    this.saturation = v;
    worker.setImageSaturation(v);
  };

  /**
   * @desc 明度
   */
  @observable
  public brightness: number = 0;

  @action
  public setBrightness = (v: number) => {
    this.brightness = v;
    worker.setImageBrightness(v);
  };
}

export const imageStore = new ImageStore();

Object.defineProperty(window, "__image_store", {
  get(): ImageStore {
    return imageStore;
  }
});
