import "./index.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { Button, ButtonGroup } from "../../components/Button";
import { IconSize, IconType } from "../../components/Icon";
import { Collapse, CollapsePanel } from "../../components/Collapse";
import { cropStore } from "../../state";
import { CropHandler } from "./CropHandler";
import { CropAspect } from "./CropAspect";

function ICrop() {
  return (
    <>
      {cropStore.cropMode ? <CropHandler /> : null}
      <div id="crop">
        <Collapse activeKey={[cropStore.cropMode ? "crop" : "buttons"]}>
          <CollapsePanel
            header={""}
            key="buttons"
            showArrow={false}
            className="buttons"
            forceRender
          >
            <Button
              icon={IconType.ASPECT}
              iconSize={IconSize.LARGE}
              onClick={cropStore.toggleCropMode}
            >
              <span>裁切</span>
            </Button>
            <Button
              icon={IconType.ROTATE}
              iconSize={IconSize.LARGE}
              onClick={cropStore.toggleRotate}
            >
              <span>旋转</span>
            </Button>
            <Button
              icon={IconType.FLIP}
              iconSize={IconSize.LARGE}
              onClick={cropStore.toggleFlipY}
            >
              <span>上下翻转</span>
            </Button>
            <Button
              icon={IconType.FLIP}
              iconSize={IconSize.LARGE}
              onClick={cropStore.toggleFlipX}
              iconRotate={90}
            >
              <span>左右翻转</span>
            </Button>
            <Button
              icon={IconType.RESET}
              iconSize={IconSize.LARGE}
              onClick={cropStore.resetCrop}
            >
              <span>重置</span>
            </Button>
          </CollapsePanel>

          <CollapsePanel header={""} key="crop" showArrow={false} forceRender>
            <CropAspect />
            <ButtonGroup>
              <Button>确认</Button>
              <Button onClick={cropStore.toggleCropMode}>取消</Button>
            </ButtonGroup>
          </CollapsePanel>
        </Collapse>
      </div>
    </>
  );
}

export const Crop = observer(ICrop);
