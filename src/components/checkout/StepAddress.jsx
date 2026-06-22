import { MapPin, Plus } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { savedAddresses } from "../../data/savedAddresses";
import { governorates } from "../../i18n/translations";
import OrderSummary from "./OrderSummary";
import "./checkoutShared.css";
import "./StepAddress.css";

export default function StepAddress({ selectedAddressId, onSelectAddress, customForm, onCustomFormChange, onBack, onNext }) {
  const { t, lang } = useLanguage();
  const isCustom = selectedAddressId === "custom";

  return (
    <div className="checkout-layout">
      <div className="checkout-card">
        <h3>
          <MapPin size={18} />
          {t("checkout.addressTitle")}
        </h3>

        <div className="address-grid">
          {savedAddresses.map((address) => (
            <label
              key={address.id}
              className={`address-card ${selectedAddressId === address.id ? "is-selected" : ""}`}
            >
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedAddressId === address.id}
                onChange={() => onSelectAddress(address.id)}
              />
              <div className="address-card__content">
                <strong className="address-card__title">{address.title}</strong>
                <span className="address-card__detail">{address.fullAddress}</span>
              </div>
            </label>
          ))}

          <label className={`address-card address-card--new ${isCustom ? "is-selected" : ""}`}>
            <input type="radio" name="selectedAddress" checked={isCustom} onChange={() => onSelectAddress("custom")} />
            <div className="address-card__content">
              <strong className="address-card__title address-card__title--amber">
                <Plus size={14} /> {t("checkout.newAddressLabel")}
              </strong>
              <span className="address-card__hint">{t("checkout.newAddressHint")}</span>
            </div>
          </label>
        </div>

        {isCustom && (
          <div className="new-address-form fade-in">
            <div className="checkout-form-group">
              <label>{t("checkout.fullName")}</label>
              <input value={customForm.fullName} onChange={(e) => onCustomFormChange("fullName", e.target.value)} />
            </div>
            <div className="checkout-form-group">
              <label>{t("checkout.phone")}</label>
              <input value={customForm.phone} onChange={(e) => onCustomFormChange("phone", e.target.value)} />
            </div>
            <div className="checkout-form-group">
              <label>{t("checkout.governorate")}</label>
              <select value={customForm.governorate} onChange={(e) => onCustomFormChange("governorate", e.target.value)}>
                {governorates.map((gov) => (
                  <option key={gov.value} value={gov.value}>
                    {gov[lang]}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkout-form-group">
              <label>{t("checkout.newAddrInput")}</label>
              <input value={customForm.address} onChange={(e) => onCustomFormChange("address", e.target.value)} />
            </div>
          </div>
        )}

        <p className="address-profile-note">{t("checkout.profileNote")}</p>

        <div className="checkout-btn-row">
          <button className="checkout-btn checkout-btn--neutral" onClick={onBack}>
            {t("checkout.back")}
          </button>
          <button className="checkout-btn checkout-btn--primary" onClick={onNext}>
            {t("checkout.toPayment")}
          </button>
        </div>
      </div>

      <OrderSummary />
    </div>
  );
}
