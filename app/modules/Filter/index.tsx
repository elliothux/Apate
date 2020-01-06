import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { filterStore } from "../../state";
import { LookUp3DTable } from "../../utils/lut";

@observer
export class Filter extends React.Component {
  renderFilterItem = ({ title }: LookUp3DTable, index: number) => {
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
