import "./index.scss";
import "rc-slider/assets/index.css";
import * as React from "react";
import Slider from "rc-slider";

interface Props {
  min: number;
  max: number;
  step: number;
}

export function RangeInput({ min, max, step }: Props) {
  return <Slider min={min} max={max} step={step} />;
}
