import { action, computed, observable } from "mobx";
import { Maybe } from "../types";
import { getMainCanvas } from "../utils";

export class CropStore {
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
    if (this.rotateIndex % 2 !== 0) {
      this.flipY = !this.flipY;
      return;
    }
    this.flipX = !this.flipX;
  };

  @observable
  public flipY: boolean = false;

  @action
  public toggleFlipY = () => {
    if (this.rotateIndex % 2 !== 0) {
      this.flipX = !this.flipX;
      return;
    }
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

  @observable
  public cropMode: boolean = false;

  @action
  public toggleCropMode = () => {
    this.cropMode = !this.cropMode;
    if (this.cropMode) {
      this.initCrop();
    }
  };

  @action
  public initCrop = () => {
    const { width, height } = getMainCanvas()!.getBoundingClientRect();
    const halfW = width / 2;
    const halfH = height / 2;

    if (this.cropRatio) {
      const [cropW, cropH] = this.cropRatio;

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

export const cropStore = new CropStore();

Object.defineProperty(window, "__crop_store", {
  get(): CropStore {
    return cropStore;
  }
});
