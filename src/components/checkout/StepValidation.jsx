import { useLanguage } from "../../context/LanguageContext";
import { useCart } from "../../context/CartContext";
import { partIconMap, DefaultPartIcon } from "../../utils/iconMap";
import OrderSummary from "./OrderSummary";
import "./checkoutShared.css";

export default function StepValidation({ onNext }) {
  const { t } = useLanguage();
  const { items, changeQty } = useCart();

  return (
    <div className="checkout-layout">
      <div className="checkout-card">
        <h3>{t("checkout.validationTitle")}</h3>

        {items.length === 0 ? (
          <p className="empty-state">{t("cart.empty")}</p>
        ) : (
          items.map((item) => {
            const Icon = partIconMap[item.icon] || DefaultPartIcon;
            const isUsed = item.condition === "used";
            return (
              <div className="cart-item-row" key={item.id}>
                <div className="cart-item-row__meta">
                  <span className="cart-item-row__icon">
                    <Icon size={20} />
                  </span>
                  <div>
                    <span className="cart-item-row__name">{item.name}</span>
                    <span
                      className="cart-item-row__condition"
                      style={{ color: isUsed ? "var(--cyber-amber)" : "var(--cyber-green)" }}
                    >
                      {isUsed ? t("cart.lockedQty") : t("filters.new")}
                    </span>
                  </div>
                </div>
                <div className="cart-item-row__actions">
                  <div className="qty-control">
                    <button className="qty-btn" disabled={isUsed} onClick={() => changeQty(item.id, 1)}>
                      +
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" disabled={isUsed} onClick={() => changeQty(item.id, -1)}>
                      -
                    </button>
                  </div>
                  <strong style={{ fontFamily: "var(--font-mono)", minWidth: 80, textAlign: "end" }}>
                    {(item.price * item.qty).toFixed(3)} {t("common.currency")}
                  </strong>
                </div>
              </div>
            );
          })
        )}

        <button className="checkout-btn checkout-btn--success" style={{ marginTop: 16 }} onClick={onNext} disabled={items.length === 0}>
          {t("checkout.toAddress")}
        </button>
      </div>

      <OrderSummary />
    </div>
  );
}
