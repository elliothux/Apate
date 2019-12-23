import "./index.scss";
import * as React from "react";

interface Props {
  w?: number;
  h?: number;
}

export function Gap({ w = 10, h = 10 }: Props) {
  return <span className="gap" style={{ width: w, height: h }} />;
}
