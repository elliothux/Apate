import { action, computed, observable, reaction } from "mobx";
import { throttle } from "throttle-debounce";
import { mainStore } from "./main";
import * as worker from "../worker";
import { Maybe } from "../types";
import { ViewType } from "../types/state";

const THROTTLE_TIMEOUT = 200;

export class ImageStore {
  constructor() {
    this.initReaction();
  }

  private initReaction = () => {
    reaction(
      () => mainStore.view,
      view => {
        if (view === ViewType.CROP) {
          this.initCrop();
        }
      }
    );
  };

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

  /**
   * @desc 旋转
   */
  @observable
  private rotateIndex: number = 0;

  @computed
  public get rotate(): number {
    return this.rotateIndex * 90;
  }

  @action
  public toggleRotate = () => {
    this.rotateIndex += 1;
  };

  /**
   * @desc 翻转
   */
  @observable
  public flipX: boolean = false;

  @action
  public toggleFlipX = () => {
    this.flipX = !this.flipX;
  };

  @observable
  public flipY: boolean = false;

  @action
  public toggleFlipY = () => {
    this.flipY = !this.flipY;
  };

  @action
  public resetCrop = () => {
    this.rotateIndex = 0;
    this.flipX = false;
    this.flipY = false;
  };

  /**
   * @desc 裁剪
   */
  @observable
  public cropRatio: Maybe<[number, number]> = null;

  @action
  public setCropRatio = (w: number, h: number) => {
    if (this.cropRatio && this.cropRatio[0] === w && this.cropRatio[1] === h) {
      return;
    }
    this.cropRatio = [w, h];
    this.initCrop();
  };

  @action
  public clearCropRatio = () => {
    this.cropRatio = null;
  };

  @observable
  public cropWidth: number = 0;

  @observable
  public cropHeight: number = 0;

  @action
  public resizeCrop = (w: number, h: number, x: number, y: number) => {
    this.cropWidth = w;
    this.cropHeight = h;
    this.cropX = x;
    this.cropY = y;
  };

  @observable
  public cropX: number = 0;

  @observable
  public cropY: number = 0;

  @action
  public moveCrop = (x: number, y: number) => {
    this.cropX = x;
    this.cropY = y;
  };

  @action
  private initCrop = () => {
    const { cropRatio } = this;
    const { width, height } = mainStore;
    const halfW = width / 2;
    const halfH = height / 2;

    if (cropRatio) {
      const [cropW, cropH] = cropRatio;

      const w = halfW;
      const h = (w * cropH) / cropW;
      if (h < height) {
        this.resizeCrop(w, h, w / 2, (height - h) / 2);
      } else {
        const h = halfH;
        const w = (h * cropW) / cropH;
        this.resizeCrop(w, h, (width - w) / 2, h / 2);
      }
    } else {
      this.resizeCrop(halfW, halfH, halfW / 2, halfH / 2);
    }
  };
}

export const imageStore = new ImageStore();

Object.defineProperty(window, "__image_store", {
  get(): ImageStore {
    return imageStore;
  }
});
