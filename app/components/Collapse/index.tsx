import "rc-collapse/assets/index.css";
import "./index.scss";
import * as React from "react";
import ICollapse, { Panel } from "rc-collapse";
import { WithReactChildren } from "../../types";

interface CollapseProps extends WithReactChildren {
  activeKey?: string[];
  className?: string;
  defaultActiveKey?: string[];
  destroyInactivePanel?: boolean;
  accordion?: boolean;
  onChange?: (key: string) => void;
}

export function Collapse(props: CollapseProps) {
  return React.createElement(ICollapse, props);
}

interface CollapsePanelProps extends WithReactChildren {
  header: string | React.ReactNode;
  headerClass?: string;
  showArrow?: boolean;
  className?: string;
  forceRender?: boolean;
  extra?: string | React.ReactNode;
}

export function CollapsePanel(props: CollapsePanelProps) {
  return React.createElement(Panel, props);
}
