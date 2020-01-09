import * as React from "react";
import { observer } from "mobx-react";
import { Maybe } from "../../types";
import { mainStore } from "../../state";

@observer
export class Histogram extends React.Component {
  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<CanvasRenderingContext2D> = null;

  private setRefAndCtx = (i: HTMLCanvasElement) => {
    this.ref = i;
    if (i) {
      this.ctx = i.getContext("2d");
      mainStore.setCanvasContext(this.ctx!);
    }
  };

  render() {
    return (
      <div id="histogram">
        <canvas ref={this.setRefAndCtx} width={521} height={208}>
          你的浏览器不支持canvas
        </canvas>
      </div>
    );
  }
}
