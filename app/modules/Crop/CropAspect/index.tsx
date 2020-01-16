import "./index.scss";
import * as React from "react";
import { Maybe } from "../../../types";
import { imageStore } from "../../../state";
import { observer } from "mobx-react";

function classWithCompareRatio(
  ratio: Maybe<[number, number]>,
  w: number,
  h: number
): string {
  if (!ratio) {
    return "";
  }

  return ratio[0] === w && ratio[1] === h ? "activated" : "";
}

function ICropAspect() {
  const { cropRatio, setCropRatio } = imageStore;

  return (
    <>
      <p className="crop-aspect-title">裁剪比例</p>
      <div className="crop-aspects">
        <div
          className={`crop-aspect ${cropRatio ? "" : "activated"}`}
          onClick={imageStore.clearCropRatio}
        >
          <p>FREE</p>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 1, 1)}`}
          onClick={() => setCropRatio(1, 1)}
        >
          <div className="aspect-icon aspect-1-1" />
          <span>1 : 1</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 2, 1)}`}
          onClick={() => setCropRatio(2, 1)}
        >
          <div className="aspect-icon aspect-2-1" />
          <span>2 : 1</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 1, 2)}`}
          onClick={() => setCropRatio(1, 2)}
        >
          <div className="aspect-icon aspect-2-1 rotate" />
          <span>1 : 2</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 16, 10)}`}
          onClick={() => setCropRatio(16, 10)}
        >
          <div className="aspect-icon aspect-16-10" />
          <span>16 : 10</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 10, 16)}`}
          onClick={() => setCropRatio(10, 16)}
        >
          <div className="aspect-icon aspect-16-10 rotate" />
          <span>10 : 16</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 16, 9)}`}
          onClick={() => setCropRatio(16, 9)}
        >
          <div className="aspect-icon aspect-16-9" />
          <span>16 : 9</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 9, 16)}`}
          onClick={() => setCropRatio(9, 16)}
        >
          <div className="aspect-icon aspect-16-9 rotate" />
          <span>9 : 16</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 5, 4)}`}
          onClick={() => setCropRatio(5, 4)}
        >
          <div className="aspect-icon aspect-5-4" />
          <span>5 : 4</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 4, 5)}`}
          onClick={() => setCropRatio(4, 5)}
        >
          <div className="aspect-icon aspect-5-4 rotate" />
          <span>4 : 5</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 4, 3)}`}
          onClick={() => setCropRatio(4, 3)}
        >
          <div className="aspect-icon aspect-4-3" />
          <span>4 : 3</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 3, 4)}`}
          onClick={() => setCropRatio(3, 4)}
        >
          <div className="aspect-icon aspect-4-3 rotate" />
          <span>3 : 4</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 3, 2)}`}
          onClick={() => setCropRatio(3, 2)}
        >
          <div className="aspect-icon aspect-3-2" />
          <span>3 : 2</span>
        </div>
        <div
          className={`crop-aspect ${classWithCompareRatio(cropRatio, 2, 3)}`}
          onClick={() => setCropRatio(2, 3)}
        >
          <div className="aspect-icon aspect-3-2 rotate" />
          <span>2 : 3</span>
        </div>
      </div>
    </>
  );
}

export const CropAspect = observer(ICropAspect);
