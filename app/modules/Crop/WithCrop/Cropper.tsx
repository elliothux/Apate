import * as React from "react";
import { useCallback, useMemo } from "react";
import { observer } from "mobx-react";
import { DraggableEvent } from "react-draggable";
import { ResizeDirection } from "re-resizable";
import { DraggableData, Position, ResizableDelta, Rnd } from "react-rnd";
import { imageStore, mainStore } from "state";
import { ViewType } from "types";

function CropperContent() {
  return (
    <>
      <div className="crop-handler-corner top left" />
      <div className="crop-handler-corner top right" />
      <div className="crop-handler-corner bottom left" />
      <div className="crop-handler-corner bottom right" />
    </>
  );
}

function ICropper() {
  const {
    cropRatio,
    cropWidth: width,
    cropHeight: height,
    cropX: x,
    cropY: y,
    resizeCrop,
    moveCrop
  } = imageStore;

  const ratio = useMemo<number | undefined>(
    () => (cropRatio ? cropRatio[0] / cropRatio[1] : undefined),
    [cropRatio]
  );

  const onDragStop = useCallback(
    (e: DraggableEvent, d: DraggableData) => moveCrop(d.x, d.y),
    []
  );

  const onResizeStop = useCallback(
    (
      e: DraggableEvent,
      dir: ResizeDirection,
      { style }: HTMLDivElement,
      delta: ResizableDelta,
      { x, y }: Position
    ) => resizeCrop(parseInt(style.width), parseInt(style.height), x, y),
    []
  );

  if (!imageStore.cropMode) {
    return null;
  }

  return (
    <Rnd
      className="crop-handler"
      bounds="#main-canvas"
      lockAspectRatio={ratio}
      minWidth={60}
      minHeight={60}
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
    >
      <CropperContent />
    </Rnd>
  );
}

export const Cropper = observer(ICropper);
