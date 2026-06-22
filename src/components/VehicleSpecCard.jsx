import { useLanguage } from "../context/LanguageContext";
import "./VehicleSpecCard.css";

export default function VehicleSpecCard({ vehicle }) {
  const { t } = useLanguage();
  if (!vehicle) return null;

  return (
    <section className="vehicle-spec-card fade-in">
      <header className="vehicle-spec-card__header">
        <h2 className="vehicle-spec-card__title">
          {vehicle.brand} {vehicle.model}
        </h2>
        <span className="vehicle-spec-card__badge">{vehicle.variant}</span>
      </header>

      <div className="vehicle-spec-card__grid">
        <div className="vehicle-spec-card__item">
          <div className="vehicle-spec-card__label">{t("spec.year")}</div>
          <div className="vehicle-spec-card__value">{vehicle.year}</div>
        </div>
        <div className="vehicle-spec-card__item">
          <div className="vehicle-spec-card__label">{t("spec.gearbox")}</div>
          <div className="vehicle-spec-card__value">{vehicle.gearbox}</div>
        </div>
        <div className="vehicle-spec-card__item vehicle-spec-card__item--full">
          <div className="vehicle-spec-card__label">{t("spec.oil")}</div>
          <div className="vehicle-spec-card__value vehicle-spec-card__value--accent">{vehicle.oil}</div>
        </div>
        <div className="vehicle-spec-card__item vehicle-spec-card__item--full">
          <div className="vehicle-spec-card__label">{t("spec.notes")}</div>
          <div className="vehicle-spec-card__value vehicle-spec-card__value--muted">{vehicle.notes}</div>
        </div>
      </div>
    </section>
  );
}
