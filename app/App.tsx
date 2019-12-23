import * as React from "react";
import { Canvas } from "./modules/Canvas";
import { ToolBar } from "./modules/ToolBar";
import { Adjustment } from "./modules/Adjustment";
import { WithEmptyImage } from "./modules/WithEmptyImage";

export function App() {
  return (
    <>
      <ToolBar />
      <WithEmptyImage>
        <Adjustment />
        <Canvas />
      </WithEmptyImage>
    </>
  );
}
