// ==========================================================================
// PARTS CATALOG (MOCK / SEED DATA)
// Parts are grouped by vehicle subsystem (Engine, Suspension, Body,
// Electrical) to match the interactive diagram on the Buyer page.
//
// `marketReference` represents the estimated price of the same part
// when brand new — it powers the "price fairness" gauge on each card.
// `icon` is a key resolved to a lucide-react icon component, keeping
// this data file framework-agnostic (no JSX/emoji baked into the data).
// ========================================================================== =

export const partsCatalog = {
  Engine: [
    {
      id: "e1",
      name: "Complete OEM Cylinder Head",
      condition: "new",
      subCondition: "",
      price: 1500,
      marketReference: 1600,
      icon: "cylinder-head",
    },
    {
      id: "e2",
      name: "Imported Original Cylinder Head",
      condition: "used",
      subCondition: "likeNew",
      price: 850,
      marketReference: 1500,
      icon: "cylinder-head",
    },
    {
      id: "e3",
      name: "Sachs Original Clutch Kit",
      condition: "new",
      subCondition: "",
      price: 500,
      marketReference: 550,
      icon: "clutch",
    },
    {
      id: "e4",
      name: "Garrett Turbocharger – Golf 6",
      condition: "new",
      subCondition: "",
      price: 1900,
      marketReference: 1950,
      icon: "turbo",
    },
  ],
  Suspension: [
    {
      id: "s1",
      name: "Bilstein Front Shock Absorbers (Pair)",
      condition: "new",
      subCondition: "",
      price: 420,
      marketReference: 450,
      icon: "shock",
    },
    {
      id: "s2",
      name: "Original Used Shock Absorbers",
      condition: "used",
      subCondition: "usedOnly",
      price: 180,
      marketReference: 420,
      icon: "shock",
    },
  ],
  Body: [
    {
      id: "b1",
      name: "Full LED Headlight – R-Line",
      condition: "new",
      subCondition: "",
      price: 850,
      marketReference: 900,
      icon: "headlight",
    },
    {
      id: "b2",
      name: "Used Left Headlight",
      condition: "used",
      subCondition: "likeNew",
      price: 450,
      marketReference: 850,
      icon: "headlight",
    },
  ],
  Electrical: [
    {
      id: "el1",
      name: "Bosch Alternator 140A",
      condition: "new",
      subCondition: "",
      price: 650,
      marketReference: 700,
      icon: "alternator",
    },
    {
      id: "el2",
      name: "Used Alternator",
      condition: "used",
      subCondition: "usedOnly",
      price: 320,
      marketReference: 650,
      icon: "alternator",
    },
  ],
};
