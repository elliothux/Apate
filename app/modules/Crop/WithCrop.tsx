import "react-image-crop/dist/ReactCrop.css";
import * as React from "react";
import { observer } from "mobx-react";
import { Rnd } from "react-rnd";
import { WithReactChildren } from "../../types";
import { imageStore, mainStore } from "../../state";
import { ViewType } from "../../types/state";

interface CropperProps {
  ratio?: number;
}

function Cropper({ ratio }: CropperProps) {
  return (
    <Rnd
      className="crop-handler"
      bounds="parent"
      lockAspectRatio={ratio}
      minWidth={60}
      minHeight={60}
      default={{
        x: 100,
        y: 100,
        width: 300,
        height: 200
      }}
    >
      <div className="crop-handler-corner top left" />
      <div className="crop-handler-corner top right" />
      <div className="crop-handler-corner bottom left" />
      <div className="crop-handler-corner bottom right" />
    </Rnd>
  );
}

interface Props extends WithReactChildren {
  style?: React.CSSProperties;
}

function IWithCrop({ style, children }: Props) {
  const { cropRatio } = imageStore;
  const ratio = cropRatio ? cropRatio[0] / cropRatio[1] : undefined;
  const enable = mainStore.view === ViewType.CROP;

  return (
    <div id="with-crop" style={style}>
      {enable ? <Cropper ratio={ratio} /> : null}
      {children}
    </div>
  );
}

export const WithCrop = observer(IWithCrop);
