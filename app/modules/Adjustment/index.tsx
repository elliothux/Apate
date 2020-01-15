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
            <RangeInput
              className="adjustment-range-item"
              label="色温"
              min={-100}
              max={100}
              step={1}
              value={temperature}
              onChange={setTemperature}
              backgroundStyle={{
                backgroundImage: 'linear-gradient(90deg, #0063FA 0%, #4C4C4C 50%, #FF7E00 100%)'
              }}
            />
            <RangeInput
              className="adjustment-range-item"
              label="色调"
              min={-100}
              max={100}
              step={1}
              value={tint}
              onChange={setTint}
            />
            <RangeInput
              className="adjustment-range-item"
              label="饱和度"
              min={-100}
              max={100}
              step={1}
              value={saturation}
              onChange={setSaturation}
            />
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
            <RangeInput
              className="adjustment-range-item"
              label="亮度"
              min={-100}
              max={100}
              step={1}
              value={brightness}
              onChange={setBrightness}
            />
            <RangeInput
              className="adjustment-range-item"
              label="曝光"
              min={-100}
              max={100}
              step={1}
              value={exposure}
              onChange={setExposure}
            />
            <RangeInput
              className="adjustment-range-item"
              label="对比度"
              min={-100}
              max={100}
              step={1}
              value={contrast}
              onChange={setContrast}
            />
            <RangeInput
              className="adjustment-range-item"
              label="高光"
              min={-100}
              max={100}
              step={1}
              value={highlight}
              onChange={setHighlight}
            />
            <RangeInput
              className="adjustment-range-item"
              label="阴影"
              min={-100}
              max={100}
              step={1}
              value={shadow}
              onChange={setShadow}
            />
          </CollapsePanel>
        </Collapse>
      </div>
    );
  }
}
