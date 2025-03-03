import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle, Calendar, Check, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useCompany } from "../CompanyContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Progress } from "../components/ui/progress";

function ClosingDateAndInitialExercise() {
  const { state, setCurrentStep, updateStep } = useCompany();
  const { t } = useTranslation();

  // Calculate current progress
  const currentProgress = 50; // Step 7 out of 14 steps, approximately 50%

  // State to indicate if data has been pre-filled
  const [isPrefilled, setIsPrefilled] = useState(false);

  const [formData, setFormData] = useState({
    closingMonth: "12",
    closingDay: "31",
    startDate: "",
    exerciseType: "standard", // New option: "standard" (short) or "long"
  });

  const [showStartDateConfirmation, setShowStartDateConfirmation] =
    useState(false);

  // Load initial data
  useEffect(() => {
    // Load data from step 7 if it exists
    if (state.step7 && Object.keys(state.step7).length > 0) {
      const hasData = state.step7.closingMonth || state.step7.startDate;

      if (hasData) {
        setFormData((prev) => ({
          ...prev,
          ...state.step7,
          // If exerciseType doesn't exist yet, determine it based on date
          exerciseType:
            state.step7.exerciseType ||
            (shouldRecommendLongPeriod(state.step7.startDate)
              ? "long"
              : "standard"),
        }));

        if (!isPrefilled) {
          setIsPrefilled(true);
        }
      }
    }

    // If a date exists in step3, propose it
    if (state.step3?.startDate) {
      setFormData((prev) => ({
        ...prev,
        startDate: state.step3.startDate,
        // Determine if long exercise is recommended
        exerciseType: shouldRecommendLongPeriod(state.step3.startDate)
          ? "long"
          : "standard",
      }));
      setShowStartDateConfirmation(true);
    }
  }, [state.step7, state.step3, isPrefilled]);

  // Determine if a long exercise is recommended based on start date
  const shouldRecommendLongPeriod = (startDate) => {
    if (!startDate) return false;

    const startDateObj = new Date(startDate);
    const currentMonth = startDateObj.getMonth();

    // If starting in the last quarter, recommend a long exercise
    return currentMonth >= 9; // October, November, December
  };

  // Handle field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If start date changes, update step3
    if (name === "startDate" && value !== state.step3?.startDate) {
      updateStep(3, { ...state.step3, startDate: value });

      // Update exercise recommendation
      setFormData((prev) => ({
        ...prev,
        startDate: value,
        exerciseType: shouldRecommendLongPeriod(value) ? "long" : "standard",
      }));
    }

    // If exercise type changes, adjust closing year
    if (name === "exerciseType") {
      adjustClosingYear(value);
    }
  };

  // Adjust closing year based on exercise type
  const adjustClosingYear = (exerciseType) => {
    const startDateObj = new Date(formData.startDate);
    if (isNaN(startDateObj.getTime())) return;

    const closingMonth = parseInt(formData.closingMonth) - 1; // 0-indexed
    const closingDay = parseInt(formData.closingDay);

    // Calculate closing date
    let closingYear = startDateObj.getFullYear();

    if (
      exerciseType === "long" ||
      startDateObj.getMonth() > closingMonth ||
      (startDateObj.getMonth() === closingMonth &&
        startDateObj.getDate() > closingDay)
    ) {
      closingYear += 1;
    }

    // The closing date would be closingDay/closingMonth/closingYear
    // But since we don't store the year directly, we just adjust
    // the exerciseType flag
  };

  // Calculate duration of first period
  const calculateFirstPeriod = () => {
    if (!formData.startDate) return null;

    const start = new Date(formData.startDate);

    // Determine closing year based on exercise type
    let closingYear = start.getFullYear();
    if (
      formData.exerciseType === "long" ||
      start.getMonth() + 1 > parseInt(formData.closingMonth) ||
      (start.getMonth() + 1 === parseInt(formData.closingMonth) &&
        start.getDate() > parseInt(formData.closingDay))
    ) {
      closingYear += 1;
    }

    const closingDate = new Date(
      closingYear,
      parseInt(formData.closingMonth) - 1,
      formData.closingDay === "31" ? 31 : 30
    );

    // Calculate difference in months
    const months =
      (closingDate.getFullYear() - start.getFullYear()) * 12 +
      closingDate.getMonth() -
      start.getMonth();

    return months;
  };

  const handleNext = () => {
    // Save exercise type in data
    updateStep(7, { ...formData });
    setCurrentStep(8);
  };

  const handleBack = () => {
    updateStep(7, formData);
    setCurrentStep(6);
  };

  const firstPeriodDuration = calculateFirstPeriod();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle step={7} totalSteps={14}>
          {t("CLOSING_DATE_TITLE", "Date de clôture et premier exercice")}
        </CardTitle>
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
                "Ce formulaire a été pré-rempli d'après vos réponses précédentes. Vous pouvez modifier ces informations si nécessaire."
              )}
            </AlertDescription>
          </Alert>
        )}

        <form className="space-y-8">
          {/* Information message */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              {t("IMPORTANT_POINTS", "Points importants :")}
            </h4>
            <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
              <li>
                {t(
                  "CLOSING_DATE_IMPACT",
                  "La date de clôture détermine la fin de votre exercice comptable"
                )}
              </li>
              <li>
                {t(
                  "CLOSING_DATE_FISCAL_OBLIG",
                  "Elle impacte le calendrier de vos obligations fiscales"
                )}
              </li>
              <li>
                {t(
                  "CLOSING_DATE_SUGGESTION",
                  "Le choix du 31 décembre simplifie la gestion administrative"
                )}
              </li>
              <li>
                {t(
                  "CLOSING_DATE_DECALEE",
                  "Une clôture décalée peut être pertinente pour certaines activités"
                )}
              </li>
            </ul>
          </div>

          {/* First accounting period: short or long */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">
              {t("FIRST_EXERCISE_TYPE", "Type de premier exercice")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Standard exercise option */}
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.exerciseType === "standard"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() =>
                  handleInputChange({
                    target: { name: "exerciseType", value: "standard" },
                  })
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {t("STANDARD_EXERCISE", "Exercice standard")}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {t("LESS_THAN_12_MONTHS", "Moins de 12 mois")}
                    </p>
                  </div>
                  {formData.exerciseType === "standard" && (
                    <Check className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div className="mt-3 text-sm">
                  <p className="font-medium text-blue-700">
                    {t("ADVANTAGES", "Avantages")}
                  </p>
                  <ul className="list-disc pl-4 text-blue-600 mt-1">
                    <li>
                      {t("QUICK_FIRST_BALANCE_SHEET", "Premier bilan rapide")}
                    </li>
                    <li>
                      {t(
                        "STANDARD_ADMINISTRATIVE_CYCLE",
                        "Cycle administratif standard"
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Long exercise option */}
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.exerciseType === "long"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() =>
                  handleInputChange({
                    target: { name: "exerciseType", value: "long" },
                  })
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {t("LONG_EXERCISE", "Exercice long")}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {t("MORE_THAN_12_MONTHS", "Plus de 12 mois")}
                    </p>
                  </div>
                  {formData.exerciseType === "long" && (
                    <Check className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div className="mt-3 text-sm">
                  <p className="font-medium text-green-700">
                    {t("ADVANTAGES", "Avantages")}
                  </p>
                  <ul className="list-disc pl-4 text-green-600 mt-1">
                    <li>
                      {t(
                        "FISCAL_ADVANTAGE",
                        "Avantage fiscal (report d'imposition)"
                      )}
                    </li>
                    <li>
                      {t(
                        "BETTER_TREND_VIEW",
                        "Meilleure visibilité des tendances"
                      )}
                    </li>
                    <li>
                      {t(
                        "MORE_TIME_FOR_ACCOUNTING",
                        "Plus de temps pour la mise en place comptable"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {shouldRecommendLongPeriod(formData.startDate) &&
              formData.exerciseType === "standard" && (
                <Alert className="mt-2 bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <AlertDescription className="text-amber-700">
                    {t(
                      "LONG_EXERCISE_RECOMMENDATION",
                      "Compte tenu de votre date de début d'activité, un exercice long pourrait être plus avantageux fiscalement."
                    )}
                  </AlertDescription>
                </Alert>
              )}
          </div>

          {/* Choose closing date */}
          <div>
            <h3 className="text-lg font-medium mb-6">
              {t("CHOOSE_CLOSING_DATE", "Choix de la date de clôture")}
            </h3>

            {/* Recommended option */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {t("RECOMMENDED_DATE_LABEL", "Date recommandée")}
              </label>
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.closingMonth === "12" && formData.closingDay === "31"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    closingMonth: "12",
                    closingDay: "31",
                  }))
                }
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-grow">
                    <p className="font-medium">
                      {t("DECEMBER_31", "31 décembre")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t("ALIGNED_FISCAL_YEAR", "Aligné sur l'année civile")}
                    </p>
                  </div>
                  {formData.closingMonth === "12" &&
                    formData.closingDay === "31" && (
                      <Check className="h-5 w-5 text-blue-500" />
                    )}
                </div>
              </div>
            </div>

            {/* Other options */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("OTHER_CLOSING_DATE_LABEL", "Autre date de clôture")}
              </label>
              <select
                name="closingMonth"
                value={formData.closingMonth}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="3">{t("MARCH_31", "31 mars")}</option>
                <option value="6">{t("JUNE_30", "30 juin")}</option>
                <option value="9">{t("SEPT_30", "30 septembre")}</option>
                <option value="12">{t("DEC_31", "31 décembre")}</option>
              </select>
            </div>

            {/* Explanations based on choice */}
            <div className="mt-6">
              {formData.closingMonth === "12" ? (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-2">
                    {t("RECOMMENDED_OPTION", "✨ Option recommandée")}
                  </h4>
                  <ul className="text-sm text-green-700 list-disc pl-5 space-y-1">
                    <li>
                      {t(
                        "ALIGNED_ANNUAL_CALENDAR",
                        "Alignement avec l'année civile"
                      )}
                    </li>
                    <li>
                      {t(
                        "SIMPLIFIED_FISCAL_DECLARATIONS",
                        "Déclarations fiscales simplifiées"
                      )}
                    </li>
                    <li>
                      {t(
                        "SYNCHRONIZE_PARTNERS",
                        "Synchronisation avec vos partenaires"
                      )}
                    </li>
                    <li>
                      {t(
                        "CLEAR_PERFORMANCE_VIEW",
                        "Vision claire de la performance annuelle"
                      )}
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mb-2" />
                  <h4 className="text-sm font-medium text-orange-800 mb-2">
                    {t(
                      "CUSTOM_DATE_WARNING",
                      "Points d'attention pour une date décalée"
                    )}
                  </h4>
                  <ul className="text-sm text-orange-700 list-disc pl-5 space-y-1">
                    <li>
                      {t(
                        "MORE_COMPLEX_ADMIN",
                        "Gestion administrative plus complexe"
                      )}
                    </li>
                    <li>
                      {t(
                        "FISCAL_YEAR_MISMATCH",
                        "Décalage avec l'année fiscale"
                      )}
                    </li>
                    <li>
                      {t(
                        "POSSIBLE_EXTRA_COSTS",
                        "Surcoûts possibles en expertise comptable"
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* First accounting period */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-blue-500 mt-1" />
              <div className="flex-grow">
                <h4 className="text-sm font-medium mb-2">
                  {t("FIRST_ACCOUNTING_PERIOD", "Premier exercice comptable")}
                </h4>

                {showStartDateConfirmation && state.step3?.startDate && (
                  <div className="mb-4 bg-blue-50 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-700">
                          {t(
                            "START_DATE_FROM_STEP_2",
                            "Date de début définie à l'étape 2 :"
                          )}
                        </p>
                        <p className="font-medium">
                          {new Date(state.step3.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowStartDateConfirmation(false)}
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        {t("MODIFY_DATE", "Modifier")}
                      </button>
                    </div>
                  </div>
                )}

                {(!showStartDateConfirmation || !state.step3?.startDate) && (
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">
                      {t("ACTIVITY_START_DATE", "Date de début d'activité :")}
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                )}

                {firstPeriodDuration && (
                  <div className="mt-4 text-sm text-blue-700">
                    <p>
                      {t(
                        "FIRST_PERIOD_DURATION",
                        "Durée du premier exercice : {{months}} mois",
                        { months: firstPeriodDuration }
                      )}
                    </p>
                    {firstPeriodDuration > 12 && (
                      <p className="mt-2 text-blue-700 bg-blue-100 p-2 rounded">
                        {t(
                          "LONG_PERIOD_INFO",
                          "Votre premier exercice sera long (> 12 mois), ce qui peut être avantageux fiscalement."
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t("BACK", "Retour")}
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            {t("NEXT", "Continuer")}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ClosingDateAndInitialExercise;
