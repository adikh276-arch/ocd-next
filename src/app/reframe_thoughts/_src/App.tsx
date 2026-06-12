import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import ReframeThoughts from "./pages/ReframeThoughts";
import "@/lib/i18n";
import "./index.css";
const App = ({ initialPath }: { initialPath?: string }) => {
  
  return (
    <div className="theme-reframe_thoughts isolate min-h-[100dvh] bg-background text-foreground">
      <MemoryRouter initialEntries={[initialPath || "/"]}>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/reframethoughts" element={<ReframeThoughts />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
