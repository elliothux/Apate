import * as React from "react";
import { observer } from "mobx-react";
import { Canvas } from "./modules/Canvas";
import { ToolBar } from "./modules/ToolBar";
import { Adjustment } from "./modules/Adjustment";
import { Filter } from "./modules/Filter";
import { Histogram } from "./modules/Histogram";
import { WithEmptyImage } from "./modules/WithEmptyImage";
import { mainStore } from "./state";
import { Maybe } from "./types";
import { ViewType } from "./types/state";

function IApp() {
  const { ready, view } = mainStore;

  if (!ready) {
    return <p>Loading</p>;
  }

  let panel: Maybe<React.ReactElement>;
  switch (view) {
    case ViewType.ADJUSTMENT: {
      panel = <Adjustment />;
      break;
    }
    case ViewType.FILTER: {
      panel = <Filter />;
      break;
    }
  }

  return (
    <>
      <ToolBar />
      <WithEmptyImage>
        <Canvas />
        {panel}
        <Histogram />
      </WithEmptyImage>
    </>
  );
}

export const App = observer(IApp);
