import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BuyerPage from "./pages/BuyerPage";
import SellerPage from "./pages/SellerPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BuyerPage />} />
        <Route path="sell" element={<SellerPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}
