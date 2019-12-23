import * as React from "react";
import { Canvas } from "./modules/Canvas";
import { ToolBar } from "./modules/ToolBar";
import { Adjustment } from "./modules/Adjustment";

export function App() {
  return (
    <>
      <ToolBar />
      <Adjustment />
      <Canvas />
    </>
  );
}
