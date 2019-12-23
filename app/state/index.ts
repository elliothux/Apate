import { action, observable, configure } from "mobx";
import { Maybe } from "../types";

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
}

export const store = new Store();

Object.defineProperty(window, "__store", {
  get(): Store {
    return store;
  }
});
