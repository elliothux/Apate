import "./index.scss";
import * as React from "react";
import { WithOptionalReactChildren, WithReactChildren } from "../../types";
import { Icon, IconSize, IconType } from "../Icon";

interface Props extends WithOptionalReactChildren {
  icon?: IconType;
  iconSize?: IconSize;
}

export function Button({ children, icon, iconSize }: Props) {
  return (
    <div className="button">
      {children}
      {icon ? <Icon type={icon} size={iconSize} /> : null}
    </div>
  );
}

interface GroupProps extends WithReactChildren {}

export function ButtonGroup({ children }: GroupProps) {
  return <div className="button-group">{children}</div>;
}
