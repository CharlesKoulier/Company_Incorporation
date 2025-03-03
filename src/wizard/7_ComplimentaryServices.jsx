import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Info,
  HelpCircle,
  Briefcase,
  Calculator,
  CreditCard,
  Database,
  AlertTriangle,
} from "lucide-react";
import { useCompany } from "../CompanyContext";
import { Alert, AlertDescription } from "../components/ui/alert";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Progress } from "../components/ui/progress";
import { calculateCompanyScore, classifyClient } from "../utils/scoringSystem";

const ComplimentaryServices = () => {
  const { state, updateStep, setCurrentStep } = useCompany();
  const { t } = useTranslation();

  // Calculate current progress
  const currentProgress = 57; // Step 8 out of 14 steps, approximately 57%

  // State to indicate if data has been pre-filled
  const [isPrefilled, setIsPrefilled] = useState(false);

  // Initialize form with default data or from context
  const [localFormData, setLocalFormData] = useState({
    complementaryServices: {
      bankAccount: "",
      accounting: "",
    },
    hasExistingServices: {
      bankAccount: false,
      accounting: false,
      insurance: false,
    },
  });

  // State for existing services
  const [alreadyHasService, setAlreadyHasService] = useState({
    bankAccount: false,
    accounting: false,
    insurance: false,
  });

  // Get client score to personalize recommendations
  const [clientProfile, setClientProfile] = useState({
    tier: "standard",
    label: t("STANDARD_CLIENT", "Client Standard"),
  });

  // Calculate client score
  useEffect(() => {
    const companyScore = calculateCompanyScore(state);
    const profile = classifyClient(companyScore);
    setClientProfile(profile);
  }, [state]);

  // Synchronize with context when it changes
  useEffect(() => {
    if (state.step8 && Object.keys(state.step8).length > 0) {
      // Existing data from step8 to load
      if (state.step8.complementaryServices) {
        setLocalFormData({
          complementaryServices: {
            bankAccount: state.step8.complementaryServices.bankAccount || "",
            accounting: state.step8.complementaryServices.accounting || "",
          },
          hasExistingServices: state.step8.hasExistingServices || {
            bankAccount: false,
            accounting: false,
            insurance: false,
          },
        });

        if (state.step8.hasExistingServices) {
          setAlreadyHasService(state.step8.hasExistingServices);
        }

        // If data already exists in context, mark as pre-filled
        const hasData =
          state.step8.complementaryServices.bankAccount ||
          state.step8.complementaryServices.accounting;
        if (hasData && !isPrefilled) {
          setIsPrefilled(true);
        }
      }
    }
  }, [state.step8, isPrefilled]);

  const handleInputChange = (name, value) => {
    setLocalFormData((prev) => ({
      ...prev,
      complementaryServices: {
        ...prev.complementaryServices,
        [name]: value,
      },
    }));
  };

  const handleExistingServiceChange = (name, value) => {
    setAlreadyHasService((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If service is marked as already existing, reset selection
    if (value) {
      setLocalFormData((prev) => ({
        ...prev,
        complementaryServices: {
          ...prev.complementaryServices,
          [name]: "",
        },
        hasExistingServices: {
          ...prev.hasExistingServices,
          [name]: true,
        },
      }));
    } else {
      setLocalFormData((prev) => ({
        ...prev,
        hasExistingServices: {
          ...prev.hasExistingServices,
          [name]: false,
        },
      }));
    }
  };

  /**
   * Move to next step
   */
  const handleNext = () => {
    updateStep(8, {
      ...localFormData,
      hasExistingServices: alreadyHasService,
    });
    setCurrentStep(9);
  };

  /**
   * Go back to previous step
   */
  const handlePrevious = () => {
    updateStep(8, {
      ...localFormData,
      hasExistingServices: alreadyHasService,
    });
    setCurrentStep(7);
  };

  const complementaryServices = localFormData.complementaryServices;

  // Banking service adapted to client profile
  const getBankRecommendation = () => {
    const { tier } = clientProfile;

    if (tier === "premium") {
      return "qonto";
    }
    return "shine";
  };

  // Accounting service adapted to client profile
  const getAccountingRecommendation = () => {
    const { tier } = clientProfile;
    const turnover = parseFloat(state.step6?.turnoverEstimate || 0);

    if (tier === "premium" || turnover > 100000) {
      return "cacomptepourmoi";
    } else if (tier === "standard" || turnover > 50000) {
      return "captaincompta";
    }
    return "placedesexperts";
  };

  // Insurance service adapted to profile
  const getNeedsInsurance = () => {
    const activity = state.step2?.activity || "";
    const companyType = state.step2?.type || "";

    // Activities with risk requiring insurance
    const highRiskActivities = [
      "bâtiment",
      "construction",
      "travaux",
      "santé",
      "médical",
      "conseil",
      "juridique",
      "avocat",
      "expert",
    ];

    // Check if activity has high risk
    const isHighRisk = highRiskActivities.some((keyword) =>
      activity.toLowerCase().includes(keyword)
    );

    // Company types that generally benefit from professional liability insurance
    const needsInsuranceTypes = ["SAS", "SASU", "SA"];

    return isHighRisk || needsInsuranceTypes.includes(companyType);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("COMPANY_CREATION", "Création de société")}</span>
          <AlertCircle className="h-5 w-5 text-blue-500" />
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
                "Ce formulaire a été pré-rempli d'après vos réponses à l'étape de préqualification. Vous pouvez modifier ces informations si nécessaire."
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Client profile information */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <Briefcase className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
            <div>
              <h4 className="font-medium text-blue-800">
                {t("CLIENT_PROFILE", "Profil client")}: {clientProfile.label}
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                {t(
                  "SERVICES_RECOMMENDATION",
                  "Des services adaptés à votre profil et votre activité vous sont proposés ci-dessous."
                )}
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-8">
          {/* Banking Services */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">
                {t(
                  "BUSINESS_BANK_ACCOUNT",
                  "Ouverture de compte professionnel"
                )}
              </h3>

              {/* Option to indicate existing service */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="has-bank-account"
                  checked={alreadyHasService.bankAccount}
                  onChange={(e) =>
                    handleExistingServiceChange("bankAccount", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="has-bank-account"
                  className="ml-2 text-sm text-gray-600"
                >
                  {t("ALREADY_HAVE_SERVICE", "J'ai déjà un compte")}
                </label>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {t(
                "BANK_ACCOUNT_EXPLANATION",
                "Un compte dédié facilite la gestion de votre trésorerie. Nous vous proposons des offres avantageuses avec nos partenaires."
              )}
            </p>

            {!alreadyHasService.bankAccount && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Shine Offer */}
                <label
                  className={`relative border rounded-lg p-4 hover:bg-gray-50 cursor-pointer ${
                    getBankRecommendation() === "shine"
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="complementaryServices.bankAccount"
                    value="shine"
                    checked={complementaryServices.bankAccount === "shine"}
                    className="sr-only"
                    onChange={() => handleInputChange("bankAccount", "shine")}
                  />
                  <div
                    className={`absolute top-3 right-3 text-green-500 ${
                      complementaryServices.bankAccount === "shine"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" strokeWidth={2} />
                  </div>
                  {getBankRecommendation() === "shine" && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {t("RECOMMENDED", "Recommandé")}
                    </div>
                  )}
                  <div className="font-medium">Shine</div>
                  <p className="text-sm text-gray-600 mt-2">
                    {t(
                      "SHINE_DESC",
                      "La néobanque idéale pour les indépendants et TPE. Compte pro 100% en ligne."
                    )}
                  </p>
                  <ul className="text-sm text-gray-600 mt-3 space-y-1">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "SHINE_ADVANTAGE_1",
                          "Ouverture de compte rapide et sans frais"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "SHINE_ADVANTAGE_2",
                          "Dépôt du capital social en quelques clics"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "SHINE_ADVANTAGE_3",
                          "Outils de facturation et comptabilité inclus"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span>
                        {t("SHINE_INFO_NO_PHYSICAL", "Pas d'agence physique")}
                      </span>
                    </li>
                  </ul>
                </label>

                {/* Qonto Offer */}
                <label
                  className={`relative border rounded-lg p-4 hover:bg-gray-50 cursor-pointer ${
                    getBankRecommendation() === "qonto"
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="complementaryServices.bankAccount"
                    value="qonto"
                    checked={complementaryServices.bankAccount === "qonto"}
                    className="sr-only"
                    onChange={() => handleInputChange("bankAccount", "qonto")}
                  />
                  <div
                    className={`absolute top-3 right-3 text-green-500 ${
                      complementaryServices.bankAccount === "qonto"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" strokeWidth={2} />
                  </div>
                  {getBankRecommendation() === "qonto" && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {t("RECOMMENDED", "Recommandé")}
                    </div>
                  )}
                  <div className="font-medium">Qonto</div>
                  <p className="text-sm text-gray-600 mt-2">
                    {t(
                      "QONTO_DESC",
                      "La solution tout-en-un pour gérer les finances de votre entreprise."
                    )}
                  </p>
                  <ul className="text-sm text-gray-600 mt-3 space-y-1">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "QONTO_ADVANTAGE_1",
                          "Compte avec IBAN français ou allemand"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "QONTO_ADVANTAGE_2",
                          "Cartes virtuelles et physiques sécurisées"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "QONTO_ADVANTAGE_3",
                          "Gestion multi-utilisateurs et droits d'accès"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span>
                        {t(
                          "QONTO_INFO_PRICING",
                          "Tarifs adaptés à la croissance de l'entreprise"
                        )}
                      </span>
                    </li>
                  </ul>
                </label>

                {/* No bank account */}
                <label className="relative border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="complementaryServices.bankAccount"
                    value=""
                    checked={!complementaryServices.bankAccount}
                    className="sr-only"
                    onChange={() => handleInputChange("bankAccount", "")}
                  />
                  <div
                    className={`absolute top-3 right-3 text-green-500 ${
                      !complementaryServices.bankAccount ? "" : "hidden"
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div className="font-medium">
                    {t("NO_BANK_ACCOUNT_NOW", "Pas de compte pour le moment")}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {t(
                      "NO_BANK_ACCOUNT_DESC",
                      "Vous pourrez toujours ouvrir un compte professionnel plus tard."
                    )}
                  </p>
                </label>
              </div>
            )}

            {alreadyHasService.bankAccount && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  {t(
                    "ALREADY_HAVE_BANK_ACCOUNT",
                    "Vous avez indiqué posséder déjà un compte bancaire professionnel. Si vous souhaitez néanmoins voir nos offres, décochez la case ci-dessus."
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Accounting Services */}
          <div className="pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">
                {t("ACCOUNTING_SUPPORT", "Accompagnement comptable")}
              </h3>

              {/* Option to indicate existing service */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="has-accounting"
                  checked={alreadyHasService.accounting}
                  onChange={(e) =>
                    handleExistingServiceChange("accounting", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="has-accounting"
                  className="ml-2 text-sm text-gray-600"
                >
                  {t(
                    "ALREADY_HAVE_ACCOUNTING",
                    "J'ai déjà un expert-comptable"
                  )}
                </label>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {t(
                "ACCOUNTING_SUPPORT_DESC",
                "Choisissez l'expertise d'un spécialiste pour vous concentrer sur votre cœur de métier."
              )}
            </p>

            {!alreadyHasService.accounting && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Place des Experts Offer */}
                <label
                  className={`relative border rounded-lg p-4 hover:bg-gray-50 cursor-pointer ${
                    getAccountingRecommendation() === "placedesexperts"
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="complementaryServices.accounting"
                    value="placedesexperts"
                    checked={
                      complementaryServices.accounting === "placedesexperts"
                    }
                    className="sr-only"
                    onChange={() =>
                      handleInputChange("accounting", "placedesexperts")
                    }
                  />
                  <div
                    className={`absolute top-3 right-3 text-green-500 ${
                      complementaryServices.accounting === "placedesexperts"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" strokeWidth={2} />
                  </div>
                  {getAccountingRecommendation() === "placedesexperts" && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {t("RECOMMENDED", "Recommandé")}
                    </div>
                  )}
                  <div className="font-medium">
                    {t("PLACE_DES_EXPERTS", "Place des Experts")}
                  </div>
                  <ul className="text-sm text-gray-600 mt-3 space-y-1">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "PLACE_EXPERT_ADV_1",
                          "Tenue de comptabilité en ligne"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "PLACE_EXPERT_ADV_2",
                          "Déclarations sociales et fiscales"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "PLACE_EXPERT_ADV_3",
                          "Tableaux de bord et pilotage"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span>
                        {t(
                          "PLACE_EXPERT_INFO",
                          "Peu adapté aux activités complexes"
                        )}
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    {t("FROM_89_EUROS_MONTH", "À partir de 89€ HT/mois")}
                  </p>
                </label>

                {/* CaptainCompta Offer */}
                <label
                  className={`relative border rounded-lg p-4 hover:bg-gray-50 cursor-pointer ${
                    getAccountingRecommendation() === "captaincompta"
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="complementaryServices.accounting"
                    value="captaincompta"
                    checked={
                      complementaryServices.accounting === "captaincompta"
                    }
                    className="sr-only"
                    onChange={() =>
                      handleInputChange("accounting", "captaincompta")
                    }
                  />
                  <div
                    className={`absolute top-3 right-3 text-green-500 ${
                      complementaryServices.accounting === "captaincompta"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" strokeWidth={2} />
                  </div>
                  {getAccountingRecommendation() === "captaincompta" && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {t("RECOMMENDED", "Recommandé")}
                    </div>
                  )}
                  <div className="font-medium">CaptainCompta</div>
                  <ul className="text-sm text-gray-600 mt-3 space-y-1">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "CAPTAIN_COMPTA_ADV_1",
                          "Gestion comptable complète"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "CAPTAIN_COMPTA_ADV_2",
                          "Conseils fiscaux et optimisation"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "CAPTAIN_COMPTA_ADV_3",
                          "Assistance aux contrôles fiscaux"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span>
                        {t(
                          "CAPTAIN_COMPTA_INFO",
                          "Tarif adapté aux petites structures"
                        )}
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    {t("FROM_149_EUROS_MONTH", "À partir de 149€ HT/mois")}
                  </p>
                </label>

                {/* Ca Compte Pour Moi Offer */}
                <label
                  className={`relative border rounded-lg p-4 hover:bg-gray-50 cursor-pointer ${
                    getAccountingRecommendation() === "cacomptepourmoi"
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="complementaryServices.accounting"
                    value="cacomptepourmoi"
                    checked={
                      complementaryServices.accounting === "cacomptepourmoi"
                    }
                    className="sr-only"
                    onChange={() =>
                      handleInputChange("accounting", "cacomptepourmoi")
                    }
                  />
                  <div
                    className={`absolute top-3 right-3 text-green-500 ${
                      complementaryServices.accounting === "cacomptepourmoi"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" strokeWidth={2} />
                  </div>
                  {getAccountingRecommendation() === "cacomptepourmoi" && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {t("RECOMMENDED", "Recommandé")}
                    </div>
                  )}
                  <div className="font-medium">Ça Compte Pour Moi</div>
                  <ul className="text-sm text-gray-600 mt-3 space-y-1">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "CACOMPTE_ADV_1",
                          "Conseils illimités par un expert dédié"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "CACOMPTE_ADV_2",
                          "Comptabilité et fiscalité intégralement gérées"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>
                        {t(
                          "CACOMPTE_ADV_3",
                          "Prévisionnel d'activité et plan de développement"
                        )}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span>
                        {t(
                          "CACOMPTE_INFO_PREMIUM",
                          "Solution premium avec coût plus élevé"
                        )}
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    {t("FROM_249_EUROS_MONTH", "À partir de 249€ HT/mois")}
                  </p>
                </label>

                {/* No accounting support */}
                <label className="relative border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="complementaryServices.accounting"
                    value=""
                    checked={!complementaryServices.accounting}
                    className="sr-only"
                    onChange={() => handleInputChange("accounting", "")}
                  />
                  <div
                    className={`absolute top-3 right-3 text-green-500 ${
                      !complementaryServices.accounting ? "" : "hidden"
                    }`}
                  >
                    <CheckCircle className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div className="font-medium">
                    {t(
                      "NO_ACCOUNTING_SUPPORT",
                      "Pas d'accompagnement pour le moment"
                    )}
                  </div>
                </label>
              </div>
            )}

            {alreadyHasService.accounting && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  {t(
                    "ALREADY_HAVE_ACCOUNTING_SERVICE",
                    "Vous avez indiqué avoir déjà un expert-comptable. Si vous souhaitez néanmoins voir nos offres, décochez la case ci-dessus."
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Insurance service */}
          {getNeedsInsurance() && (
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  {t("INSURANCE_SUPPORT", "Assurance professionnelle")}
                </h3>

                {/* Option to indicate existing service */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="has-insurance"
                    checked={alreadyHasService.insurance}
                    onChange={(e) =>
                      handleExistingServiceChange("insurance", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="has-insurance"
                    className="ml-2 text-sm text-gray-600"
                  >
                    {t("ALREADY_HAVE_INSURANCE", "J'ai déjà une assurance")}
                  </label>
                </div>
              </div>

              <Alert className="mb-4 bg-amber-50 border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <AlertDescription className="text-amber-700">
                  {t(
                    "INSURANCE_RECOMMENDATION",
                    "Pour votre activité, une assurance responsabilité civile professionnelle est fortement recommandée."
                  )}
                </AlertDescription>
              </Alert>

              <p className="text-sm text-gray-600 mb-4">
                {t(
                  "INSURANCE_SUPPORT_DESC",
                  "Une assurance adaptée à votre activité vous protège contre les risques professionnels."
                )}
              </p>

              {!alreadyHasService.insurance && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <p className="text-sm text-gray-700">
                      {t(
                        "INSURANCE_CONTACT_INFO",
                        "Un conseiller spécialisé vous contactera pour vous proposer une assurance adaptée à votre activité et vos besoins spécifiques."
                      )}
                    </p>
                  </div>
                </div>
              )}

              {alreadyHasService.insurance && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {t(
                      "ALREADY_HAVE_INSURANCE_SERVICE",
                      "Vous avez indiqué avoir déjà une assurance professionnelle. Si vous souhaitez néanmoins plus d'informations, décochez la case ci-dessus."
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </form>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t("BACK", "Précédent")}
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            {t("NEXT", "Suivant")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplimentaryServices;
