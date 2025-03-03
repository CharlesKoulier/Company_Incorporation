import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, Video, Phone } from "lucide-react";
import { useCompany } from "../CompanyContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const ExpertConsultation = () => {
  const { state, updateStep, setCurrentStep } = useCompany();
  const { t } = useTranslation();

  const [formData, setFormData] = useState(
    state.step12 || {
      wantsMeeting: false,
      selectedDate: null,
      selectedTime: null,
      selectedType: null,
    }
  );

  const availableSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleWantsMeeting = (value) => {
    // posthog.capture("wants_meeting_clicked", { value });
    setFormData((prev) => ({ ...prev, wantsMeeting: value }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // posthog.capture("expert_consultation_next", { formData });
    updateStep(12, formData);
    setCurrentStep(13);
  };

  const handleBack = () => {
    // posthog.capture("expert_consultation_back");
    updateStep(12, formData);
    setCurrentStep(11);
  };

  const isMeetingDataComplete = () => {
    if (!formData.wantsMeeting) return true;
    return (
      formData.selectedType && formData.selectedDate && formData.selectedTime
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            {t("EXPERT_CONSULTATION_TITLE", "Consultation avec un expert")}
          </span>
          <AlertCircle className="h-5 w-5 text-blue-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LanguageSwitcher />

        <div className="space-y-6">
          {/* Description and benefits */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              {t("BENEFITS_TITLE", "Avantages de la consultation :")}
            </h4>
            <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
              <li>
                {t(
                  "BENEFIT_1",
                  "Vérification de vos choix juridiques et fiscaux"
                )}
              </li>
              <li>{t("BENEFIT_2", "Réponses à vos questions spécifiques")}</li>
              <li>
                {t("BENEFIT_3", "Conseils personnalisés pour votre activité")}
              </li>
              <li>
                {t("BENEFIT_4", "Consultation gratuite et sans engagement")}
              </li>
            </ul>
          </div>

          {/* Meeting choice */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleWantsMeeting(true)}
              className={`p-4 rounded-lg border-2 transition-colors
                ${
                  formData.wantsMeeting
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:border-violet-200"
                }`}
            >
              <h3 className="font-medium mb-2">
                {t("WANTS_MEETING_YES", "Je souhaite un rendez-vous")}
              </h3>
              <p className="text-sm text-gray-600">
                {t(
                  "MEETING_DESCRIPTION",
                  "Un expert vous accompagnera dans vos choix"
                )}
              </p>
            </button>

            <button
              onClick={() => handleWantsMeeting(false)}
              className={`p-4 rounded-lg border-2 transition-colors
                ${
                  formData.wantsMeeting === false
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:border-violet-200"
                }`}
            >
              <h3 className="font-medium mb-2">
                {t("WANTS_MEETING_NO", "Je continue sans rendez-vous")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("NO_MEETING_DESCRIPTION", "Je maîtrise mes choix")}
              </p>
            </button>
          </div>

          {/* Meeting details */}
          {formData.wantsMeeting && (
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-medium mb-4">
                {t("MEETING_DETAILS", "Détails du rendez-vous")}
              </h3>

              {/* Meeting type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("MEETING_TYPE", "Type de rendez-vous")}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleInputChange("selectedType", "video")}
                    className={`flex items-center p-3 rounded border transition-colors
                      ${
                        formData.selectedType === "video"
                          ? "border-violet-500 bg-violet-50"
                          : "border-gray-200 hover:border-violet-200"
                      }`}
                  >
                    <Video className="h-5 w-5 mr-2" />
                    {t("VIDEO_CALL", "Appel vidéo")}
                  </button>

                  <button
                    onClick={() => handleInputChange("selectedType", "phone")}
                    className={`flex items-center p-3 rounded border transition-colors
                      ${
                        formData.selectedType === "phone"
                          ? "border-violet-500 bg-violet-50"
                          : "border-gray-200 hover:border-violet-200"
                      }`}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    {t("PHONE_CALL", "Appel téléphonique")}
                  </button>
                </div>
              </div>

              {/* Date and time slot */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("MEETING_DATE", "Date")}
                  </label>
                  <input
                    type="date"
                    value={formData.selectedDate || ""}
                    onChange={(e) =>
                      handleInputChange("selectedDate", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("MEETING_TIME", "Horaire")}
                  </label>
                  <select
                    value={formData.selectedTime || ""}
                    onChange={(e) =>
                      handleInputChange("selectedTime", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">
                      {t("CHOOSE_TIMESLOT", "Choisir un horaire")}
                    </option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={handleBack}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            {t("BACK", "Retour")}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isMeetingDataComplete()}
            className="bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {t("CONTINUE", "Continuer")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertConsultation;
