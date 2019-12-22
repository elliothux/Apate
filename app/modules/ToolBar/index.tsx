import "./index.scss";
import * as React from "react";
import {Button} from "../../components/Button";
import {Icon, IconType} from "../../components/Icon";

export function ToolBar() {
  return (
    <div id="tool-bar">
        <Button>
            打开
            <Icon type={IconType.DOWN} />
        </Button>
        
        <div>
            <Button>100%</Button>
            <Button><Icon type={IconType.PLUS}/></Button>
            <Button><Icon type={IconType.MINUTE}/></Button>
        </div>
    </div>
  );
}
