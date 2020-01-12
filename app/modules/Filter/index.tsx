import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import FadeLoader from "react-spinners/FadeLoader";
import { filterStore } from "../../state";
import { FilterSnapshots } from "./FilterSnapshot";
import { Maybe } from "../../types";
import { noop } from "../../utils";

@observer
export class Filter extends React.Component {
  private renderCollectionSelect = (
    filters: [string, string[]][],
    currentIndex: number
  ) => {
    return (
      <select
        className="filter-collection-select"
        value={currentIndex}
        onChange={i => filterStore.selectCollection(parseInt(i.target.value))}
      >
        {filters.map(([collectionName], index) => (
          <option key={collectionName} value={index}>
            {collectionName}
          </option>
        ))}
      </select>
    );
  };

  private renderFilterCollection = (filters: string[]) => {
    const { appliedFilter, currentCollectionIndex } = filterStore;

    return (
      <div className="filter-collection">
        <div
          className={`filter-item${!appliedFilter ? " selected" : ""}`}
          onClick={() => filterStore.selectFilter(-1)}
        >
          <p>None</p>
        </div>
        {filters.map((name, index) =>
          this.renderFilterItem(
            name,
            index,
            appliedFilter,
            currentCollectionIndex
          )
        )}
      </div>
    );
  };

  private renderFilterItem = (
    name: string,
    index: number,
    appliedFilter: Maybe<[number, number]>,
    currentCollectionIndex: number
  ) => {
    const selected =
      appliedFilter &&
      appliedFilter[0] === currentCollectionIndex &&
      appliedFilter[1] === index;

    const loading = !filterStore.loadedFilterMap[name];

    return (
      <div
        key={name}
        className={`filter-item${selected ? " selected" : ""}`}
        onClick={loading ? noop : () => filterStore.selectFilter(index)}
      >
        {loading ? (
          <FadeLoader color="white" width={2} height={14} radius={2} />
        ) : null}
        <p>{name}</p>
      </div>
    );
  };

  render() {
    const { filters, currentCollectionIndex } = filterStore;
    return (
      <div id="filter">
        <FilterSnapshots filterCollection={filters[currentCollectionIndex]} />
        {this.renderCollectionSelect(filters, currentCollectionIndex)}
        {this.renderFilterCollection(filters[currentCollectionIndex][1])}
      </div>
    );
  }
}
