import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import CheckoutTimeline from "../components/checkout/CheckoutTimeline";
import StepValidation from "../components/checkout/StepValidation";
import StepAddress from "../components/checkout/StepAddress";
import StepPayment from "../components/checkout/StepPayment";
import StepReport from "../components/checkout/StepReport";
import StepWarranty from "../components/checkout/StepWarranty";

const INITIAL_CUSTOM_FORM = { fullName: "", phone: "", governorate: "Tunis", address: "" };

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState("addr_1");
  const [customForm, setCustomForm] = useState(INITIAL_CUSTOM_FORM);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardContact, setCardContact] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [answers, setAnswers] = useState({ q1: null, q2: null });
  const [reportError, setReportError] = useState("");

  function handleCustomFormChange(field, value) {
    setCustomForm((current) => ({ ...current, [field]: value }));
  }

  function handleConfirmAddress() {
    if (selectedAddressId === "custom" && (!customForm.fullName || !customForm.phone || !customForm.address)) {
      return; // The form's required visual state guides the user; silently block advancing.
    }
    setStep(3);
  }

  function handleSubmitReport() {
    if (!imageFile || !videoFile) {
      setReportError(t("checkout.missingMedia"));
      return;
    }
    if (answers.q1 === null || answers.q2 === null) {
      setReportError(t("checkout.missingAnswers"));
      return;
    }
    setReportError("");
    setStep(5);
  }

  function handleReturnHome() {
    clearCart();
    setStep(1);
    setSelectedAddressId("addr_1");
    setCustomForm(INITIAL_CUSTOM_FORM);
    setPaymentMethod("cod");
    setImageFile(null);
    setVideoFile(null);
    setAnswers({ q1: null, q2: null });
    navigate("/");
  }

  return (
    <section className="fade-in">
      <CheckoutTimeline currentStep={step} />

      {step === 1 && <StepValidation onNext={() => setStep(2)} />}

      {step === 2 && (
        <StepAddress
          selectedAddressId={selectedAddressId}
          onSelectAddress={setSelectedAddressId}
          customForm={customForm}
          onCustomFormChange={handleCustomFormChange}
          onBack={() => setStep(1)}
          onNext={handleConfirmAddress}
        />
      )}

      {step === 3 && (
        <StepPayment
          paymentMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
          cardContact={cardContact}
          onCardContactChange={setCardContact}
          onBack={() => setStep(2)}
          onConfirm={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <StepReport
          imageFile={imageFile}
          videoFile={videoFile}
          onImageChange={setImageFile}
          onVideoChange={setVideoFile}
          answers={answers}
          onAnswerChange={(key, value) => setAnswers((current) => ({ ...current, [key]: value }))}
          errorMessage={reportError}
          onSubmit={handleSubmitReport}
        />
      )}

      {step === 5 && <StepWarranty videoFile={videoFile} onReturnHome={handleReturnHome} />}
    </section>
  );
}
