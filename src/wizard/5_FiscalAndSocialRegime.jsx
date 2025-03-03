// src/wizard/5_FiscalAndSocialRegime.jsx

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  InfoIcon,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  BellIcon,
  Calculator,
} from "lucide-react";
import { useCompany } from "../CompanyContext";
import { getRecommendations } from "../helpers/taxAdvisor";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Progress } from "../components/ui/progress";
import activitiesData from "../data/activities.json";
import SimulateurCharges from "../components/SimulateurCharges";
import { getSeuilAlerts } from "../data/seuilsReglementaires";

const STEPS = {
  TURNOVER: "turnover",
  RECOMMENDATIONS: "recommendations",
};

const REGIMES = {
  TAX: {
    IR: "IR",
    IS: "IS",
  },
  VAT: {
    FRANCHISE: "franchise",
    REAL_SIMPLIFIED: "realSimplified",
    REAL_NORMAL: "realNormal",
  },
  VAT_PERIODICITY: {
    MONTHLY: "monthly",
    QUARTERLY: "quarterly",
  },
  SOCIAL: {
    TNS: "TNS",
    ASSIMILE: "assimile",
  },
};

const initialFormState = {
  turnoverEstimate: "",
  taxRegime: "",
  vatRegime: "",
  vatPeriodicity: REGIMES.VAT_PERIODICITY.MONTHLY,
  socialRegime: "",
  hasConfirmedChoices: false,
};

