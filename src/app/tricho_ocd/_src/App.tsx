import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import HabitReversal from "./pages/HabitReversal";
import SensorySubstitution from "./pages/SensorySubstitution";

import "@/lib/i18n";
import "./index.css";
const App = ({ initialPath }: { initialPath?: string }) => {
  
  return (
    <div className="theme-tricho_ocd isolate min-h-[100dvh] bg-background text-foreground">
      <MemoryRouter initialEntries={[initialPath || "/"]}>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/habit_reversal" element={<HabitReversal />} />
          <Route path="/sensory_substitution" element={<SensorySubstitution />} />

          <Route path="*" element={<Index />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
