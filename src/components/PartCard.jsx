import { ShoppingCart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { partIconMap, DefaultPartIcon } from "../utils/iconMap";
import "./PartCard.css";

function getFairnessState(price, marketReference) {
  const percentage = Math.min(100, Math.round((price / marketReference) * 100));
  if (percentage > 110) return { percentage, level: "expensive" };
  if (percentage > 95) return { percentage, level: "average" };
  return { percentage, level: "great" };
}

export default function PartCard({ part }) {
  const { t } = useLanguage();
  const { addItem, items } = useCart();
  const Icon = partIconMap[part.icon] || DefaultPartIcon;
  const fairness = getFairnessState(part.price, part.marketReference);
  const alreadyInCart = items.some((item) => item.id === part.id);

  return (
    <article className="part-card">
      <div className="part-card__image">
        <Icon size={34} />
      </div>

      <h3 className="part-card__title">{part.name}</h3>

      <div className="part-card__badges">
        <span className={`part-badge part-badge--${part.condition}`}>{t(`filters.${part.condition}`)}</span>
        {part.subCondition && <span className="part-badge part-badge--sub">{t(`filters.${part.subCondition}`)}</span>}
      </div>

      <div className="part-card__price-box">
        <div className="part-card__price">
          {part.price.toFixed(3)} {t("common.currency")}
        </div>
        <div className="part-card__reference">
          <span>{t("market.refNewLabel")}</span>
          <span className="part-card__reference-value">
            {part.marketReference.toFixed(3)} {t("common.currency")}
          </span>
        </div>
      </div>

      <div className="part-card__gauge">
        <div className="part-card__gauge-labels">
          <span>{t("market.gauge")}</span>
          <span className={`part-card__gauge-status part-card__gauge-status--${fairness.level}`}>
            {t(`market.${fairness.level}`)}
          </span>
        </div>
        <div className="part-card__gauge-track">
          <div
            className={`part-card__gauge-fill part-card__gauge-fill--${fairness.level}`}
            style={{ width: `${fairness.percentage}%` }}
          />
        </div>
      </div>

      <button className="part-card__buy-btn" onClick={() => addItem(part)} disabled={alreadyInCart && part.condition === "used"}>
        <ShoppingCart size={15} />
        {t("market.addToCart")}
      </button>
    </article>
  );
}
