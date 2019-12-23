import * as React from "react";
import { WithReactChildren } from "types";
import { observer } from "mobx-react";
import { mainStore } from "../../state";

interface Props extends WithReactChildren {}

function IWithEmptyImage({ children }: Props) {
  const { imageSrc } = mainStore;
  if (!imageSrc) {
    return <div>111</div>;
  }
  return children;
}

export const WithEmptyImage = observer(
  IWithEmptyImage as React.FunctionComponent
);
