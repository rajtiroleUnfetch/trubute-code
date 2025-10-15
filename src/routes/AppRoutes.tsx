// src/routes/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTrubutePage from "../pages/CreateTrubutePage";
import App from "../App";
import NotFound from "../pages/NotFound";

// --- Import your pages ---


const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App />} />

        {/* Tribute creation flow */}
        {/* <Route path="/create-memorial" element={<CreateMemorialFor />} /> */}
        <Route path="/create-trubute" element={<CreateTrubutePage />} />
        {/* <Route path="/plan" element={<ChoosePlan />} />
        <Route path="/privacy" element={<PrivacyOptions />} /> */}

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
