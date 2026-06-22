import { useLanguage } from "../../context/LanguageContext";
import { useCart } from "../../context/CartContext";
import "./OrderSummary.css";

export default function OrderSummary() {
  const { t } = useLanguage();
  const { totals } = useCart();

  return (
    <aside className="order-summary">
      <h4 className="order-summary__title">{t("checkout.summaryTitle")}</h4>
      <div className="order-summary__row">
        <span>{t("checkout.subtotal")}</span>
        <strong>
          {totals.subtotal.toFixed(3)} {t("common.currency")}
        </strong>
      </div>
      <div className="order-summary__row">
        <span>{t("checkout.shipping")}</span>
        <strong>
          {totals.shipping.toFixed(3)} {t("common.currency")}
        </strong>
      </div>
      <div className="order-summary__row order-summary__row--total">
        <span>{t("checkout.netTotal")}</span>
        <strong>
          {totals.total.toFixed(3)} {t("common.currency")}
        </strong>
      </div>
    </aside>
  );
}
