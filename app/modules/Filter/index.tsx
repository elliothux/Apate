import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { filterStore } from "../../state";

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
        {filters.map((name, index) => {
          const selected =
            appliedFilter &&
            appliedFilter[0] === currentCollectionIndex &&
            appliedFilter[1] === index;

          return (
            <div
              key={name}
              className={`filter-item${selected ? " selected" : ""}`}
              onClick={() => filterStore.selectFilter(index)}
            >
              <p>{name}</p>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { filters, currentCollectionIndex } = filterStore;
    return (
      <div id="filter">
        {this.renderCollectionSelect(filters, currentCollectionIndex)}
        {this.renderFilterCollection(filters[currentCollectionIndex][1])}
      </div>
    );
  }
}
