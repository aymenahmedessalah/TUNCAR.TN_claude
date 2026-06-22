import { createContext, useContext, useState } from "react";

const VehicleContext = createContext(null);

/**
 * Holds the vehicle currently selected on the Buyer page (brand, model,
 * variant, year, and OEM specs). Lives above the router so the navbar's
 * "current car" pill can read it on every page, and so a future backend
 * integration only needs to populate this one place.
 */
export function VehicleProvider({ children }) {
  const [vehicle, setVehicle] = useState(null);

  const label = vehicle ? `${vehicle.brand} ${vehicle.model} | ${vehicle.variant} (${vehicle.year})` : null;

  return (
    <VehicleContext.Provider value={{ vehicle, setVehicle, label }}>{children}</VehicleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVehicle() {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicle must be used within a VehicleProvider");
  }
  return context;
}
