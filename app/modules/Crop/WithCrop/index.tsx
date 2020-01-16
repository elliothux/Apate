import "./index.scss";
import * as React from "react";
import { WithReactChildren } from "types";
import { Cropper } from "./Cropper";

interface Props extends WithReactChildren {
  style?: React.CSSProperties;
}

export function WithCrop({ style, children }: Props) {
  return (
    <div id="with-crop" style={style}>
      <Cropper />
      {children}
    </div>
  );
}
