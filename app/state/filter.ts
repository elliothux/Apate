import { action, observable } from "mobx";
import { Maybe } from "types";
import * as worker from "../worker";
import { filters } from "../../filter";

export class FilterStore {
  @observable
  public filters: [string, string[]][] = Object.entries(filters);

  @observable
  public currentCollectionIndex: number = 0;

  @action
  public selectCollection = (index: number) => {
    this.currentCollectionIndex = index;
  };

  @observable
  public appliedFilter: Maybe<[number, number]> = null;

  @observable
  public filterStrength: number = 100;

  @action
  public setFilterStrength = (v: number) => {
    this.filterStrength = v;
  };

  @action
  public selectFilter = (filterIndex: number) => {
    this.filterStrength = 100;

    if (filterIndex > -1) {
      this.appliedFilter = [this.currentCollectionIndex, filterIndex];
      const [collection, filters] = this.filters[this.currentCollectionIndex];
      return worker.applyFilter(collection, filters[filterIndex]);
    } else {
      this.appliedFilter = null;
      return worker.unapplyFilter();
    }
  };
}

export const filterStore = new FilterStore();

Object.defineProperty(window, "__filter_store", {
  get(): FilterStore {
    return filterStore;
  }
});
