import "./index.scss";
import * as React from "react";
import { RangeInput } from "../../components/RangeInput";

export class Adjustment extends React.Component {
  render() {
    return (
      <div id="adjustment">
        <div className="adjustment-range-item">
          <span>饱和度</span>
          <RangeInput min={-100} max={100} step={1} />
        </div>
      </div>
    );
  }
}
