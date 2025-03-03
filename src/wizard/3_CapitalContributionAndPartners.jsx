import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import _ from "lodash";
import { useCompany } from "../CompanyContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Progress } from "../components/ui/progress";

// Configuration of roles and restrictions by company type
const COMPANY_ROLES = {
  SARL: {
    roles: [
      { value: "gerant", label: "Gérant", isUnique: true, isRequired: true },
      { value: "cogerant", label: "Co-gérant", isUnique: false },
      { value: "associe", label: "Associé simple", isUnique: false },
    ],
    uniqueRoleMessages: {
      gerant: "ROLE_ALREADY_TAKEN_GERANT",
    },
  },
  EURL: {
    roles: [
      { value: "gerant", label: "Gérant", isUnique: true, isRequired: true },
      { value: "associe", label: "Associé simple", isUnique: false },
    ],
    uniqueRoleMessages: {
      gerant: "ROLE_ALREADY_TAKEN_GERANT_EURL",
    },
  },
  SAS: {
    roles: [
      {
        value: "president",
        label: "Président",
        isUnique: true,
        isRequired: true,
      },
      {
        value: "directeur_general",
        label: "Directeur Général",
        isUnique: true,
      },
      {
        value: "directeur_general_delegue",
        label: "Directeur Général Délégué",
        isUnique: false,
      },
      { value: "associe", label: "Associé simple", isUnique: false },
    ],
    uniqueRoleMessages: {
      president: "ROLE_ALREADY_TAKEN_PRESIDENT",
      directeur_general: "ROLE_ALREADY_TAKEN_DG",
    },
  },
  SASU: {
    roles: [
      {
        value: "president",
        label: "Président",
        isUnique: true,
        isRequired: true,
      },
      {
        value: "directeur_general",
        label: "Directeur Général",
        isUnique: true,
      },
      { value: "associe", label: "Associé simple", isUnique: false },
    ],
    uniqueRoleMessages: {
      president: "ROLE_ALREADY_TAKEN_PRESIDENT_SASU",
      directeur_general: "ROLE_ALREADY_TAKEN_DG_SASU",
    },
  },
  SA: {
    roles: [
      {
        value: "president_ca",
        label: "Président du Conseil d'Administration",
        isUnique: true,
        isRequired: true,
      },
      {
        value: "directeur_general",
        label: "Directeur Général",
        isUnique: true,
      },
      { value: "administrateur", label: "Administrateur", isUnique: false },
      { value: "actionnaire", label: "Actionnaire", isUnique: false },
    ],
    uniqueRoleMessages: {
      president_ca: "ROLE_ALREADY_TAKEN_PRESIDENT_CA",
      directeur_general: "ROLE_ALREADY_TAKEN_DG_SA",
    },
  },
};

