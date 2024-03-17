import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AuthProvider } from "./provider/authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
