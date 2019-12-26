import { action, observable, runInAction } from "mobx";
import { Maybe } from "types";
import { loadWasmLib } from "../utils";

export class MainStore {
  constructor() {
    this.init();
  }

  @observable
  public ready: boolean = false;

  private init = () => {
    loadWasmLib()
      .then(() => runInAction(() => (this.ready = true)))
      .catch(console.error);
  };

  @observable
  public imageSrc: Maybe<string> = null;

  @action.bound
  public setImageSrc = (src: string) => (this.imageSrc = src);

  @action
  public loadImageFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.zIndex = "-1";
    input.addEventListener("change", () => {
      if (!input.files) {
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        document.body.removeChild(input);
        this.setImageSrc(reader.result!.toString());
      });
      reader.readAsDataURL(input.files![0]);
    });
    document.body.appendChild(input);
    input.click();
  };

  @observable
  width: number = 0;

  @observable
  height: number = 0;

  @action
  public setCanvasSize = (w: number, h: number) => {
    this.width = w;
    this.height = h;
  };

  public canvasContext: Maybe<CanvasRenderingContext2D> = null;

  @action
  public setCanvasContext = (ctx: CanvasRenderingContext2D) => {
    this.canvasContext = ctx;
  };
}

export const mainStore = new MainStore();

Object.defineProperty(window, "__main_store", {
  get(): MainStore {
    return mainStore;
  }
});

// TODO: remove
setTimeout(
  () => mainStore.setImageSrc(require("assets/images/example.jpg")),
  1000
);
