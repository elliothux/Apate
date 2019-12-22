import * as React from "react";
import { Canvas } from "./modules/Canvas";
import { ToolBar } from "./modules/ToolBar";

export function App() {
  return (
    <>
      <ToolBar />
      <Canvas />
    </>
  );
}
