import { action, observable } from "mobx";
import { throttle } from "throttle-debounce";
import { mainStore } from "./main";
import * as worker from "../worker";

const THROTTLE_TIMEOUT = 200;

export class ImageStore {
  public initImageData = () => {
    worker.initImage(this.getImageData());
  };

  public getImageData = (): ImageData => {
    const { canvasContext, width, height } = mainStore;
    return canvasContext!.getImageData(0, 0, width, height);
  };

  public rerenderImage = (data: Uint8Array) => {
    const image = new ImageData(
      Uint8ClampedArray.from(data),
      mainStore.width,
      mainStore.height
    );
    mainStore.canvasContext!.putImageData(image, 0, 0);
  };

  /**
   * @desc 饱和度
   */
  @observable
  public saturation: number = 0;

  @action
  public setSaturation = (v: number) => {
    if (v === this.saturation) {
      return;
    }

    this.saturation = v;
    this.setImageSaturation(v);
  };

  private setImageSaturation = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageSaturation(100 + v);
  });

  /**
   * @desc 明度
   */
  @observable
  public brightness: number = 0;

  @action
  public setBrightness = (v: number) => {
    if (v === this.brightness) {
      return;
    }

    this.brightness = v;
    this.setImageBrightness(v);
  };

  private setImageBrightness = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageBrightness(100 + v);
  });

  /**
   * @desc 色温
   */
  @observable
  public temperature: number = 0;

  @action
  public setTemperature = (v: number) => {
    if (v === this.temperature) {
      return;
    }

    this.temperature = v;
    this.setImageTemperature(v);
  };

  private setImageTemperature = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageTemperature(100 + v);
  });

  /**
   * @desc 色调
   */
  @observable
  public tint: number = 0;

  @action
  public setTint = (v: number) => {
    if (v === this.tint) {
      return;
    }

    this.tint = v;
    this.setImageTint(100 + v);
  };

  private setImageTint = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageTint(v);
  });
}

export const imageStore = new ImageStore();

Object.defineProperty(window, "__image_store", {
  get(): ImageStore {
    return imageStore;
  }
});