const TurnoverInput = ({ value, onChange, error }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {t("CA_ANNUEL_HT", "Estimated annual turnover excluding VAT *")}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          name="turnoverEstimate"
          value={value}
          onChange={onChange}
          className={`flex-1 p-2 border rounded-md ${
            error ? "border-red-500" : ""
          }`}
          placeholder={t("EX_TURNOVER", "Ex: 50000")}
          required
        />
        <span className="text-sm font-medium">€</span>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const RegimeSelect = ({
  label,
  name,
  value,
  options,
  onChange,
  explanation,
  isForced,
  activity,
}) => {
  const { t } = useTranslation();

  // Activity-specific advice
  const getActivitySpecificAdvice = (regime, activity) => {
    if (!activity) return null;

    const activityType = activity.classification || "";
    const activityName = activity.display || "";

    // Tax regime advice
    if (name === "taxRegime") {
      if (regime === "IR" && activityType === "Service") {
        return t(
          "IR_SERVICE_TIP",
          "For a service activity like yours, IR can be advantageous if your expenses are low."
        );
      }
      if (regime === "IS" && activityName.toLowerCase().includes("commerce")) {
        return t(
          "IS_COMMERCE_TIP",
          "For a commercial activity, IS makes it easier to build inventory and investments."
        );
      }
    }

    // VAT regime advice
    if (name === "vatRegime") {
      if (regime === "franchise" && activityType === "Service") {
        return t(
          "FRANCHISE_SERVICE_TIP",
          "The franchise scheme can be interesting for your service activities, especially with individual clients."
        );
      }
      if (regime === "realSimplified" && activityType === "Commerce") {
        return t(
          "REAL_COMMERCE_TIP",
          "For your commercial activity, the real regime allows you to recover VAT on your purchases."
        );
      }
    }

    // Social regime advice
    if (name === "socialRegime") {
      if (regime === "TNS" && activityType === "Artisanat") {
        return t(
          "TNS_ARTISAN_TIP",
          "The TNS status is particularly suitable for craftsmen with moderate social charges."
        );
      }
      if (regime === "assimile" && activityType === "Service") {
        return t(
          "ASSIMILE_SERVICE_TIP",
          "The employee-like status offers you better social protection, important for a service activity."
        );
      }
    }

    return null;
  };

  const activityAdvice = getActivitySpecificAdvice(value, activity);

  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="text-lg font-medium mb-3">{label}</h3>
      <div className="space-y-3">
        {value && (
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="font-medium">{value}</span>
          </div>
        )}
        <p className="text-gray-600 text-sm">{explanation}</p>

        {/* Display personalized advice if available */}
        {activityAdvice && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              <InfoIcon className="h-4 w-4 inline mr-1" />
              {activityAdvice}
            </p>
          </div>
        )}

        {!isForced && (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border rounded-md mt-2"
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {t(label)}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

const AlertesSeuils = ({ alerts }) => {
  const { t } = useTranslation();

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <BellIcon className="h-5 w-5 text-amber-500 mr-2" />
        {t("THRESHOLDS_ALERTS", "Regulatory threshold alerts")}
      </h3>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            className={
              alert.severity === "critical"
                ? "bg-red-50 border-red-200"
                : "bg-amber-50 border-amber-200"
            }
          >
            {alert.severity === "critical" ? (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            <AlertDescription>
              <div className="flex flex-col">
                <span
                  className={
                    alert.severity === "critical"
                      ? "font-medium text-red-700"
                      : "font-medium text-amber-700"
                  }
                >
                  {alert.message}
                </span>
                <span className="text-sm mt-1 text-gray-600">
                  {alert.description}
                </span>
                {alert.link && (
                  <a
                    href={alert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs mt-1 hover:underline"
                  >
                    {t("LEARN_MORE", "Learn more")}
                  </a>
                )}
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

const FiscalAndSocialRegime = () => {
  const { t } = useTranslation();
  const { state, updateStep, setCurrentStep } = useCompany();

  // Calculate current progress
  const currentProgress = 43; // Step 6 out of 14 steps, approximately 43%

  // State to indicate if data has been pre-filled
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [currentFormStep, setCurrentFormStep] = useState(STEPS.TURNOVER);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [activity, setActivity] = useState(null);
  const [seuilAlerts, setSeuilAlerts] = useState([]);
  const [showSimulator, setShowSimulator] = useState(false);

  // Synchronize with context data if available
  useEffect(() => {
    if (state.step6 && Object.keys(state.step6).length > 0) {
      const hasData =
        state.step6.turnoverEstimate ||
        state.step6.taxRegime ||
        state.step6.vatRegime;

      if (hasData) {
        setFormData({
          turnoverEstimate: state.step6.turnoverEstimate || "",
          taxRegime: state.step6.taxRegime || "",
          vatRegime: state.step6.vatRegime || "",
          vatPeriodicity:
            state.step6.vatPeriodicity || REGIMES.VAT_PERIODICITY.MONTHLY,
          socialRegime: state.step6.socialRegime || "",
          hasConfirmedChoices: state.step6.hasConfirmedChoices || false,
        });

        // If recommendations already exist, load them as well
        if (state.step6.recommendations) {
          setRecommendations(state.step6.recommendations);
          // And go directly to the recommendations step if we have data
          setCurrentFormStep(STEPS.RECOMMENDATIONS);

          // If we have an estimated turnover, generate threshold alerts
          if (state.step6.turnoverEstimate) {
            generateSeuilAlerts(state.step6.turnoverEstimate);
          }
        }

        if (!isPrefilled) {
          setIsPrefilled(true);
        }
      }
    }

    // Get the activity for personalized advice
    if (state.step2 && state.step2.activity) {
      const foundActivity = activitiesData.find(
        (a) => a.display === state.step2.activity
      );
      if (foundActivity) {
        setActivity(foundActivity);
      }
    }
  }, [state.step6, state.step2, isPrefilled]);

  const validateTurnover = () => {
    const turnover = Number(formData.turnoverEstimate);

    if (!formData.turnoverEstimate.trim()) {
      setError(t("TURNOVER_REQUIRED", "Estimated turnover is required"));
      return false;
    }

    if (isNaN(turnover) || turnover <= 0) {
      setError(t("TURNOVER_POSITIVE", "Turnover must be a positive number"));
      return false;
    }

    setError("");
    return true;
  };

  const generateSeuilAlerts = (turnover) => {
    // Prepare data for threshold checks
    const companyData = {
      companyType: state.step2?.type || "SAS",
      activityType:
        activity?.classification === "Commerce" ? "COMMERCE" : "SERVICE",
      taxRegime: formData.taxRegime,
      vatRegime: formData.vatRegime,
      socialRegime: formData.socialRegime,
      turnover: turnover,
      employeesCount: 0, // Adjust according to your context
      totalBilan: turnover * 0.8, // Rough estimate for example
    };

    // Generate threshold alerts
    const alerts = getSeuilAlerts(companyData);
    setSeuilAlerts(alerts);
  };

  const generateRecommendations = () => {
    try {
      const companyData = {
        companyType: state.step2?.type,
        activity: state.step2?.activity,
        partners: state.step4?.partners,
        headquarters: state.step5,
        estimatedTurnover: Number(formData.turnoverEstimate),
      };

      const recs = getRecommendations(companyData);

      if (!recs || typeof recs !== "object") {
        throw new Error("Invalid recommendations format");
      }

      setRecommendations(recs);
      updateFormWithRecommendations(recs);

      // Generate threshold alerts
      generateSeuilAlerts(formData.turnoverEstimate);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      setError(t("RECOMMENDATION_ERROR", "Error generating recommendations"));
      setRecommendations(null);
    }
  };

  const updateFormWithRecommendations = (recs) => {
    setFormData((prev) => ({
      ...prev,
      taxRegime: recs.taxRegime?.regime || prev.taxRegime,
      vatRegime: recs.vatRegime?.regime || prev.vatRegime,
      vatPeriodicity: recs.vatRegime?.periodicity || prev.vatPeriodicity,
      socialRegime: recs.socialRegime?.regime || prev.socialRegime,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleTurnoverSubmit = () => {
    if (validateTurnover()) {
      generateRecommendations();
      setCurrentFormStep(STEPS.RECOMMENDATIONS);
    }
  };

  const handleRegimeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      hasConfirmedChoices: false,
    }));

    // Update alerts if regime changes
    if (formData.turnoverEstimate) {
      generateSeuilAlerts(formData.turnoverEstimate);
    }
  };

  const handleConfirmation = () => {
    setFormData((prev) => ({
      ...prev,
      hasConfirmedChoices: true,
    }));
  };

  const handleToggleSimulator = () => {
    setShowSimulator(!showSimulator);
  };

  const handleNext = () => {
    if (!formData.hasConfirmedChoices) {
      return;
    }

    try {
      updateStep(6, {
        ...formData,
        recommendations,
        seuilAlerts, // Save threshold alerts
      });

      setCurrentStep(7);
    } catch (error) {
      console.error("Error in handleNext:", error);
    }
  };

  const handleBack = () => {
    // Save data before going back
    updateStep(6, {
      ...formData,
      recommendations,
      seuilAlerts,
    });
    setCurrentStep(5);
  };

  const renderActivitySpecificTip = () => {
    if (!activity) return null;

    const activityType = activity.classification || "";
    const activityName = activity.display || "";

    let tipContent = "";

    if (activityType === "Service") {
      tipContent = t(
        "SERVICE_FISCAL_TIP",
        "For your service activity, watch the VAT franchise threshold (34,400€). The micro-enterprise regime could be an option to consider when starting if your revenue is low."
      );
    } else if (activityType === "Commerce") {
      tipContent = t(
        "COMMERCE_FISCAL_TIP",
        "As a merchant, your VAT thresholds are higher (85,800€) and recovering VAT on your purchases can be advantageous from the beginning."
      );
    } else if (activityType === "Artisanat") {
      tipContent = t(
        "ARTISAN_FISCAL_TIP",
        "As a craftsman, consider the various tax charges related to your specific activity. Some trades benefit from particular tax advantages."
      );
    }

    if (!tipContent) return null;

    return (
      <Alert className="mb-4 bg-blue-50 border-blue-200">
        <InfoIcon className="h-5 w-5 text-blue-500" />
        <AlertDescription className="text-blue-700">
          {tipContent}
        </AlertDescription>
      </Alert>
    );
  };

  const TurnoverStep = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t("ESTIMATION_ACTIVITE", "Activity Estimation")}</CardTitle>
        <div className="space-y-2">
          <Progress value={currentProgress} className="h-2" />
          <p className="text-sm text-gray-500 text-right">{currentProgress}%</p>
        </div>
      </CardHeader>
      <CardContent>
        <LanguageSwitcher />

        {isPrefilled && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-700">
              {t(
                "FORM_PREFILLED",
                "This form has been pre-filled based on your previous answers. You can modify this information if necessary."
              )}
            </AlertDescription>
          </Alert>
        )}

        {renderActivitySpecificTip()}

        <div className="space-y-4 mt-4">
          <p className="text-gray-600">
            {t(
              "FISCAL_NEED_TURNOVER",
              "To recommend the most suitable regimes, please indicate your estimated turnover."
            )}
          </p>

          <TurnoverInput
            value={formData.turnoverEstimate}
            onChange={handleInputChange}
            error={error}
          />

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {t("BACK", "Previous")}
            </button>
            <button
              type="button"
              onClick={handleTurnoverSubmit}
              className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            >
              {t("VALIDATE", "Validate")}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RecommendationsStep = () => {
    if (!recommendations) return null;

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {t(
              "REGIMES_RECOMMANDES",
              "Recommended Tax and Social Security Regimes"
            )}
          </CardTitle>
          <div className="space-y-2">
            <Progress value={currentProgress} className="h-2" />
            <p className="text-sm text-gray-500 text-right">
              {currentProgress}%
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <LanguageSwitcher />

          {isPrefilled && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
                {t(
                  "FORM_PREFILLED",
                  "This form has been pre-filled based on your previous answers. You can modify this information if necessary."
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-6 mt-4">
            {recommendations.summary && (
              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-5 w-5 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  {recommendations.summary.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Regulatory threshold alerts */}
            <AlertesSeuils alerts={seuilAlerts} />

            {/* Button to show/hide the simulator */}
            <button
              onClick={handleToggleSimulator}
              className="w-full py-2 px-4 bg-violet-100 text-violet-700 rounded-md hover:bg-violet-200 flex items-center justify-center"
            >
              <Calculator className="h-5 w-5 mr-2" />
              {showSimulator
                ? t("HIDE_SIMULATOR", "Hide charges simulator")
                : t("SHOW_SIMULATOR", "Show charges simulator")}
            </button>

            {/* Charges simulator */}
            {showSimulator && <SimulateurCharges />}

            {/* Activity-specific tips */}
            {renderActivitySpecificTip()}

            <RegimeSelect
              label={t("FISCAL_REGIME", "Tax regime")}
              name="taxRegime"
              value={formData.taxRegime}
              options={[
                { value: REGIMES.TAX.IR, label: "IR_LABEL" },
                { value: REGIMES.TAX.IS, label: "IS_LABEL" },
              ]}
              onChange={handleRegimeChange}
              explanation={recommendations.taxRegime?.explanation}
              isForced={recommendations.taxRegime?.isForced}
              activity={activity}
            />

            <RegimeSelect
              label={t("TVA_REGIME", "VAT regime")}
              name="vatRegime"
              value={formData.vatRegime}
              options={[
                { value: REGIMES.VAT.FRANCHISE, label: "FRANCHISE_BASE_TVA" },
                {
                  value: REGIMES.VAT.REAL_SIMPLIFIED,
                  label: "REAL_SIMPLIFIED",
                },
                { value: REGIMES.VAT.REAL_NORMAL, label: "REAL_NORMAL" },
              ]}
              onChange={handleRegimeChange}
              explanation={recommendations.vatRegime?.explanation}
              isForced={recommendations.vatRegime?.isForced}
              activity={activity}
            />

            {formData.vatRegime !== REGIMES.VAT.FRANCHISE && (
              <RegimeSelect
                label={t("TVA_PERIODICITY", "VAT periodicity")}
                name="vatPeriodicity"
                value={formData.vatPeriodicity}
                options={[
                  {
                    value: REGIMES.VAT_PERIODICITY.MONTHLY,
                    label: "DECLARATION_MENSUELLES",
                  },
                  {
                    value: REGIMES.VAT_PERIODICITY.QUARTERLY,
                    label: "DECLARATION_TRIMESTRIELLES",
                  },
                ]}
                onChange={handleRegimeChange}
                isForced={false}
              />
            )}

            <RegimeSelect
              label={t("SOCIAL_REGIME", "Social security regime")}
              name="socialRegime"
              value={formData.socialRegime}
              options={[
                { value: REGIMES.SOCIAL.TNS, label: "TNS_LABEL" },
                { value: REGIMES.SOCIAL.ASSIMILE, label: "ASSIMILE_LABEL" },
              ]}
              onChange={handleRegimeChange}
              explanation={recommendations.socialRegime?.explanation}
              isForced={recommendations.socialRegime?.isForced}
              activity={activity}
            />

            {!formData.hasConfirmedChoices && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">
                  {t("CONFIRM_CHOICES", "Confirmation of choices")}
                </h4>
                <p className="text-sm text-yellow-700 mb-4">
                  {t(
                    "PLEASE_CONFIRM_RECOMMENDATIONS",
                    "Please confirm that you have reviewed the recommended regimes."
                  )}
                </p>
                <button
                  type="button"
                  onClick={handleConfirmation}
                  className="w-full p-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
                >
                  {t(
                    "I_CONFIRM_RECOMMENDATIONS",
                    "I confirm that I have reviewed the recommendations"
                  )}
                </button>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setCurrentFormStep(STEPS.TURNOVER)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                {t("BACK", "Back")}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.hasConfirmedChoices}
                className={`px-4 py-2 rounded ${
                  formData.hasConfirmedChoices
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t("CONTINUE", "Continue")}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return currentFormStep === STEPS.TURNOVER ? (
    <TurnoverStep />
  ) : (
    <RecommendationsStep />
  );
};

export default FiscalAndSocialRegime;
