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
                backgroundImage:
                  "linear-gradient(90deg, #0063FA 0%, #4C4C4C 50%, #FF7E00 100%)"
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
              backgroundStyle={{
                backgroundImage:
                  "linear-gradient(-90deg, #0F0 0%, #4C4C4C 50%, #F0F 100%)"
              }}
            />
            <RangeInput
              className="adjustment-range-item"
              label="饱和度"
              min={-100}
              max={100}
              step={1}
              value={saturation}
              onChange={setSaturation}
              backgroundStyle={{
                backgroundImage:
                  "linear-gradient(90deg, #343434 0%, #594E52 30%, #7F5782 46%, #544A90 59%, #4FAD30 71%, #E2D009 84%, #FF1F00 100%)"
              }}
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
              backgroundStyle={{
                backgroundImage: "linear-gradient(90deg, #111 0%, #EEE 100%)"
              }}
            />
            <RangeInput
              className="adjustment-range-item"
              label="曝光"
              min={-100}
              max={100}
              step={1}
              value={exposure}
              onChange={setExposure}
              backgroundStyle={{
                backgroundImage: "linear-gradient(90deg, #111 0%, #EEE 100%)"
              }}
            />
            <RangeInput
              className="adjustment-range-item"
              label="对比度"
              min={-100}
              max={100}
              step={1}
              value={contrast}
              onChange={setContrast}
              backgroundStyle={{
                backgroundImage: "linear-gradient(90deg, #BBB 0%, #000 100%)"
              }}
            />
            <RangeInput
              className="adjustment-range-item"
              label="高光"
              min={-100}
              max={100}
              step={1}
              value={highlight}
              onChange={setHighlight}
              backgroundStyle={{
                backgroundImage: "linear-gradient(90deg, #555 0%, #FFF 100%)"
              }}
            />
            <RangeInput
              className="adjustment-range-item"
              label="阴影"
              min={-100}
              max={100}
              step={1}
              value={shadow}
              onChange={setShadow}
              backgroundStyle={{
                backgroundImage: "linear-gradient(90deg, #111 0%, #CCC 100%)"
              }}
            />
          </CollapsePanel>
        </Collapse>
      </div>
    );
  }
}
