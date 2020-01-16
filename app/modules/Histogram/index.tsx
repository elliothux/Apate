import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import Draggable from "react-draggable";
import { Maybe, ViewType } from "../../types";
import { globalEvent, GlobalEventType } from "../../utils";
import { mainStore } from "../../state";
import { Button } from "components/Button";
import { IconSize, IconType } from "../../components/Icon";

const { innerWidth, innerHeight } = window;

@observer
export class Histogram extends React.Component {
  private readonly draggableBounds = {
    top: 39,
    left: 0,
    right: innerWidth - 301 - 256,
    bottom: innerHeight - 100
  };

  private readonly draggableDefaultPositions = { y: 60, x: 20 };

  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<ImageBitmapRenderingContext> = null;

  public componentDidMount(): void {
    globalEvent.on(GlobalEventType.DRAW_HISTOGRAM, this.drawHistogram);
  }

  private setRefAndCtx = (i: HTMLCanvasElement) => {
    this.ref = i;
    if (i) {
      this.ctx = this.ref.getContext("bitmaprenderer");
    }
  };

  private drawHistogram = (bitmap: ImageBitmap) => {
    this.ctx!.transferFromImageBitmap(bitmap);
  };

  render() {
    const { draggableBounds, draggableDefaultPositions } = this;
    const {
      showHistogram,
      expandHistogram,
      view,
      toggleExpandHistogram
    } = mainStore;
    const show = showHistogram && view !== ViewType.CROP;

    return (
      <Draggable
        bounds={draggableBounds}
        defaultPosition={
          expandHistogram
            ? Object.assign({}, draggableDefaultPositions, {
                bottom: innerHeight - 100 * 3
              })
            : draggableDefaultPositions
        }
      >
        <div id="histogram" style={{ display: show ? "block" : "none" }}>
          <Button
            onClick={toggleExpandHistogram}
            icon={expandHistogram ? IconType.UNEXPAND : IconType.EXPAND}
            iconSize={IconSize.LARGE}
          />
          <canvas
            ref={this.setRefAndCtx}
            width={256}
            height={expandHistogram ? 300 : 100}
          >
            你的浏览器不支持canvas
          </canvas>
        </div>
      </Draggable>
    );
  }
}
