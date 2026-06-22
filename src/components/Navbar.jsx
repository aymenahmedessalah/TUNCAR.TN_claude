import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Briefcase, ShoppingCart, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const LANGUAGE_OPTIONS = [
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

export default function Navbar({ selectedVehicleLabel }) {
  const { lang, setLang, t } = useLanguage();
  const { totals } = useCart();
  const navigate = useNavigate();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-side">
        <NavLink to="/" className="navbar-logo">
          {t("common.brandName")}
          <span>.TN</span>
        </NavLink>

        <nav className="navbar-tabs">
          <NavLink to="/" end className={({ isActive }) => `navbar-tab navbar-tab--buyer ${isActive ? "is-active" : ""}`}>
            <ShoppingBag size={16} />
            {t("nav.buyer")}
          </NavLink>
          <NavLink to="/sell" className={({ isActive }) => `navbar-tab navbar-tab--seller ${isActive ? "is-active" : ""}`}>
            <Briefcase size={16} />
            {t("nav.seller")}
          </NavLink>
        </nav>
      </div>

      {selectedVehicleLabel && (
        <button className="navbar-vehicle-pill" onClick={() => navigate("/")}>
          <span className="navbar-vehicle-pill__label">{t("nav.currentCar")}</span>
          <span className="navbar-vehicle-pill__value">{selectedVehicleLabel}</span>
        </button>
      )}

      <div className="navbar-side navbar-side--end">
        <span className="navbar-greeting">{t("nav.greeting")}</span>

        <button className="navbar-cart" onClick={() => navigate("/checkout")}>
          <ShoppingCart size={16} />
          <span className="navbar-cart__total">
            {totals.total.toFixed(3)} {t("common.currency")}
          </span>
          <span className="navbar-cart__badge">{totals.totalQty}</span>
        </button>

        <div className="navbar-lang">
          <button className="navbar-lang__trigger" onClick={() => setLangMenuOpen((open) => !open)}>
            <Globe size={14} />
            {LANGUAGE_OPTIONS.find((option) => option.code === lang)?.label}
            <ChevronDown size={12} className={langMenuOpen ? "is-flipped" : ""} />
          </button>

          {langMenuOpen && (
            <div className="navbar-lang__menu">
              {LANGUAGE_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  className="navbar-lang__option"
                  onClick={() => {
                    setLang(option.code);
                    setLangMenuOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
