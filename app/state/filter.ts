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
    this.appliedFilter = [this.currentCollectionIndex, filterIndex];
    this.filterStrength = 100;

    const [name, filters] = this.filters[this.currentCollectionIndex];
    return this.applyFilter(name, filters[filterIndex]);
  };

  private applyFilter = async (collection: string, name: string) => {
    return worker.applyFilter(collection, name);
  };
}

export const filterStore = new FilterStore();

Object.defineProperty(window, "__filter_store", {
  get(): FilterStore {
    return filterStore;
  }
});
