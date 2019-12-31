import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { imageStore } from "state";
import { RangeInput } from "components/RangeInput";

@observer
export class Adjustment extends React.Component {
  render() {
    const {
      saturation,
      setSaturation,
      brightness,
      setBrightness,
      temperature,
      setTemperature,
      tint,
      setTint
    } = imageStore;

    return (
      <div id="adjustment">
        <div className="adjustment-range-item">
          <span>色温</span>
          <RangeInput
            min={-100}
            max={100}
            step={1}
            value={temperature}
            onChange={setTemperature}
          />
        </div>
        <div className="adjustment-range-item">
          <span>色调</span>
          <RangeInput
            min={-100}
            max={100}
            step={1}
            value={tint}
            onChange={setTint}
          />
        </div>
        <div className="adjustment-range-item">
          <span>对比度</span>
          <RangeInput
            min={-100}
            max={100}
            step={1}
            value={saturation}
            onChange={setSaturation}
          />
        </div>
        <div className="adjustment-range-item">
          <span>亮度</span>
          <RangeInput
            min={-100}
            max={100}
            step={1}
            value={brightness}
            onChange={setBrightness}
          />
        </div>
      </div>
    );
  }
}
