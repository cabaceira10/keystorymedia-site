import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Casca from "./casca";
import Home from "./paginas/Home";

createRoot(document.getElementById("raiz")!).render(
  <StrictMode>
    <Casca>{(mov) => <Home mov={mov} />}</Casca>
  </StrictMode>,
);
