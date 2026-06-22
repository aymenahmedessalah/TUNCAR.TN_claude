import { CreditCard, Lock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./checkoutShared.css";
import "./StepPayment.css";

export default function StepPayment({ paymentMethod, onMethodChange, cardContact, onCardContactChange, onBack, onConfirm }) {
  const { t } = useLanguage();

  return (
    <div className="checkout-layout checkout-layout--single">
      <div className="checkout-card checkout-card--narrow">
        <h3>
          <CreditCard size={18} />
          {t("checkout.paymentTitle")}
        </h3>

        <div className="checkout-form-group">
          <label>{t("checkout.paymentMethod")}</label>
          <select value={paymentMethod} onChange={(e) => onMethodChange(e.target.value)}>
            <option value="cod">{t("checkout.cod")}</option>
            <option value="card">{t("checkout.card")}</option>
          </select>
        </div>

        {paymentMethod === "card" && (
          <div className="payment-gateway fade-in">
            <div className="payment-gateway__logo">click to pay</div>
            <p className="payment-gateway__note">{t("checkout.gatewayNote")}</p>
            <div className="checkout-form-group">
              <label>{t("checkout.gatewayInputLabel")}</label>
              <input
                className="payment-gateway__input"
                placeholder="username@domain.com"
                value={cardContact}
                onChange={(e) => onCardContactChange(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="checkout-btn-row">
          <button className="checkout-btn checkout-btn--neutral" onClick={onBack}>
            {t("checkout.back")}
          </button>
          <button className="checkout-btn checkout-btn--amber" onClick={onConfirm}>
            <Lock size={15} />
            {t("checkout.confirmPay")}
          </button>
        </div>
      </div>
    </div>
  );
}
