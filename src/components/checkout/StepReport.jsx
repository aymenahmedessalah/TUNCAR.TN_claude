import { Package, Camera, Video, AlertTriangle, Send } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./checkoutShared.css";
import "./StepReport.css";

export default function StepReport({
  imageFile,
  videoFile,
  onImageChange,
  onVideoChange,
  answers,
  onAnswerChange,
  errorMessage,
  onSubmit,
}) {
  const { t } = useLanguage();

  return (
    <div className="checkout-layout checkout-layout--single">
      <div className="checkout-card checkout-card--narrow-wide">
        <h3>
          <Package size={18} />
          {t("checkout.reportTitle")}
        </h3>

        <div className="instruction-box">
          <strong className="instruction-box__header">
            <AlertTriangle size={15} />
            {t("checkout.instHeader")}
          </strong>
          <ul className="instruction-box__list">
            <li>{t("checkout.instLi1")}</li>
            <li>{t("checkout.instLi2")}</li>
            <li>{t("checkout.instLi3")}</li>
          </ul>
        </div>

        <div className="upload-grid">
          <UploadZone
            icon={Camera}
            label={t("checkout.uploadImg")}
            accept="image/*"
            file={imageFile}
            onChange={onImageChange}
          />
          <UploadZone
            icon={Video}
            label={t("checkout.uploadVid")}
            accept="video/*"
            file={videoFile}
            onChange={onVideoChange}
          />
        </div>

        <QuestionCard
          question={t("checkout.q1")}
          yesLabel={t("checkout.q1Yes")}
          noLabel={t("checkout.q1No")}
          value={answers.q1}
          dangerOption="no"
          onSelect={(value) => onAnswerChange("q1", value)}
        />
        <QuestionCard
          question={t("checkout.q2")}
          yesLabel={t("checkout.q2Yes")}
          noLabel={t("checkout.q2No")}
          value={answers.q2}
          dangerOption="yes"
          onSelect={(value) => onAnswerChange("q2", value)}
          reverseOrder
        />

        {errorMessage && <p className="report-error">{errorMessage}</p>}

        <button className="checkout-btn checkout-btn--success" style={{ marginTop: 6 }} onClick={onSubmit}>
          <Send size={15} />
          {t("checkout.submitReport")}
        </button>
      </div>
    </div>
  );
}

function UploadZone({ icon: Icon, label, accept, file, onChange }) {
  return (
    <label className="upload-zone">
      <Icon size={28} className="upload-zone__icon" />
      <span className="upload-zone__label">{label}</span>
      <input type="file" accept={accept} onChange={(e) => onChange(e.target.files[0] || null)} />
      {file && (
        <span className="upload-zone__filename">
          {file.name} ({(file.size / (1024 * 1024)).toFixed(1)} MB)
        </span>
      )}
    </label>
  );
}

function QuestionCard({ question, yesLabel, noLabel, value, dangerOption, onSelect, reverseOrder }) {
  const options = reverseOrder
    ? [
        { key: "no", label: noLabel },
        { key: "yes", label: yesLabel },
      ]
    : [
        { key: "yes", label: yesLabel },
        { key: "no", label: noLabel },
      ];

  return (
    <div className="question-card">
      <strong className="question-card__text">{question}</strong>
      <div className="question-card__options">
        {options.map((option) => (
          <button
            key={option.key}
            className={`question-card__option ${value === option.key ? "is-selected" : ""} ${
              value === option.key && option.key === dangerOption ? "is-danger" : ""
            }`}
            onClick={() => onSelect(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
