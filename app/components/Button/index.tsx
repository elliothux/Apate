import "./index.scss";
import * as React from "react";
import { WithOptionalReactChildren, WithReactChildren } from "types";
import { Icon, IconSize, IconType } from "../Icon";

interface Props extends WithOptionalReactChildren {
  icon?: IconType;
  iconSize?: IconSize;
  iconRotate?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  activated?: boolean;
}

export function Button({
  children,
  icon,
  iconSize,
  iconRotate,
  onClick,
  activated
}: Props) {
  return (
    <div className={`button${activated ? " activated" : ""}`} onClick={onClick}>
      {children}
      {icon ? <Icon type={icon} size={iconSize} rotate={iconRotate} /> : null}
    </div>
  );
}

interface GroupProps extends WithReactChildren {}

export function ButtonGroup({ children }: GroupProps) {
  return <div className="button-group">{children}</div>;
}
