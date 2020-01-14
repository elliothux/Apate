import { action, observable } from "mobx";
import { FilterCollection, Maybe } from "types";
import * as worker from "../worker";
import { filters } from "../../filter";
import { loadFilterCollection } from "../worker";

export const filterSnapshotMap = new Map<string, string>();

export const filterLoadingStatus = new Map<string, boolean>();

export class FilterStore {
  @observable
  public filterCollections: FilterCollection[] = Object.entries(filters);

  @observable
  public loadedFilterMap: { [name: string]: true } = {};

  @action
  public setFilterLoaded = (name: string, snapshot: Blob) => {
    filterSnapshotMap.set(name, URL.createObjectURL(snapshot));
    this.loadedFilterMap[name] = true;
  };

  public loadFilterCollection = (index: number) => {
    const [collectionName, filters] = this.filterCollections[index];
    if (!filterLoadingStatus.get(collectionName)) {
      filterLoadingStatus.set(collectionName, true);
      return loadFilterCollection(collectionName, [...filters]);
    }
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
  public selectFilter = (collectionIndex: number, filterIndex: number) => {
    this.filterStrength = 100;

    if (filterIndex > -1) {
      this.appliedFilter = [collectionIndex, filterIndex];
      const [collection, filters] = this.filterCollections[collectionIndex];
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
