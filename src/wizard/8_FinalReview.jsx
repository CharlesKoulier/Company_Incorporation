// src/wizard/8_FinalReview.jsx

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  Edit2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useCompany } from "../CompanyContext";
import { Alert, AlertDescription } from "../components/ui/alert";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";

/**
 * Section Component: Display a section with title, status (complete/incomplete), edit button
 */
const Section = ({
  title,
  status = "complete",
  children,
  stepNumber,
  onEdit,
}) => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          {title}
          {status === "complete" ? (
            <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-500 ml-2" />
          )}
        </h3>
        <button
          onClick={() => onEdit(stepNumber)}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <Edit2 className="h-4 w-4 mr-1" />
          {t("MODIFY", "Edit")}
        </button>
      </div>
      {children}
    </div>
  );
};

/**
 * InfoItem Component: Display a label + value pair, with optional warning
 */
const InfoItem = ({ label, value, warning }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-2">
      <span className="text-sm text-gray-600">{label}: </span>
      <span className="font-medium">
        {value || (
          <span className="text-red-500">
            {t("NOT_DEFINED", "Not defined")}
          </span>
        )}
      </span>
      {warning && (
        <span className="text-yellow-600 text-sm ml-2 flex items-center">
          <AlertTriangle className="h-4 w-4 inline mr-1" />
          {warning}
        </span>
      )}
    </div>
  );
};

/**
 * Main Component: FinalReview
 */
