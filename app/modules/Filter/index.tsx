import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { filterStore } from "../../state";
import { ThreeDirectionLookUpTable } from "../../utils";

@observer
export class Filter extends React.Component {
  renderFilterItem = ({ title }: ThreeDirectionLookUpTable, index: number) => {
    return (
      <button
        key={title}
        onClick={() => filterStore.applyFilter(index)}
        className="filter-item"
      >
        {title}
      </button>
    );
  };

  render() {
    return (
      <div id="filter">{filterStore.filterList.map(this.renderFilterItem)}</div>
    );
  }
}
