//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

console.log("BASE_URL :: ", import.meta.env.VITE_BASE_URL);

createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <App />
    {/*   </StrictMode> */}
  </>
);
