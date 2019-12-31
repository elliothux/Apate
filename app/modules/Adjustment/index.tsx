import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { imageStore } from "state";
import { RangeInput } from "components/RangeInput";

@observer
export class Adjustment extends React.Component {
  render() {
    const {
      temperature,
      setTemperature,
      tint,
      setTint,
      saturation,
      setSaturation,
      vibrance,
      setVibrance,
      brightness,
      setBrightness,
      exposure,
      setExposure
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
          <span>饱和度</span>
          <RangeInput
            min={-100}
            max={100}
            step={1}
            value={saturation}
            onChange={setSaturation}
          />
        </div>
        <div className="adjustment-range-item">
          <span>自然饱和度</span>
          <RangeInput
            min={-100}
            max={100}
            step={1}
            value={vibrance}
            onChange={setVibrance}
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
        <div className="adjustment-range-item">
          <span>曝光</span>
          <RangeInput
            min={-100}
            max={100}
            step={1}
            value={exposure}
            onChange={setExposure}
          />
        </div>
      </div>
    );
  }
}
