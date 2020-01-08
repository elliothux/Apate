import * as React from "react";
import { WithReactChildren } from "types";

export interface DraggableProps extends WithReactChildren {
  initX: number;
  initY: number;
  onDrag?: (x: number, y: number) => void;
}

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

  private state = {
    x: 0,
    y: 0
  };

  render() {
    return <div className="draggable">{this.props.children}</div>;
  }
}
