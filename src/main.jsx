import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import CombinedProvider from "./context/CombinedProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CombinedProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CombinedProvider>
  </BrowserRouter>
);
