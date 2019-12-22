import * as React from "react";
import { Maybe, PromiseValueType } from "../../types";
import { loadImage, loadWasmLib } from "../../utils";

import EXAMPLE_IMAGE from "../../assets/images/example.jpg";

const { innerWidth, innerHeight } = window;

export class Canvas extends React.Component {
  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<CanvasRenderingContext2D> = null;

  private wasmModule: Maybe<
    PromiseValueType<ReturnType<typeof loadWasmLib>>
  > = null;

  public state = {
    width: 0,
    height: 0
  };

  public async componentDidMount() {
    // const [w, h] = await this.loadImage();

    this.wasmModule = await loadWasmLib();
  }

  private loadImage = async () => {
    const image = await loadImage(EXAMPLE_IMAGE);
    const { naturalWidth, naturalHeight } = image;
    const [w, h] = [naturalWidth * 0.1, naturalHeight * 0.1];
    this.setState({ width: w, height: h }, () =>
      this.ctx!.drawImage(image, 0, 0, w, h)
    );
    return [w, h];
  };

  private setRefAndCtx = (i: HTMLCanvasElement) => {
    this.ref = i;
    if (i) {
      this.ctx = i.getContext("2d");
    }
  };

  public render() {
    const { width, height } = this.state;
    return (
      <>
        {/*<button onClick={this.handleClick}>click</button>*/}
        <canvas
          id="main-canvas"
          ref={this.setRefAndCtx}
          width={width}
          height={height}
          style={{ backgroundColor: "white" }}
        >
          你的浏览器不支持canvas
        </canvas>
      </>
    );
  }
}
