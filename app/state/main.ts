import { action, observable, runInAction } from "mobx";
import { Maybe, ViewType } from "types";
import * as worker from "../worker";
import { toggleHistogramExpand } from "../worker";
import { globalEvent, GlobalEventType } from "../utils";
import { filterStore } from "./filter";

export class MainStore {
  constructor() {
    this.init();
  }

  @observable
  public ready: boolean = false;

  private init = async () => {
    await worker.init();
    runInAction(() => {
      this.ready = true;
    });
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
        globalEvent.emit(GlobalEventType.UPDATE_IMAGE);
        filterStore.clearFilterSnapshots();
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

  @observable
  public view: ViewType = ViewType.CROP;

  @action
  public setView = (i: ViewType) => {
    this.view = i;
  };

  @observable
  public showHistogram: boolean = true;

  @action
  public toggleHistogram = () => {
    this.showHistogram = !this.showHistogram;
  };

  @observable
  public expandHistogram: boolean = false;

  @action
  public toggleExpandHistogram = () => {
    this.expandHistogram = !this.expandHistogram;
    toggleHistogramExpand(this.expandHistogram);
  };

  public exportImage = () => {
    const link = document.createElement("a");
    link.setAttribute("download", "MintyPaper.png");
    link.setAttribute(
      "href",
      this.canvasContext!.canvas.toDataURL("image/jpeg", 1).replace(
        "image/jpeg",
        "image/octet-stream"
      )
    );
    link.click();
    document.body.appendChild(link);
    setTimeout(() => {
      document.body.removeChild(link);
    }, 1000);
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