const CapitalContributionAndPartners = () => {
  const initialFormData = {
    capitalAmount: "",
    partners: [],
  };

  const { state, updateStep, setCurrentStep } = useCompany();
  const { t } = useTranslation();

  // Calculate current progress
  const currentProgress = 29; // Step 4 out of 14 steps, approximately 29%

  // State to indicate if data has been pre-filled
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState([]);
  const [roleErrors, setRoleErrors] = useState({});

  // Get number of partners from step 1 (stored in state.step2.partners)
  const numberOfPartnersFromStep1 = state.step2?.partners
    ? Number(state.step2.partners)
    : 2;

  // Get company type from step 1 (stored in state.step2.type)
  const [companyType, setCompanyType] = useState(state.step2?.type || "SARL");
  const [numberOfPartners, setNumberOfPartners] = useState(
    numberOfPartnersFromStep1
  );

  // Sync with context when it changes
  useEffect(() => {
    if (state.step4 && Object.keys(state.step4).length > 0) {
      // Existing step4 data to load
      if (state.step4.partners && state.step4.partners.length > 0) {
        setFormData({
          capitalAmount: state.step4.capitalAmount || "",
          partners: [...state.step4.partners],
        });

        if (!isPrefilled) {
          setIsPrefilled(true);
        }
      }
    }
  }, [state.step4, isPrefilled]);

  // Sync company type with step 1
  useEffect(() => {
    setCompanyType(state.step2?.type || "SARL");
  }, [state.step2?.type]);

  // Sync number of partners
  useEffect(() => {
    setNumberOfPartners(numberOfPartnersFromStep1);
  }, [numberOfPartnersFromStep1]);

  const getMinimumCapital = () => {
    return companyType === "SA" ? 37000 : 1;
  };

  const getRoleOptions = () => {
    return COMPANY_ROLES[companyType]?.roles || [];
  };

  // Function to check if a role is already assigned
  const checkRoleAvailability = (role, currentPartnerIndex) => {
    const roleConfig = COMPANY_ROLES[companyType].roles.find(
      (r) => r.value === role
    );
    if (!roleConfig?.isUnique) return { isAvailable: true };

    const existingPartner = formData.partners.find(
      (p, idx) => idx !== currentPartnerIndex && p.role === role
    );

    return {
      isAvailable: !existingPartner,
      message: existingPartner
        ? t(COMPANY_ROLES[companyType].uniqueRoleMessages[role])
        : null,
    };
  };

  const handleRoleChange = (index, newRole) => {
    const { isAvailable, message } = checkRoleAvailability(newRole, index);

    if (!isAvailable) {
      setRoleErrors((prev) => ({
        ...prev,
        [index]: message,
      }));
      setValidationErrors([message]);
      return false;
    }

    setRoleErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });

    return true;
  };

  const handlePartnerChange = (index, field, value) => {
    if (field === "role") {
      if (!handleRoleChange(index, value)) {
        return; // Stop if role change is not valid
      }
    }

    const newPartners = [...formData.partners];
    newPartners[index] = {
      ...newPartners[index],
      [field]: value,
    };

    if (field === "capitalContribution") {
      // Calculate total contribution amount
      const totalContribution = newPartners.reduce(
        (sum, partner) => sum + (Number(partner.capitalContribution) || 0),
        0
      );

      // If total amount is greater than 0, calculate percentages
      if (totalContribution > 0) {
        newPartners.forEach((partner, i) => {
          if (partner.capitalContribution) {
            partner.sharePercentage = (
              (Number(partner.capitalContribution) / totalContribution) *
              100
            ).toFixed(2);
          } else {
            partner.sharePercentage = "0.00";
          }
        });
      }

      // Automatically update capitalAmount
      setFormData((prev) => ({
        ...prev,
        partners: newPartners,
        capitalAmount: totalContribution.toString(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        partners: newPartners,
      }));
    }
  };

  // Initialize partners
  useEffect(() => {
    // Only reset partners if not already prefilled
    if (!isPrefilled || formData.partners.length !== numberOfPartners) {
      const newPartners = Array(numberOfPartners)
        .fill(null)
        .map((_, index) => {
          // For the first partner, automatically assign the main role
          let defaultRole = "associe";
          if (index === 0) {
            if (["EURL", "SARL"].includes(companyType)) {
              defaultRole = "gerant";
            } else if (["SASU", "SAS"].includes(companyType)) {
              defaultRole = "president";
            } else if (companyType === "SA") {
              defaultRole = "president_ca";
            }
          }

          return {
            firstName: "",
            firstName2: "",
            firstName3: "",
            firstName4: "",
            lastName: "",
            birthDate: "",
            birthPlace: "",
            nationality: "Française",
            address: "",
            capitalContribution: "",
            contributionType: "numeraire",
            role: defaultRole,
            sharePercentage: "",
          };
        });

      setFormData((prev) => ({
        ...prev,
        partners: newPartners,
      }));
    }
  }, [numberOfPartners, companyType, isPrefilled]);

  const validateCapitalDistribution = () => {
    const totalPercentage = formData.partners.reduce(
      (sum, partner) => sum + (Number(partner.sharePercentage) || 0),
      0
    );
    return Math.abs(totalPercentage - 100) < 0.01;
  };

  const validateRequiredRoles = () => {
    const errors = [];
    const companyConfig = COMPANY_ROLES[companyType];

    companyConfig.roles
      .filter((role) => role.isRequired)
      .forEach((role) => {
        const hasRole = formData.partners.some(
          (partner) => partner.role === role.value
        );
        if (!hasRole) {
          errors.push(t("ROLE_REQUIRED", { role: role.label }));
        }
      });

    return errors;
  };

  const handleNext = () => {
    const errors = [];
    errors.push(...validateRequiredRoles());
    if (!validateCapitalDistribution()) {
      errors.push(
        t(
          "SHARES_TOTAL_100",
          "The distribution of shares must total exactly 100%"
        )
      );
    }
    const totalCapital = formData.partners.reduce(
      (sum, partner) => sum + (Number(partner.capitalContribution) || 0),
      0
    );
    if (totalCapital < getMinimumCapital()) {
      errors.push(t("CAPITAL_BELOW_MIN", { min: getMinimumCapital() }));
    }
    setValidationErrors(errors);
    if (errors.length > 0) return;

    // Save data in step4
    updateStep(4, formData);
    // Move to next step: from step4 to step5
    setCurrentStep(5);
  };

  const handleBack = () => {
    // Save current data before going back
    updateStep(4, formData);
    // Go back to previous step: from step4 to step3
    setCurrentStep(3);
  };

  const renderPartnerInfo = (partner, index) => (
    <div key={index} className="mb-6 p-4 border rounded-md bg-gray-50">
      <h4 className="font-medium mb-3">
        {t("ASSOCIATE", "Partner")} {index + 1}
        {partner.role.includes("president") && (
          <span className="ml-2 text-sm text-blue-600">
            {t("LEGAL_REPRESENTATIVE", "(Legal representative)")}
          </span>
        )}
      </h4>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("COMPANY_ROLE", "Company role *")}
        </label>
        <div className="relative">
          <select
            value={partner.role}
            onChange={(e) => handlePartnerChange(index, "role", e.target.value)}
            className={`w-full p-2 border rounded-md ${
              roleErrors[index] ? "border-red-500" : ""
            }`}
            required
          >
            {getRoleOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {roleErrors[index] && (
            <div className="mt-1 text-sm text-red-600">{roleErrors[index]}</div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("FIRST_NAME", "First name *")}
            </label>
            <input
              type="text"
              value={partner.firstName}
              onChange={(e) =>
                handlePartnerChange(index, "firstName", e.target.value)
              }
              className="w-full p-2 border rounded-md"
              placeholder={t("FIRST_NAME_PLACEHOLDER", "First name")}
              required
            />
          </div>
          {partner.firstName && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("SECOND_NAME", "Second name")}
              </label>
              <input
                type="text"
                value={partner.firstName2 || ""}
                onChange={(e) =>
                  handlePartnerChange(index, "firstName2", e.target.value)
                }
                className="w-full p-2 border rounded-md"
                placeholder={t(
                  "OPTIONAL_SECOND_NAME",
                  "Second name (optional)"
                )}
              />
            </div>
          )}
          {partner.firstName2 && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("THIRD_NAME", "Third name")}
              </label>
              <input
                type="text"
                value={partner.firstName3 || ""}
                onChange={(e) =>
                  handlePartnerChange(index, "firstName3", e.target.value)
                }
                className="w-full p-2 border rounded-md"
                placeholder={t("OPTIONAL_THIRD_NAME", "Third name (optional)")}
              />
            </div>
          )}
          {partner.firstName3 && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t("FOURTH_NAME", "Fourth name")}
              </label>
              <input
                type="text"
                value={partner.firstName4 || ""}
                onChange={(e) =>
                  handlePartnerChange(index, "firstName4", e.target.value)
                }
                className="w-full p-2 border rounded-md"
                placeholder={t(
                  "OPTIONAL_FOURTH_NAME",
                  "Fourth name (optional)"
                )}
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("LAST_NAME", "Last name *")}
          </label>
          <input
            type="text"
            value={partner.lastName}
            onChange={(e) =>
              handlePartnerChange(index, "lastName", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            placeholder={t("LAST_NAME_PLACEHOLDER", "Family name")}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("BIRTH_DATE", "Date of birth *")}
          </label>
          <input
            type="date"
            value={partner.birthDate}
            onChange={(e) =>
              handlePartnerChange(index, "birthDate", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("BIRTH_PLACE", "Place of birth *")}
          </label>
          <input
            type="text"
            value={partner.birthPlace}
            onChange={(e) =>
              handlePartnerChange(index, "birthPlace", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("NATIONALITY", "Nationality *")}
          </label>
          <input
            type="text"
            value={partner.nationality}
            onChange={(e) =>
              handlePartnerChange(index, "nationality", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("CONTRIBUTION_TYPE", "Contribution type *")}
          </label>
          <select
            value={partner.contributionType}
            onChange={(e) =>
              handlePartnerChange(index, "contributionType", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="numeraire">{t("APPORT_NUMERAIRE", "Cash")}</option>
            <option value="nature">{t("APPORT_NATURE", "In kind")}</option>
            <option value="industrie">
              {t("APPORT_INDUSTRIE", "Industry")}
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("APPORT_AMOUNT", "Contribution amount (€) *")}
          </label>
          <input
            type="number"
            value={partner.capitalContribution}
            onChange={(e) =>
              handlePartnerChange(index, "capitalContribution", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("SHARE_PERCENTAGE", "Share percentage")}
          </label>
          <input
            type="text"
            value={partner.sharePercentage ? `${partner.sharePercentage}%` : ""}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle step={4} totalSteps={14}>
          {t("COMPANY_CREATION", "Company Creation")}
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
                "This form has been pre-filled based on your previous answers. You can modify this information if necessary."
              )}
            </AlertDescription>
          </Alert>
        )}

        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc pl-4">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <form className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              {t("IMPORTANT_POINTS", "Important points:")}
            </h4>
            <ul className="text-sm text-yellow-700 list-disc pl-5">
              <li>
                {t(
                  "MINIMUM_CAPITAL_REQUIRED",
                  "The minimum required capital is"
                )}{" "}
                {getMinimumCapital()}€
              </li>
              <li>
                {t(
                  "SHARE_DISTRIBUTION_100",
                  "Share distribution must total 100%"
                )}
              </li>
              <li>
                {t(
                  "RELEASE_20_PERCENT",
                  "Each partner must release at least 20% of their contribution at creation"
                )}
              </li>
              <li>
                {t(
                  "RELEASE_REST_5YEARS",
                  "The remaining capital must be released within 5 years"
                )}
              </li>
            </ul>
          </div>
          {formData.partners.map((partner, index) =>
            renderPartnerInfo(partner, index)
          )}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-sm text-gray-600">
                  {t("TOTAL_ESTIMATED_CAPITAL", "Total estimated capital:")}
                </span>
                <span className="ml-2 text-lg font-medium">
                  {formData.capitalAmount ||
                    formData.partners.reduce(
                      (sum, p) => sum + (Number(p.capitalContribution) || 0),
                      0
                    )}
                  €
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">
                  {t("MINIMUM_REQUIRED", "Minimum required:")}
                </span>
                <span className="ml-2 text-lg font-medium text-blue-600">
                  {getMinimumCapital()}€
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">
                {t("CAPITAL_CONFIRMATION", "Share capital confirmation *")}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  name="capitalAmount"
                  value={formData.capitalAmount}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData((prev) => ({ ...prev, [name]: value }));
                  }}
                  className="flex-1 p-2 border rounded-md"
                  min={getMinimumCapital()}
                  required
                  placeholder={t(
                    "CAPITAL_TO_VALIDATE",
                    "Capital amount to validate"
                  )}
                />
                <button
                  type="button"
                  onClick={() => {
                    const totalContributions = formData.partners.reduce(
                      (sum, partner) =>
                        sum + (Number(partner.capitalContribution) || 0),
                      0
                    );
                    setFormData((prev) => ({
                      ...prev,
                      capitalAmount: totalContributions.toString(),
                    }));
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t("VALIDATE_THIS_AMOUNT", "Validate this amount")}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {t(
                  "CAPITAL_WILL_BE_IN_STATUTES",
                  "This amount will be written in your company's bylaws"
                )}
              </p>
            </div>
          </div>
        </form>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t("BACK", "Back")}
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            {t("CONTINUE", "Continue")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapitalContributionAndPartners;
