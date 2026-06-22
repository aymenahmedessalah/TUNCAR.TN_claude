import { useState } from "react";
import { Save } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./SellerPage.css";

const INITIAL_FORM = {
  brand: "",
  model: "",
  variant: "",
  year: "",
  gearbox: "",
  oil: "",
  notes: "",
};

export default function SellerPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // In production this would POST to the vehicles/parts API endpoint.
    // For this prototype we simply confirm success to the seller.
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section className="seller-page fade-in">
      <h1 className="seller-page__title">{t("seller.title")}</h1>
      <p className="seller-page__desc">{t("seller.desc")}</p>

      {submitted && <div className="seller-page__success">{t("seller.success")}</div>}

      <form className="seller-form" onSubmit={handleSubmit}>
        <div className="seller-form__grid">
          <Field label={t("seller.brand")} placeholder="Volkswagen" value={form.brand} onChange={(v) => handleChange("brand", v)} />
          <Field label={t("seller.model")} placeholder="Golf 6" value={form.model} onChange={(v) => handleChange("model", v)} />
          <Field label={t("seller.variant")} placeholder="1.4 TSI" value={form.variant} onChange={(v) => handleChange("variant", v)} />
          <Field
            label={t("seller.year")}
            placeholder="2012"
            type="number"
            value={form.year}
            onChange={(v) => handleChange("year", v)}
          />
          <Field label={t("seller.gearbox")} placeholder="DSG 7-Speed" value={form.gearbox} onChange={(v) => handleChange("gearbox", v)} />
          <Field label={t("seller.oil")} placeholder="5W30 VW 504.00" value={form.oil} onChange={(v) => handleChange("oil", v)} />

          <div className="seller-form__field seller-form__field--full">
            <label>{t("seller.notes")}</label>
            <textarea rows={4} value={form.notes} onChange={(event) => handleChange("notes", event.target.value)} />
          </div>
        </div>

        <button type="submit" className="seller-form__submit">
          <Save size={16} />
          {t("seller.submit")}
        </button>
      </form>
    </section>
  );
}

function Field({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="seller-form__field">
      <label>{label}</label>
      <input type={type} required placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
