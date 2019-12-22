import "./index.scss";
import * as React from "react";
import { WithReactChildren } from "../../types";

interface Props extends WithReactChildren {}

export function Button({ children }: Props) {
  return <button className="button">{children}</button>;
}
