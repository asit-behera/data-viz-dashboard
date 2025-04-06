//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { StrictMode } from "react";

console.log("BASE_URL :: ", import.meta.env.VITE_BASE_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
