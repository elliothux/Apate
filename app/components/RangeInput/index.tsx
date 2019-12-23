import "./index.scss";
import "rc-slider/assets/index.css";
import * as React from "react";
import Slider from "rc-slider";
import { debounce } from "debounce";
import { noop } from "utils";

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange?: (v: number) => void;
  debounce?: number;
}

export function RangeInput({
  min,
  max,
  step,
  value,
  onChange,
  debounce: debounceTime = 200
}: Props) {
  const iOnChange = React.useCallback(
    onChange ? debounce(onChange, debounceTime, true) : noop,
    [onChange]
  );
  return (
    <Slider
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={iOnChange}
    />
  );
}
