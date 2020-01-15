import "rc-slider/assets/index.css";
import "./index.scss";
import * as React from "react";
import Slider from "rc-slider";

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  label?: string;
  onChange?: (v: number) => void;
  debounce?: number;
  className?: string;
  backgroundStyle?: React.CSSProperties;
}

export function RangeInput({
  className,
  min,
  max,
  step,
  value,
  onChange,
  label,
  backgroundStyle
}: Props) {
  return (
    <div className={"range-slider " + (className || "")}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <span className="slider-label">{label}</span>
      <span className="slider-value">{value}</span>
      <span className="slider-background" style={backgroundStyle} />
    </div>
  );
}
