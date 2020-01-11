import { action, observable } from "mobx";
import { throttle } from "throttle-debounce";
import { mainStore } from "./main";
import * as worker from "../worker";

const THROTTLE_TIMEOUT = 200;

export class ImageStore {
  public initImageData = () => {
    const data = this.getImageData();
    worker.initImage(data);
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
   * @desc 亮度
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
   * @desc 曝光
   */
  @observable
  public exposure: number = 0;

  @action
  public setExposure = (v: number) => {
    if (v === this.exposure) {
      return;
    }

    this.exposure = v;
    this.setImageExposure(v);
  };

  private setImageExposure = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageExposure(100 + v);
  });

  /**
   * @desc 曝光
   */
  @observable
  public highlight: number = 0;

  @action
  public setHighlight = (v: number) => {
    if (v === this.highlight) {
      return;
    }

    this.highlight = v;
    this.setImageHighlight(v);
  };

  private setImageHighlight = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageHighlight(100 + v);
  });

  /**
   * @desc 曝光
   */
  @observable
  public shadow: number = 0;

  @action
  public setShadow = (v: number) => {
    if (v === this.shadow) {
      return;
    }

    this.shadow = v;
    this.setImageShadow(v);
  };

  private setImageShadow = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageShadow(100 + v);
  });

  /**
   * @desc 对比度
   */
  @observable
  public contrast: number = 0;

  @action
  public setContrast = (v: number) => {
    if (v === this.contrast) {
      return;
    }

    this.contrast = v;
    this.setImageContrast(v);
  };

  private setImageContrast = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageContrast(100 + v);
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
   * @desc 饱和度
   */
  @observable
  public vibrance: number = 0;

  @action
  public setVibrance = (v: number) => {
    if (v === this.vibrance) {
      return;
    }

    this.vibrance = v;
    this.setImageVibrance(v);
  };

  private setImageVibrance = throttle(THROTTLE_TIMEOUT, (v: number) => {
    worker.setImageVibrance(100 + v);
  });
}

export const imageStore = new ImageStore();

Object.defineProperty(window, "__image_store", {
  get(): ImageStore {
    return imageStore;
  }
});
