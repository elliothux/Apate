import "./index.scss";
import "rc-slider/assets/index.css";
import * as React from "react";
import Slider from "rc-slider";

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange?: (v: number) => void;
  debounce?: number;
}

export function RangeInput({ min, max, step, value, onChange }: Props) {
  return (
    <Slider min={min} max={max} step={step} value={value} onChange={onChange} />
  );
}
