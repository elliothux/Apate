import * as React from "react";
import { Maybe, WithReactChildren } from "types";
import { preventSyntheticEvent } from "../../utils";

export interface DraggableProps extends WithReactChildren {
  initX: number;
  initY: number;
  onMove: (moveX: number, moveY: number) => void;
}

const DRAG_TIMEOUT = 200;

export class Draggable extends React.Component<DraggableProps> {
  constructor(props: DraggableProps) {
    super(props);
    const { initX, initY } = props;
    if (initX) {
      this.state.x = initX;
    }
    if (initX) {
      this.state.y = initY;
    }
  }

  private dragging: boolean = false;

  private containerRef: Maybe<HTMLDivElement> = null;

  private mouseDownTimer: Maybe<number> = null;

  private mouseDownPosition: Maybe<[number, number]> = null;

  private state = {
    x: 0,
    y: 0
  };

  private setContainerRef = (node: HTMLDivElement) => {
    this.containerRef = node;
  };

  private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    preventSyntheticEvent(e);
    this.mouseDownPosition = [e.clientX, e.clientY];
    this.mouseDownTimer = window.setTimeout(this.startDrag, DRAG_TIMEOUT);
    this.bindEvent();
  };

  private bindEvent = () => {
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("mousemove", this.onMouseMove);
  };

  private unbindEvent = () => {
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
  };

  private startDrag = () => {
    window.clearTimeout(this.mouseDownTimer!);
    this.mouseDownTimer = null;
    this.dragging = true;
  };

  private onMouseUp = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    preventSyntheticEvent(e);

    if (this.mouseDownTimer) {
      window.clearTimeout(this.mouseDownTimer!);
      this.mouseDownTimer = null;
    }

    this.mouseDownPosition = null;
    this.dragging = false;
  };

  private onMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    preventSyntheticEvent(e);

    if (this.mouseDownTimer || !this.mouseDownPosition) {
      return;
    }

    const [x, y] = this.mouseDownPosition!;
    this.props.onMove(e.clientX - x, e.clientY - y);
  };

  render() {
    return (
      <div
        className="draggable"
        ref={this.setContainerRef}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        {this.props.children}
      </div>
    );
  }
}
