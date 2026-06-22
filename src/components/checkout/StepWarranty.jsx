import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, SlidersHorizontal, Home } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./checkoutShared.css";
import "./StepWarranty.css";

const WARRANTY_BADGES = {
  pending: { Icon: Clock, className: "badge--pending", textKey: "statePending" },
  verified: { Icon: CheckCircle2, className: "badge--verified", textKey: "stateVerified" },
  unclear: { Icon: AlertTriangle, className: "badge--unclear", textKey: "stateUnclear" },
};

export default function StepWarranty({ videoFile, onReturnHome }) {
  const { t } = useLanguage();
  const [adminState, setAdminState] = useState("pending");
  const [reviewNote, setReviewNote] = useState("");

  // Warranty target date is fixed once when this step is first shown.
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date;
  });

  const [remaining, setRemaining] = useState({ days: "365", hours: "00", mins: "00", secs: "00" });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetDate - new Date();
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setRemaining({
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
        mins: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        secs: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const videoUrl = useMemo(() => (videoFile ? URL.createObjectURL(videoFile) : null), [videoFile]);
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  function simulate(state) {
    setAdminState(state);
    if (state === "verified") setReviewNote(t("checkout.alertVerified"));
    else if (state === "unclear") setReviewNote(t("checkout.alertUnclear"));
    else setReviewNote("");
  }

  const badge = WARRANTY_BADGES[adminState];

  return (
    <div className="checkout-card checkout-card--narrow warranty-card">
      <CheckCircle2 size={48} className="warranty-card__check" />
      <h2 className="warranty-card__title">{t("checkout.completedTitle")}</h2>
      <p className="warranty-card__started">{t("checkout.warrantyStarted")}</p>

      <div className="countdown">
        <CountdownBlock value={remaining.days} label={t("checkout.days")} />
        <CountdownBlock value={remaining.hours} label={t("checkout.hours")} />
        <CountdownBlock value={remaining.mins} label={t("checkout.mins")} />
        <CountdownBlock value={remaining.secs} label={t("checkout.secs")} />
      </div>

      <div className="warranty-card__playback-section">
        <h4>{t("checkout.playbackHeader")}</h4>
        <div className="media-playback">{videoUrl && <video src={videoUrl} controls />}</div>

        <span className="warranty-card__review-label">{t("checkout.reviewStatus")}</span>
        <div className={`verification-badge ${badge.className}`}>
          <badge.Icon size={15} />
          {t(`checkout.${badge.textKey}`)}
        </div>
        {reviewNote && <p className="warranty-card__review-note">{reviewNote}</p>}
      </div>

      <div className="admin-simulator">
        <div className="admin-simulator__title">
          <SlidersHorizontal size={13} />
          {t("checkout.simulatorTitle")}
        </div>
        <div className="admin-simulator__buttons">
          <button className="checkout-btn checkout-btn--success admin-simulator__btn" onClick={() => simulate("verified")}>
            {t("checkout.simulateVerified")}
          </button>
          <button className="checkout-btn checkout-btn--amber admin-simulator__btn" onClick={() => simulate("pending")}>
            {t("checkout.simulatePending")}
          </button>
          <button
            className="checkout-btn admin-simulator__btn admin-simulator__btn--danger"
            onClick={() => simulate("unclear")}
          >
            {t("checkout.simulateUnclear")}
          </button>
        </div>
      </div>

      <button className="checkout-btn checkout-btn--primary" style={{ marginTop: 25 }} onClick={onReturnHome}>
        <Home size={15} />
        {t("checkout.returnHome")}
      </button>
    </div>
  );
}

function CountdownBlock({ value, label }) {
  return (
    <div className="countdown__block">
      <div className="countdown__num">{value}</div>
      <div className="countdown__label">{label}</div>
    </div>
  );
}
