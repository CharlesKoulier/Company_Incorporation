import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useCompany } from "../CompanyContext";
import { Alert, AlertDescription } from "../components/ui/alert";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Progress } from "../components/ui/progress";
import activitiesData from "../data/activities.json";
import { isActivitySuitableForKoulier } from "../utils/scoringSystem";

const CompanyHeadquartersAndDomiciliation = () => {
  const { state, updateStep, setCurrentStep } = useCompany();
  const { t } = useTranslation();

  // Calculate current progress
  const currentProgress = 36; // Step 5 out of 14 steps, approximately 36%

  // State to indicate if data has been pre-filled
  const [isPrefilled, setIsPrefilled] = useState(false);

  // Initialize with default state
  const [formData, setFormData] = useState({
    headquartersType: "",
    address: "",
    addressComplement: "",
    postalCode: "",
    city: "",
    domiciliationContract: null,
    ownerAuthorization: null,
  });

  // Determine if the activity is suitable for Koulier domiciliation
  const [isSuitableForKoulier, setIsSuitableForKoulier] = useState(true);
  const [activityType, setActivityType] = useState("");

  // Sync with context when it changes
  useEffect(() => {
    if (state.step5 && Object.keys(state.step5).length > 0) {
      // Check if data already exists
      const hasData = state.step5.headquartersType || state.step5.address;

      if (hasData) {
        setFormData({
          headquartersType: state.step5.headquartersType || "",
          address: state.step5.address || "",
          addressComplement: state.step5.addressComplement || "",
          postalCode: state.step5.postalCode || "",
          city: state.step5.city || "",
          domiciliationContract: state.step5.domiciliationContract || null,
          ownerAuthorization: state.step5.ownerAuthorization || null,
        });

        if (!isPrefilled) {
          setIsPrefilled(true);
        }
      }
    }

    // Récupérer directement le type d'activité à partir de step2
    if (state.step2) {
      // Utilise activityType standardisé si disponible, sinon trouve les données d'activité
      if (state.step2.activityType) {
        console.log(
          "Using standardized activityType:",
          state.step2.activityType
        );
        setActivityType(state.step2.activityType);

        // Pour la suitabilité, on a encore besoin de l'objet d'activité complet
        if (state.step2.activity) {
          const selectedActivity = activitiesData.find(
            (act) => act.display === state.step2.activity
          );
          if (selectedActivity) {
            setIsSuitableForKoulier(
              isActivitySuitableForKoulier(selectedActivity)
            );
          }
        }
      } else if (state.step2.activity) {
        // Fallback si les données standardisées ne sont pas disponibles
        console.log(
          "Falling back to activity lookup for type:",
          state.step2.activity
        );
        const selectedActivity = activitiesData.find(
          (act) => act.display === state.step2.activity
        );
        if (selectedActivity) {
          setIsSuitableForKoulier(
            isActivitySuitableForKoulier(selectedActivity)
          );
          setActivityType(selectedActivity.classification || "");
        }
      }
    }
  }, [state.step5, state.step2, isPrefilled]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // Koulier Option
  const renderKoulierOption = () => (
    <div
      className={`mb-4 border-2 rounded-lg p-4 ${
        isSuitableForKoulier
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="koulier"
          name="headquartersType"
          value="koulier"
          checked={formData.headquartersType === "koulier"}
          onChange={handleInputChange}
          className="mr-2"
        />
        <label
          htmlFor="koulier"
          className={`font-medium ${
            isSuitableForKoulier ? "text-blue-800" : "text-gray-700"
          }`}
        >
          {t(
            "KOULIER_DOMICILIATION_LABEL",
            "Koulier Business Domiciliation - Recommended"
          )}
          {isSuitableForKoulier && (
            <span className="ml-2 text-sm text-green-600">
              {t("RECOMMENDED_FOR_ACTIVITY", "(Recommended for your activity)")}
            </span>
          )}
        </label>
      </div>
      <div className="ml-6">
        {activityType && (
          <div className="mb-3 p-2 bg-white rounded-md border border-blue-100">
            <p className="text-sm text-blue-700">
              {isSuitableForKoulier
                ? t(
                    "ACTIVITY_KOULIER_SUITABLE",
                    `Koulier professional domiciliation is ideal for a ${activityType.toLowerCase()} activity like yours.`
                  )
                : t(
                    "ACTIVITY_KOULIER_NOT_IDEAL",
                    `For a ${activityType.toLowerCase()} activity, a commercial location might be more suitable, but Koulier domiciliation is still possible.`
                  )}
            </p>
          </div>
        )}
        <p className="text-sm text-blue-700 mb-2">
          {t("ADVANTAGES_INCLUDED", "Included advantages:")}
        </p>
        <ul className="text-sm text-blue-600 list-disc pl-5 mb-3">
          <li>
            {t(
              "KOULIER_ADVANTAGE_1",
              "Premium business address in the heart of the 8th district"
            )}
          </li>
          <li>{t("KOULIER_ADVANTAGE_2", "Mail reception and management")}</li>
          <li>
            {t(
              "KOULIER_ADVANTAGE_3",
              "Scanning and notification of important mail"
            )}
          </li>
          <li>
            {t("KOULIER_ADVANTAGE_4", "Mail forwarding service on request")}
          </li>
          <li>
            {t("KOULIER_ADVANTAGE_5", "Access to your online customer area")}
          </li>
          <li>
            {t("KOULIER_ADVANTAGE_6", "Immediate domiciliation certificate")}
          </li>
        </ul>
        <p className="text-sm text-blue-700">
          {t("FROM_20_EUROS", "Starting from €20/month excl. tax")}
        </p>
      </div>
    </div>
  );

  // Commercial Option
  const renderCommercialOption = () => (
    <div
      className={`border rounded-lg p-3 mb-3 ${
        !isSuitableForKoulier ? "border-green-200 bg-green-50" : ""
      }`}
    >
      <div className="flex items-center mb-3">
        <input
          type="radio"
          id="commercial"
          name="headquartersType"
          value="commercial"
          checked={formData.headquartersType === "commercial"}
          onChange={handleInputChange}
          className="mr-2"
        />
        <label htmlFor="commercial" className="font-medium">
          {t("COMMERCIAL_LOCAL", "Commercial premises")}
          {!isSuitableForKoulier && (
            <span className="ml-2 text-sm text-green-600">
              {t("RECOMMENDED_FOR_ACTIVITY", "(Recommended for your activity)")}
            </span>
          )}
        </label>
      </div>
      {!isSuitableForKoulier && activityType && (
        <div className="ml-6 mb-3 p-2 bg-white rounded-md border border-green-100">
          <p className="text-sm text-green-700">
            {t(
              "COMMERCIAL_LOCATION_NEEDED",
              `For a ${activityType.toLowerCase()} activity, a commercial location is generally necessary to welcome your customers and store your goods/equipment.`
            )}
          </p>
        </div>
      )}
      {formData.headquartersType === "commercial" && (
        <div className="ml-6 text-sm text-gray-600">
          <p className="mb-2">{t("DOCS_NEEDED", "Required documents:")}</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>
              {t(
                "BAIL_COMMERCIAL_COPY",
                "Copy of commercial lease or property deed"
              )}
            </li>
          </ul>
          <input
            type="file"
            name="domiciliationContract"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}
    </div>
  );

  // Director's Home Option
  const renderPersonalOption = () => (
    <div className="border rounded-lg p-3 mb-3">
      <div className="flex items-center mb-3">
        <input
          type="radio"
          id="personal"
          name="headquartersType"
          value="personal"
          checked={formData.headquartersType === "personal"}
          onChange={handleInputChange}
          className="mr-2"
        />
        <label htmlFor="personal" className="font-medium">
          {t("DOMICILE_DIRIGEANT", "Domiciliation at director's home")}
        </label>
      </div>
      {formData.headquartersType === "personal" && (
        <div className="ml-6 text-sm text-gray-600">
          <p className="mb-2">{t("DOCS_NEEDED", "Required documents:")}</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>
              {t(
                "JUSTIFICATIF_DOMICILE",
                "Proof of residence less than 3 months old"
              )}
            </li>
            <li>
              {t("OWNER_AUTHORIZATION", "Owner's authorization (if tenant)")}
            </li>
          </ul>
          <div className="space-y-3">
            <input
              type="file"
              name="domiciliationContract"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full p-2 border rounded-md"
              placeholder={t("PLACEHOLDER_DOMICILE", "Proof of residence")}
            />
            <input
              type="file"
              name="ownerAuthorization"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full p-2 border rounded-md"
              placeholder={t("PLACEHOLDER_OWNER_AUTH", "Owner's authorization")}
            />
          </div>
        </div>
      )}
    </div>
  );

  // Display address fields
  const renderAddressFields = () => (
    <div className="mt-6 space-y-4">
      {formData.headquartersType === "koulier" ? (
        <div className="border rounded-md p-4 bg-gray-50">
          <h4 className="font-medium mb-3">
            {t(
              "KOULIER_DOMICILIATION_ADDRESS",
              "Koulier domiciliation address"
            )}
          </h4>
          <p className="text-gray-700">44 rue Pasquier</p>
          <p className="text-gray-700">75008 Paris</p>
          <p className="text-sm text-blue-600 mt-2">
            {t(
              "ATTESTATION_INSTANT",
              "A domiciliation certificate will be provided instantly"
            )}
          </p>
        </div>
      ) : (
        formData.headquartersType && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("ADDRESS_LABEL", "Address *")}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
                placeholder={t("ADDRESS_PLACEHOLDER", "Street number and name")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("ADDRESS_COMPLEMENT", "Address complement")}
              </label>
              <input
                type="text"
                name="addressComplement"
                value={formData.addressComplement}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder={t(
                  "ADDRESS_COMPLEMENT_PLACEHOLDER",
                  "Building, floor, etc."
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("POSTAL_CODE", "Postal code *")}
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                  pattern="[0-9]{5}"
                  placeholder={t("POSTAL_CODE_EX", "Ex: 75001")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("CITY_LABEL", "City *")}
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                  placeholder={t("CITY_EX", "Ex: Paris")}
                />
              </div>
            </div>
          </>
        )
      )}
    </div>
  );

  // Next button
  const handleNext = () => {
    updateStep(5, formData);
    setCurrentStep(6);
  };

  // Previous button
  const handleBack = () => {
    updateStep(5, formData);
    setCurrentStep(4);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle step={5} totalSteps={14}>
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

        <form className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              {t("IMPORTANT_POINTS", "Important points:")}
            </h4>
            <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
              <li>
                {t(
                  "HEADQUARTERS_DETERMINES_REGISTRATION",
                  "The headquarters determines where your company will be registered"
                )}
              </li>
              <li>
                {t(
                  "HEADQUARTERS_CORRESPONDS_LOCAL",
                  "It must correspond to a location where administrative activity is carried out"
                )}
              </li>
              <li>
                {t(
                  "HEADQUARTERS_VISIBLE_DOCUMENTS",
                  "The address will be visible on all official documents"
                )}
              </li>
              <li>
                {t(
                  "CHANGE_OF_ADDRESS_FORMALITIES",
                  "Changing address requires administrative procedures"
                )}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">
              {t("CHOOSE_DOMICILIATION_TYPE", "Choose your domiciliation type")}
            </h3>
            {renderKoulierOption()}
            {renderCommercialOption()}
            {renderPersonalOption()}
          </div>
          {renderAddressFields()}
        </form>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t("BACK", "Previous")}
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            {t("NEXT", "Next")}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyHeadquartersAndDomiciliation;
