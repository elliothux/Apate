import "./index.scss";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { observer } from "mobx-react";
import { DraggableEvent } from "react-draggable";
import { ResizeDirection } from "re-resizable";
import { DraggableData, Position, ResizableDelta, Rnd } from "react-rnd";
import { imageStore } from "state";

function ICropHandler() {
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

  const cropStyle = useMemo(() => {
    const { top, left, width, height } = document
      .querySelector("#main-canvas")!
      .getBoundingClientRect();
    return { top, left, width, height };
  }, []);

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

  return (
    <div className="crop-handler-container" style={cropStyle}>
      <Rnd
        className="crop-handler"
        bounds="parent"
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
    </div>
  );
}

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

export const CropHandler = observer(ICropHandler);
