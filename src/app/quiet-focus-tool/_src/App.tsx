import React, { useEffect, useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AttentionSwitch from "./pages/activities/AttentionSwitch";
import DoNothing from "./pages/activities/DoNothing";
import LabelTheNoise from "./pages/activities/LabelTheNoise";
import "@/lib/i18n";

import "./index.css";
const App = ({ initialPath }: { initialPath?: string }) => {
    
  // Debug log to help identify routing issues in dev
  React.useEffect(() => {
    console.log("[QuietFocusTool] Initial Path:", initialPath);
  }, [initialPath]);
  
  return (
    <div className="theme-quiet-focus-tool isolate min-h-[100dvh] bg-background text-foreground">
      <MemoryRouter initialEntries={[initialPath || "/"]}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/activity/attention-switch" element={<AttentionSwitch />} />
          <Route path="/activity/do-nothing" element={<DoNothing />} />
          <Route path="/activity/label-the-noise" element={<LabelTheNoise />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
