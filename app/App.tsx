import * as React from "react";
import { observer } from "mobx-react";
import { Canvas } from "./modules/Canvas";
import { ToolBar } from "./modules/ToolBar";
import { Adjustment } from "./modules/Adjustment";
import { Filter } from "./modules/Filter";
import { WithEmptyImage } from "./modules/WithEmptyImage";
import { mainStore } from "./state";

function IApp() {
  if (!mainStore.ready) {
    return <p>Loading</p>;
  }

  return (
    <>
      <ToolBar />
      <WithEmptyImage>
        <Filter />
        {/*<Adjustment />*/}
        <Canvas />
      </WithEmptyImage>
    </>
  );
}

export const App = observer(IApp);
