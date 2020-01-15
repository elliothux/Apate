import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { Button, ButtonGroup } from "../../components/Button";
import { IconType } from "../../components/Icon";
import { imageStore } from "../../state";

@observer
export class Crop extends React.Component {
  public renderCropAspect = () => {
    return (
      <>
        <p>裁剪比例</p>
        <div className="crop-aspects">
          <div className="crop-aspect">
            <p>FREE</p>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-1-1" />
            <span>1 : 1</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-2-1" />
            <span>2 : 1</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-2-1 rotate" />
            <span>1 : 2</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-16-10" />
            <span>16 : 10</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-16-10 rotate" />
            <span>10 : 16</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-16-9" />
            <span>16 : 9</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-16-9 rotate" />
            <span>9 : 16</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-5-4" />
            <span>5 : 4</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-5-4 rotate" />
            <span>4 : 5</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-4-3" />
            <span>4 : 3</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-4-3 rotate" />
            <span>3 : 4</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-3-2" />
            <span>3 : 2</span>
          </div>
          <div className="crop-aspect">
            <div className="aspect-icon aspect-3-2 rotate" />
            <span>2 : 3</span>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div id="crop">
        {this.renderCropAspect()}
        <ButtonGroup>
          <Button icon={IconType.ROTATE} onClick={imageStore.toggleRotate} />
          <Button
            icon={IconType.FLIP}
            onClick={imageStore.toggleFlipX}
            iconRotate={90}
          />
          <Button icon={IconType.FLIP} onClick={imageStore.toggleFlipY} />
          <Button icon={IconType.RESET} onClick={imageStore.resetCrop} />
        </ButtonGroup>
        <ButtonGroup>
          <Button>确认</Button>
          <Button>取消</Button>
        </ButtonGroup>
      </div>
    );
  }
}
