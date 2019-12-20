import * as React from "react";
import { Maybe } from "../../types";
import { loadImage } from "../../utils";

import EXAMPLE_IMAGE from "../../assets/images/example.jpg";

const { innerWidth, innerHeight } = window;

export class Canvas extends React.Component {
  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<CanvasRenderingContext2D> = null;

  private imgInfo = {
    top: 10,
    left: 10,
    width: 0,
    height: 0
  };

  public async componentDidMount() {
    const { imgInfo: info } = this;
    const image = await loadImage(EXAMPLE_IMAGE);

    const { naturalWidth, naturalHeight } = image;
    const [w, h] = [naturalWidth * 0.1, naturalHeight * 0.1];
    info.width = w;
    info.height = h;

    this.ctx!.drawImage(image, info.left, info.top, w, h);

    await this.loadWasm();
  }

  private loadWasm = async () => {
    const { top, left, width, height } = this.imgInfo;

    import("../../../pkg")
      .then(i => {
        console.log(i.get_image_data(left, top, width, height));
      })
      .catch(console.error);
  };

  private setRefAndCtx = (i: HTMLCanvasElement) => {
    this.ref = i;
    if (i) {
      this.ctx = i.getContext("2d");
    }
  };

  private handleClick = () => {
    const { top, left, width, height } = this.imgInfo;
    const {
      data,
      data: { length },
      width: ww,
      height: hh
    } = this.ctx!.getImageData(left, top, width, height);

    console.log(">>>>>", length, ww, hh, ww * 4 * hh * 4);

    const newData = new Uint8ClampedArray(length);
    for (let i = 0; i <= length; i += 4) {
      // const v = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const v = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      newData[i] = newData[i + 1] = newData[i + 2] = v;
      newData[i + 3] = 255;
    }

    console.log(newData);
    this.ctx!.putImageData(new ImageData(newData, width, height), left, top);
  };

  public render() {
    return (
      <>
        {/*<button onClick={this.handleClick}>click</button>*/}
        <canvas
          id="main-canvas"
          ref={this.setRefAndCtx}
          width={innerWidth}
          height={innerHeight}
          style={{ backgroundColor: "white" }}
        >
          你的浏览器不支持canvas
        </canvas>
      </>
    );
  }
}
