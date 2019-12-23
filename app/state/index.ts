import { action, observable, configure } from "mobx";
import { Maybe } from "../types";
import { BitMap } from "../utils/bitmap";

configure({ enforceActions: "always" });

export class Store {
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

  @observable width: number = 0;

  @observable height: number = 0;

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

  public getImageData = (): ImageData => {
    const data = this.canvasContext!.getImageData(
      0,
      0,
      this.width,
      this.height
    );
    console.log(BitMap.from(data.data, data.width, data.height));
    return data;
  };
}

export const store = new Store();

Object.defineProperty(window, "__store", {
  get(): Store {
    return store;
  }
});

// TODO: remove
setTimeout(() => store.setImageSrc(require("assets/images/example.jpg")), 1000);
