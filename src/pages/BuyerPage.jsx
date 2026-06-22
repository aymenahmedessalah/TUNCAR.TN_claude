import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useVehicle } from "../context/VehicleContext";
import { vehicleDatabase } from "../data/vehicleDatabase";
import { partsCatalog } from "../data/partsCatalog";
import BrandCarousel from "../components/BrandCarousel";
import TagRow from "../components/TagRow";
import VehicleSpecCard from "../components/VehicleSpecCard";
import SubsystemDiagram from "../components/SubsystemDiagram";
import ConditionFilter from "../components/ConditionFilter";
import PartCard from "../components/PartCard";
import "./BuyerPage.css";

const brands = Object.keys(vehicleDatabase);

export default function BuyerPage() {
  const { t } = useLanguage();
  const { vehicle, setVehicle } = useVehicle();

  // Local selection state while the user is still narrowing down the car.
  const [draftBrand, setDraftBrand] = useState(vehicle?.brand ?? null);
  const [draftModel, setDraftModel] = useState(vehicle?.model ?? null);
  const [draftVariant, setDraftVariant] = useState(vehicle?.variant ?? null);

  const [activeSystem, setActiveSystem] = useState("Engine");
  const [condition, setCondition] = useState("new");
  const [subCondition, setSubCondition] = useState("all");

  const models = draftBrand ? Object.keys(vehicleDatabase[draftBrand]) : [];
  const variantEntries = useMemo(
    () => (draftBrand && draftModel ? vehicleDatabase[draftBrand][draftModel] : []),
    [draftBrand, draftModel]
  );
  const variants = useMemo(() => [...new Set(variantEntries.map((entry) => entry.variant))], [variantEntries]);
  const activeVariantEntry = variantEntries.find((entry) => entry.variant === draftVariant);
  const years = activeVariantEntry?.years ?? [];

  function handleSelectBrand(brand) {
    setDraftBrand(brand);
    setDraftModel(null);
    setDraftVariant(null);
  }

  function handleSelectModel(model) {
    setDraftModel(model);
    setDraftVariant(null);
  }

  function handleSelectVariant(variant) {
    setDraftVariant(variant);
  }

  function handleSelectYear(year) {
    const entry = variantEntries.find((item) => item.variant === draftVariant);
    setVehicle({
      brand: draftBrand,
      model: draftModel,
      variant: draftVariant,
      year,
      gearbox: entry.gearbox,
      oil: entry.oil,
      notes: entry.notes,
    });
  }

  function handleChangeVehicle() {
    setVehicle(null);
    setDraftBrand(null);
    setDraftModel(null);
    setDraftVariant(null);
  }

  const visibleParts = (partsCatalog[activeSystem] || []).filter((part) => {
    if (part.condition !== condition) return false;
    if (condition === "used" && subCondition !== "all" && part.subCondition !== subCondition) return false;
    return true;
  });

  // ---- Phase 1: no vehicle locked in yet -> show the selection flow ----
  if (!vehicle) {
    return (
      <section className="buyer-selection fade-in">
        <header className="buyer-selection__hero">
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.desc")}</p>
        </header>

        <BrandCarousel brands={brands} selectedBrand={draftBrand} onSelectBrand={handleSelectBrand} />

        {draftBrand && (
          <div className="vehicle-flow-panel">
            <TagRow title={t("flow.model")} options={models} selectedValue={draftModel} onSelect={handleSelectModel} />
            <TagRow title={t("flow.variant")} options={variants} selectedValue={draftVariant} onSelect={handleSelectVariant} />
            <TagRow title={t("flow.year")} options={years} selectedValue={null} onSelect={handleSelectYear} />
          </div>
        )}
      </section>
    );
  }

  // ---- Phase 2: vehicle locked in -> browse subsystems & parts ----
  return (
    <section className="buyer-browse fade-in">
      <VehicleSpecCard vehicle={vehicle} />

      <button className="buyer-browse__change-btn" onClick={handleChangeVehicle}>
        <ArrowRight size={14} />
        {t("hero.title")}
      </button>

      <SubsystemDiagram activeSystem={activeSystem} onSelect={setActiveSystem} />

      <ConditionFilter
        condition={condition}
        subCondition={subCondition}
        onConditionChange={(value) => {
          setCondition(value);
          setSubCondition("all");
        }}
        onSubConditionChange={setSubCondition}
      />

      <div className="parts-grid">
        {visibleParts.map((part) => (
          <PartCard key={part.id} part={part} />
        ))}
      </div>
    </section>
  );
}
