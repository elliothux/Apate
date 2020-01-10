import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { Maybe } from "../../types";

let ctx: Maybe<ImageBitmapRenderingContext> = null;

@observer
export class Histogram extends React.Component {
  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<ImageBitmapRenderingContext> = null;

  private setRefAndCtx = (i: HTMLCanvasElement) => {
    this.ref = i;
    if (i) {
      this.ctx = i.getContext("bitmaprenderer");
      ctx = this.ctx;
    }
  };

  render() {
    return (
      <div id="histogram">
        <canvas ref={this.setRefAndCtx} width={256} height={100}>
          你的浏览器不支持canvas
        </canvas>
      </div>
    );
  }
}

export function drawHistogram(bitmap: ImageBitmap) {
  ctx!.transferFromImageBitmap(bitmap);
}
