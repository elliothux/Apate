import "./index.scss";
import * as React from "react";
import { Button, ButtonGroup } from "components/Button";
import { IconType } from "components/Icon";
import { Gap } from "components/Gap";
import { mainStore } from "state";
import { observer } from "mobx-react";
import { ViewType } from "../../types/state";

function IToolBar() {
  const { view, setView } = mainStore;

  return (
    <div id="tool-bar">
      <Button icon={IconType.DOWN} onClick={mainStore.loadImageFile}>
        打开
      </Button>

      <ButtonGroup>
        <Button icon={IconType.DOWN}>100%</Button>
        <Gap w={5} />
        <Button icon={IconType.PLUS} />
        <Gap w={5} />
        <Button icon={IconType.MINUS} />
      </ButtonGroup>

      <ButtonGroup>
        <Button icon={IconType.CROP}>裁剪</Button>
        <Gap />
        <Button
          icon={IconType.ADJUSTMENT}
          activated={view === ViewType.ADJUSTMENT}
          onClick={() => setView(ViewType.ADJUSTMENT)}
        >
          调整
        </Button>
        <Gap />
        <Button
          icon={IconType.COLORS}
          activated={view === ViewType.FILTER}
          onClick={() => setView(ViewType.FILTER)}
        >
          滤镜
        </Button>
      </ButtonGroup>

      <Button icon={IconType.EXPORT} />
    </div>
  );
}

export const ToolBar = observer(IToolBar);
