import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { editorStore } from "state";
import { RangeInput } from "components/RangeInput";

@observer
export class Adjustment extends React.Component {
  render() {
    const { saturation, setSaturation } = editorStore;

    return (
      <div id="adjustment">
        <div className="adjustment-range-item">
          <span>饱和度</span>
          <RangeInput
            min={-100}
            max={100}
            step={1}
            value={saturation}
            onChange={setSaturation}
          />
        </div>
      </div>
    );
  }
}
