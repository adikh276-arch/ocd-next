import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import WhatIsPureO from "./pages/WhatIsPureO";
import "@/lib/i18n";
import "./index.css";
const App = ({ initialPath }: { initialPath?: string }) => {
  
  return (
    <div className="theme-pure_ocd isolate min-h-[100dvh] bg-background text-foreground">
      <MemoryRouter initialEntries={[initialPath || "/"]}>
        <Routes>
          <Route index element={<WhatIsPureO />} />
          <Route path="/" element={<WhatIsPureO />} />
          <Route path="*" element={<WhatIsPureO />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
