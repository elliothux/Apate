import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { filterSnapshotMap, filterStore, mainStore } from "../../state";
import { FilterCollection, Maybe } from "../../types";
import { noop } from "../../utils";
import { Collapse, CollapsePanel } from "../../components/Collapse";
import FadeLoader from "react-spinners/FadeLoader";

@observer
export class Filter extends React.Component {
  private renderFilterCollections = (filterCollections: FilterCollection[]) => {
    return filterCollections.map(
      ([collectionName, filters], collectionIndex) => (
        <CollapsePanel header={collectionName} key={collectionName} forceRender>
          {this.renderFilterCollection(filters, collectionIndex)}
        </CollapsePanel>
      )
    );
  };

  private renderFilterCollection = (
    filters: string[],
    collectionIndex: number
  ) => {
    const { appliedFilter } = filterStore;

    return (
      <div className="filter-collection">
        <div
          className={`filter-item${!appliedFilter ? " selected" : ""}`}
          onClick={() => filterStore.selectFilter(collectionIndex, -1)}
        >
          <img alt="None" src={mainStore.imageSrc!} />
          <p>None</p>
        </div>
        {filters.map((name, index) =>
          this.renderFilterItem(collectionIndex, name, index, appliedFilter)
        )}
      </div>
    );
  };

  private renderFilterItem = (
    collectionIndex: number,
    name: string,
    index: number,
    appliedFilter: Maybe<[number, number]>
  ) => {
    const selected =
      appliedFilter &&
      appliedFilter[0] === collectionIndex &&
      appliedFilter[1] === index;

    const loading = !filterStore.loadedFilterMap[name];

    return (
      <div
        key={name}
        className={`filter-item${selected ? " selected" : ""}`}
        onClick={
          loading
            ? noop
            : () => filterStore.selectFilter(collectionIndex, index)
        }
      >
        {loading ? (
          <FadeLoader color="white" width={2} height={14} radius={2} />
        ) : (
          <img alt={name} src={filterSnapshotMap.get(name)} />
        )}
        <p>{name}</p>
      </div>
    );
  };

  render() {
    const { filterCollections } = filterStore;
    return (
      <div id="filter">
        <Collapse accordion defaultActiveKey={["A"]}>
          {this.renderFilterCollections(filterCollections)}
        </Collapse>
      </div>
    );
  }
}
