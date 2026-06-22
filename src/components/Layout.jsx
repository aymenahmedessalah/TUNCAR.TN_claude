import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useVehicle } from "../context/VehicleContext";

export default function Layout() {
  const { label } = useVehicle();

  return (
    <div className="site-wrapper">
      <Navbar selectedVehicleLabel={label} />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
