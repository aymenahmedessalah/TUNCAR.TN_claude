import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext";
import { VehicleProvider } from "./context/VehicleContext";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <VehicleProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </VehicleProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
