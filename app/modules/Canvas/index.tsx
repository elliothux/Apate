import "./index.scss";
import * as React from "react";
import { Maybe, PromiseValueType } from "types";
import { loadImage, getWasmLib } from "utils";
import { observer } from "mobx-react";
import { bitMapStore, mainStore } from "../../state";
import { getCanvasSizeAndPosition } from "./utils";

@observer
export class Canvas extends React.Component {
  private containerRef: Maybe<HTMLDivElement> = null;

  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<CanvasRenderingContext2D> = null;

  private maxSize = {
    width: 0,
    height: 0
  };

  public state = {
    top: 0,
    left: 0
  };

  public async componentDidMount() {
    window.addEventListener("resize", this.setMaxSize);

    this.setMaxSize();
    this.drawImage();
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.setMaxSize);
  }

  private setMaxSize = () => {
    const { clientWidth, clientHeight } = this.containerRef!;
    this.maxSize = {
      width: clientWidth,
      height: clientHeight
    };
  };

  private drawImage = async () => {
    const image = await loadImage(mainStore.imageSrc!);
    const { naturalWidth, naturalHeight } = image;
    const { width, height, left, top } = getCanvasSizeAndPosition(
      this.maxSize.width,
      this.maxSize.height,
      naturalWidth,
      naturalHeight
    );
    mainStore.setCanvasSize(width, height);
    this.setState({ top, left }, () => {
      this.ctx!.drawImage(image, 0, 0, width, height);
      bitMapStore.initImageData();
    });
  };

  private setContainerRef = (i: HTMLDivElement) => (this.containerRef = i);

  private setRefAndCtx = (i: HTMLCanvasElement) => {
    this.ref = i;
    if (i) {
      this.ctx = i.getContext("2d");
      mainStore.setCanvasContext(this.ctx!);
    }
  };

  public render() {
    const { width, height } = mainStore;
    const { left, top } = this.state;
    return (
      <div id="main-canvas-container" ref={this.setContainerRef}>
        <canvas
          id="main-canvas"
          ref={this.setRefAndCtx}
          width={width}
          height={height}
          style={{ backgroundColor: "white", top, left }}
        >
          你的浏览器不支持canvas
        </canvas>
      </div>
    );
  }
}
