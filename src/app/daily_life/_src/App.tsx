import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";

import "@/lib/i18n";
import "./index.css";
const App = ({ initialPath }: { initialPath?: string }) => {
  
  return (
    <div className="theme-daily_life isolate min-h-[100dvh] bg-background text-foreground">
      <MemoryRouter initialEntries={[initialPath || "/"]}>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />

          <Route path="*" element={<Index />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
