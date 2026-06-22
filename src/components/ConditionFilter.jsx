import { useLanguage } from "../context/LanguageContext";
import "./ConditionFilter.css";

const SUB_CONDITIONS = ["all", "likeNew", "usedOnly"];

export default function ConditionFilter({ condition, subCondition, onConditionChange, onSubConditionChange }) {
  const { t } = useLanguage();

  return (
    <div className="condition-filter fade-in">
      <label className="condition-filter__label">{t("filters.condition")}</label>

      <div className="condition-filter__row">
        <button
          className={`condition-filter__tag ${condition === "new" ? "is-active" : ""}`}
          onClick={() => onConditionChange("new")}
        >
          {t("filters.new")}
        </button>
        <button
          className={`condition-filter__tag ${condition === "used" ? "is-active" : ""}`}
          onClick={() => onConditionChange("used")}
        >
          {t("filters.used")}
        </button>
      </div>

      {condition === "used" && (
        <div className="condition-filter__sub-row fade-in">
          {SUB_CONDITIONS.map((key) => (
            <button
              key={key}
              className={`condition-filter__tag condition-filter__tag--sm ${subCondition === key ? "is-active" : ""}`}
              onClick={() => onSubConditionChange(key)}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
