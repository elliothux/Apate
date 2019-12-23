import { action, observable, reaction } from "mobx";
import { Maybe } from "types";
import { BitMap } from "utils";
import { bitMapStore } from "./bitmap";

export class EditorStore {
  constructor() {
    this.reactionSaturation();
  }

  /**
   * @desc 饱和度
   */
  @observable
  public saturation: number = 0;

  @action
  public setSaturation = (v: number) => (this.saturation = v);

  private reactionSaturation = () => {
    reaction(
      () => this.saturation,
      saturation => bitMapStore.currentBitMap!.changeS(saturation)
    );
  };

  /**
   * @desc 明度
   */
  @observable
  public brightness: number = 0;

  @action
  public setBrightness = (v: number) => (this.brightness = v);
}

export const editorStore = new EditorStore();

Object.defineProperty(window, "__editor_store", {
  get(): EditorStore {
    return editorStore;
  }
});