const FinalReview = () => {
  const { state, setCurrentStep } = useCompany();
  const { t } = useTranslation();

  // Calculate current progress (9 steps out of 14 = ~64%)
  const currentProgress = 64;

  /**
   * handleEdit: Navigate to a specific step for modification
   */
  const handleEdit = (step) => {
    setCurrentStep(step);
  };

  /**
   * Validate Step 2 completeness (Basic Information)
   */
  const validateStep2 = () => {
    const step2 = state.step2;
    return step2?.partners && step2?.type && step2?.activity;
  };

  /**
   * Validate Step 3 completeness (Company Identity)
   */
  const validateStep3 = () => {
    const step3 = state.step3;
    return step3?.companyName && step3?.socialPurpose && step3?.startDate;
  };

  /**
   * Validate Step 4 completeness (Capital and Partners)
   */
  const validateStep4 = () => {
    const step4 = state.step4;
    return step4?.capitalAmount && step4?.partners?.length > 0;
  };

  /**
   * Validate Step 5 completeness (Headquarters)
   */
  const validateStep5 = () => {
    const step5 = state.step5;
    return (
      step5?.headquartersType &&
      (step5?.headquartersType === "koulier" ||
        (step5?.address && step5?.postalCode && step5?.city))
    );
  };

  /**
   * Validate Step 6 completeness (Tax and Social Regimes)
   */
  const validateStep6 = () => {
    const step6 = state.step6;
    return step6?.taxRegime && step6?.vatRegime && step6?.socialRegime;
  };

  /**
   * Validate Step 7 completeness (Accounting Information)
   */
  const validateStep7 = () => {
    const step7 = state.step7;
    return step7?.closingMonth && step7?.closingDay && step7?.startDate;
  };

  /**
   * Validate Step 8 completeness (Complementary Services)
   */
  const validateStep8 = () => {
    const step8 = state.step8;
    // These services are optional, so always considered complete
    return true;
  };

  /**
   * handleNextStep: Move from step 9 to step 10
   */
  const handleNext = () => {
    setCurrentStep(10);
  };

  /**
   * handleBack: Go back to step 8
   */
  const handleBack = () => {
    setCurrentStep(8);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <CardTitle>{t("COMPANY_RECAP", "Company Summary")}</CardTitle>
          <AlertCircle className="h-5 w-5 text-blue-500" />
        </div>
        <div className="space-y-2">
          <Progress value={currentProgress} className="h-2" />
          <p className="text-sm text-gray-500 text-right">{currentProgress}%</p>
        </div>
      </CardHeader>
      <CardContent>
        <LanguageSwitcher />

        <Alert className="mb-6">
          <AlertDescription>
            {t(
              "CHECK_BEFORE_CONTINUING",
              "Carefully check all information before continuing. You can modify each section by clicking 'Edit'."
            )}
          </AlertDescription>
        </Alert>

        {/* Section 1: Basic Information (corresponding to step2) */}
        <Section
          title={t("BASIC_INFO_SECTION", "Basic Information")}
          status={validateStep2() ? "complete" : "incomplete"}
          stepNumber={2}
          onEdit={handleEdit}
        >
          <InfoItem
            label={t("COMPANY_TYPE_LABEL", "Company type")}
            value={state.step2?.type}
          />
          <InfoItem
            label={t("NUMBER_OF_ASSOCIATES_LABEL", "Number of partners")}
            value={state.step2?.partners}
          />
          <InfoItem
            label={t("MAIN_ACTIVITY_LABEL", "Main activity")}
            value={state.step2?.activity}
          />
          <InfoItem
            label={t("ACTIVITY_CATEGORY_LABEL", "Activity category")}
            value={state.step2?.category}
          />
        </Section>

        {/* Section 2: Company Identity (step3) */}
        <Section
          title={t("COMPANY_IDENTITY_SECTION", "Company Identity")}
          status={validateStep3() ? "complete" : "incomplete"}
          stepNumber={3}
          onEdit={handleEdit}
        >
          <InfoItem
            label={t("DENOMINATION_LABEL", "Company name")}
            value={state.step3?.companyName}
          />
          <InfoItem
            label={t("ACRONYM_LABEL", "Acronym")}
            value={state.step3?.acronym || t("NOT_DEFINED", "Not defined")}
          />
          <InfoItem
            label={t("SHOP_SIGN_LABEL", "Shop sign")}
            value={state.step3?.shopSign || t("NOT_DEFINED", "Not defined")}
          />
          <InfoItem
            label={t("SOCIAL_PURPOSE_LABEL", "Social purpose")}
            value={state.step3?.socialPurpose}
          />
          <InfoItem
            label={t("START_DATE_LABEL", "Start date")}
            value={state.step3?.startDate}
          />
          <InfoItem
            label={t("DURATION_LABEL", "Duration")}
            value={(state.step3?.duration || "99") + " " + t("YEARS", "years")}
          />
        </Section>

        {/* Section 3: Capital and Partners (step4) */}
        <Section
          title={t("CAPITAL_ASSOCIES_SECTION", "Capital and Partners")}
          status={validateStep4() ? "complete" : "incomplete"}
          stepNumber={4}
          onEdit={handleEdit}
        >
          <InfoItem
            label={t("SOCIAL_CAPITAL_LABEL", "Share capital")}
            value={state.step4?.capitalAmount + " €"}
          />
          <div className="mt-4">
            <h4 className="font-medium mb-2">
              {t("ASSOCIATES_LABEL", "Partners:")}
            </h4>
            {state.step4?.partners?.map((partner, index) => (
              <div key={index} className="mb-4 pl-4 border-l-2 border-gray-200">
                <InfoItem
                  label={t("FULL_NAME_LABEL", "Full name")}
                  value={`${partner.firstName} ${partner.lastName}`}
                />
                <InfoItem
                  label={t("ROLE_LABEL", "Role")}
                  value={partner.role}
                />
                <InfoItem
                  label={t("SHARES_LABEL", "Shares")}
                  value={`${partner.sharePercentage}%`}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Section 4: Headquarters (step5) */}
        <Section
          title={t("HEADQUARTERS_SECTION", "Headquarters")}
          status={validateStep5() ? "complete" : "incomplete"}
          stepNumber={5}
          onEdit={handleEdit}
        >
          {state.step5?.headquartersType === "koulier" ? (
            <div>
              <InfoItem
                label={t("DOMICILIATION_TYPE_LABEL", "Domiciliation type")}
                value={t("KOULIER_DOMICILIATION", "Koulier Domiciliation")}
              />
              <InfoItem
                label={t("ADDRESS_LABEL", "Address")}
                value="44 rue Pasquier, 75008 Paris"
              />
            </div>
          ) : (
            <div>
              <InfoItem
                label={t("DOMICILIATION_TYPE_LABEL", "Domiciliation type")}
                value={
                  state.step5?.headquartersType === "commercial"
                    ? t("LOCAL_COMMERCIAL", "Commercial premises")
                    : t("LEADER_HOME", "Director's home")
                }
              />
              <InfoItem
                label={t("ADDRESS_LABEL", "Address")}
                value={state.step5?.address}
              />
              {state.step5?.addressComplement && (
                <InfoItem
                  label={t("ADDRESS_COMPLEMENT_LABEL", "Address complement")}
                  value={state.step5?.addressComplement}
                />
              )}
              <InfoItem
                label={t("POSTAL_CODE_LABEL", "Postal code")}
                value={state.step5?.postalCode}
              />
              <InfoItem
                label={t("CITY_LABEL", "City")}
                value={state.step5?.city}
              />
            </div>
          )}
        </Section>

        {/* Section 5: Tax and Social Regimes (step6) */}
        <Section
          title={t("FISCAL_SOCIAL_SECTION", "Tax and Social Security Regimes")}
          stepNumber={6}
          onEdit={handleEdit}
          status={validateStep6() ? "complete" : "incomplete"}
        >
          <InfoItem
            label={t("FISCAL_REGIME_LABEL", "Tax regime")}
            value={
              state.step6?.taxRegime === "IR"
                ? t("IR_LABEL", "Personal Income Tax (IR)")
                : t("IS_LABEL", "Corporate Tax (IS)")
            }
          />
          <InfoItem
            label={t("TVA_REGIME_LABEL", "VAT regime")}
            value={state.step6?.vatRegime}
          />
          <InfoItem
            label={t("SOCIAL_REGIME_LABEL", "Social security regime")}
            value={
              state.step6?.socialRegime === "tns"
                ? t("TNS_LABEL", "Self-employed")
                : t("ASSIMILE_SAL_AR", "Employee status")
            }
          />
          <InfoItem
            label={t("CA_ANNUAL_ESTIMATION", "Estimated annual turnover")}
            value={`${state.step6?.turnoverEstimate} €`}
          />
        </Section>

        {/* Section 6: Accounting Information (step7) */}
        <Section
          title={t("ACCOUNTING_INFO_SECTION", "Accounting Information")}
          stepNumber={7}
          onEdit={handleEdit}
          status={validateStep7() ? "complete" : "incomplete"}
        >
          <InfoItem
            label={t("CLOSING_DATE_LABEL", "Closing date")}
            value={
              (state.step7?.closingDay || 31) +
              "/" +
              (state.step7?.closingMonth || 12)
            }
          />
          <InfoItem
            label={t("FIRST_EXERCISE_LABEL", "First financial year")}
            value={`From ${state.step7?.startDate} to ${
              state.step7?.closingDay || 31
            }/${state.step7?.closingMonth || 12}/${
              new Date().getFullYear() +
              (state.step7?.exerciseType === "long" ? 1 : 0)
            }`}
          />
          {state.step7?.exerciseType === "long" && (
            <div className="mt-2 p-2 bg-green-50 rounded-md">
              <Info className="h-4 w-4 text-green-600 inline mr-1" />
              <span className="text-sm text-green-700">
                {t(
                  "LONG_PERIOD_INFO",
                  "Your first financial year will be long (> 12 months), which can be advantageous for tax purposes."
                )}
              </span>
            </div>
          )}
        </Section>

        {/* Section 7: Complementary Services (step8) */}
        <Section
          title={t("COMPLIMENTARY_SERVICES_LABEL", "Complementary Services")}
          stepNumber={8}
          onEdit={handleEdit}
          status={validateStep8() ? "complete" : "incomplete"}
        >
          <InfoItem
            label={t("BANKING_SERVICE_LABEL", "Banking service")}
            value={
              state.step8?.complementaryServices?.bankAccount ||
              t("NOT_SELECTED", "Not selected")
            }
          />
          <InfoItem
            label={t("ACCOUNTING_SERVICE_LABEL", "Accounting service")}
            value={
              state.step8?.complementaryServices?.accounting ||
              t("NOT_SELECTED", "Not selected")
            }
          />
        </Section>

        <div className="flex justify-between mt-6">
          <Button
            onClick={handleBack}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            {t("BACK", "Previous")}
          </Button>
          <Button
            onClick={handleNext}
            className="bg-violet-600 text-white hover:bg-violet-700"
          >
            {t("VALIDATE_AND_CONTINUE", "Validate and continue")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalReview;
