import * as React from "react";
import { observer } from "mobx-react";
import { Maybe } from "../../types";

interface Props {
  filterCollection: [string, string[]];
}

@observer
export class FilterSnapshots extends React.Component<Props, any> {
  private readonly width = 270;

  private readonly lineHeight = 112;

  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<CanvasRenderingContext2D> = null;

  private setRefAndCtx = (i: HTMLCanvasElement) => {
    this.ref = i;
    if (i) {
      this.ctx = i.getContext("2d");
    }
  };

  public render() {
    const {
      filterCollection: [, filters]
    } = this.props;

    const height = Math.ceil(filters.length / 2) * this.lineHeight;

    return (
      <canvas
        id="filter-snapshots"
        ref={this.setRefAndCtx}
        width={this.width}
        height={height}
      />
    );
  }
}
