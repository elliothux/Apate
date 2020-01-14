import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { imageStore } from "state";
import { RangeInput } from "components/RangeInput";
import { Collapse, CollapsePanel } from "components/Collapse";

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
      setExposure,
      contrast,
      setContrast,
      highlight,
      setHighlight,
      shadow,
      setShadow
    } = imageStore;

    return (
      <div id="adjustment">
        <Collapse defaultActiveKey={["0", "1"]}>
          <CollapsePanel header="色彩" key="0">
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
            {/*<div className="adjustment-range-item">*/}
            {/*  <span>自然饱和度</span>*/}
            {/*  <RangeInput*/}
            {/*    min={-100}*/}
            {/*    max={100}*/}
            {/*    step={1}*/}
            {/*    value={vibrance}*/}
            {/*    onChange={setVibrance}*/}
            {/*  />*/}
            {/*</div>*/}
          </CollapsePanel>

          <CollapsePanel header="光效" key="1">
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
            <div className="adjustment-range-item">
              <span>对比度</span>
              <RangeInput
                min={-100}
                max={100}
                step={1}
                value={contrast}
                onChange={setContrast}
              />
            </div>
            <div className="adjustment-range-item">
              <span>高光</span>
              <RangeInput
                min={-100}
                max={100}
                step={1}
                value={highlight}
                onChange={setHighlight}
              />
            </div>
            <div className="adjustment-range-item">
              <span>阴影</span>
              <RangeInput
                min={-100}
                max={100}
                step={1}
                value={shadow}
                onChange={setShadow}
              />
            </div>
          </CollapsePanel>
        </Collapse>
      </div>
    );
  }
}
