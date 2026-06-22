// ==========================================================================
// VEHICLE DATABASE (MOCK / SEED DATA)
// This represents the data a real backend would serve from a vehicles
// table. Structure: brand -> model -> array of variants, each variant
// carrying its compatible years and OEM technical specs.
//
// NOTE: values below are placeholder demo data for prototyping the UI
// flow only. In production this would be populated by sellers through
// the Seller Dashboard and validated against real OEM references.
// ==========================================================================

export const vehicleDatabase = {
  Volkswagen: {
    "Golf 6": [
      {
        variant: "1.4 TSI",
        years: ["2010", "2011", "2012"],
        gearbox: "DSG 7-Speed",
        oil: "5W30 VW 504.00",
        notes: "Dual-charged (turbo + supercharger) engine family.",
      },
    ],
    Polo: [
      {
        variant: "1.2 HTP",
        years: ["2011", "2012", "2013"],
        gearbox: "Manual 5-Speed",
        oil: "5W40 VW 502.00",
        notes: "Economical naturally-aspirated engine system.",
      },
    ],
  },
  Peugeot: {
    208: [
      {
        variant: "1.2 PureTech",
        years: ["2015", "2016", "2017"],
        gearbox: "Manual 5-Speed",
        oil: "0W30 PSA B71 2312",
        notes: "Direct-injection French engine platform.",
      },
    ],
  },
  Renault: {
    "Clio 4": [
      {
        variant: "1.5 dCi",
        years: ["2013", "2014", "2015"],
        gearbox: "Manual 5-Speed",
        oil: "5W30 RN0720",
        notes: "Common-rail diesel, known for high fuel economy.",
      },
    ],
  },
  Hyundai: {
    "i30": [
      {
        variant: "1.6 GDI",
        years: ["2016", "2017", "2018"],
        gearbox: "Automatic 6-Speed",
        oil: "5W20 API SN",
        notes: "Direct-injection gasoline engine.",
      },
    ],
  },
};
