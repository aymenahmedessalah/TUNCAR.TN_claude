import { useLanguage } from "../../context/LanguageContext";
import "./CheckoutTimeline.css";

const STEP_KEYS = ["validation", "address", "payment", "report", "warranty"];

export default function CheckoutTimeline({ currentStep }) {
  const { t } = useLanguage();
  const progressPercent = ((currentStep - 1) / (STEP_KEYS.length - 1)) * 100;

  return (
    <div className="checkout-timeline">
      <div className="checkout-timeline__line" />
      <div className="checkout-timeline__progress" style={{ width: `${progressPercent}%` }} />

      {STEP_KEYS.map((key, index) => {
        const stepNumber = index + 1;
        const state = stepNumber < currentStep ? "completed" : stepNumber === currentStep ? "active" : "";
        return (
          <div key={key} className={`checkout-timeline__step ${state}`}>
            <div className="checkout-timeline__node">{stepNumber}</div>
            <div className="checkout-timeline__label">{t(`checkout.steps.${key}`)}</div>
          </div>
        );
      })}
    </div>
  );
}
