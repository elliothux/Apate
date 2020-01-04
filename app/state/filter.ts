import { action, observable, runInAction } from "mobx";
import { Maybe } from "types";

export class FilterStore {
  public filterList = [];
}

export const filterStore = new FilterStore();

Object.defineProperty(window, "__filter_store", {
  get(): FilterStore {
    return filterStore;
  }
});
