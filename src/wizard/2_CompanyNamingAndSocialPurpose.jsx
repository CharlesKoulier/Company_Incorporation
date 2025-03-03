import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  AlertCircle,
  Search,
  ExternalLink,
  ChevronDown,
  Globe,
  AlertTriangle,
  Info,
} from "lucide-react";
import _ from "lodash";
import { useCompany } from "../CompanyContext";
import activitiesData from "../data/activities.json";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";

const CompanyNamingAndSocialPurpose = () => {
  const { state, updateStep, setCurrentStep } = useCompany();
  const { t } = useTranslation();

  // Calculate current progress
  const currentProgress = 21; // Step 3 out of 14 steps, approximately 21%

  const [formData, setFormData] = useState({
    companyName: "",
    tradeName: "",
    socialPurpose: "",
    duration: "99",
    startDate: "",
    acronym: "",
    shopSign: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [domainSuggestions, setDomainSuggestions] = useState([]);
  const [additionalActivities, setAdditionalActivities] = useState([]);
  const [showAdditionalActivitiesWarning, setShowAdditionalActivitiesWarning] =
    useState(false);
  const [isPrefilled, setIsPrefilled] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const debouncedSearch = _.debounce((name) => {
    if (name.length > 2) {
      setIsSearching(true);
      const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      setDomainSuggestions([
        { domain: `${normalizedName}.fr`, available: true, price: "15€/an" },
        { domain: `${normalizedName}.com`, available: false },
        { domain: `${normalizedName}.eu`, available: true, price: "12€/an" },
      ]);
    } else {
      setIsSearching(false);
      setDomainSuggestions([]);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(formData.companyName);
    return () => debouncedSearch.cancel();
  }, [formData.companyName]);

  const getSearchUrl = () => {
    const baseUrl =
      "https://www.infogreffe.fr/recherche-entreprise-dirigeant/resultats-de-recherche";
    const params = new URLSearchParams({
      recherche: "Entreprises",
      dirigeantPage: "0",
      dirigeantPageSize: "10",
      phrase: formData.companyName,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    // Load previous data
    if (state.step3 && Object.keys(state.step3).length > 0) {
      // Check if data already exists
      const hasData =
        state.step3.companyName ||
        state.step3.startDate ||
        state.step3.socialPurpose;

      if (hasData) {
        setFormData((prev) => ({
          ...prev,
          ...state.step3,
        }));

        if (!isPrefilled) {
          setIsPrefilled(true);
        }
      }
    }

    // If a start date was defined in the pre-qualification step and not yet in step3
    if (state.step0 && state.step0.startDate && !state.step3?.startDate) {
      setFormData((prev) => ({
        ...prev,
        startDate: state.step0.startDate,
      }));
    }

    // Generate social purpose from activity if needed
    if (state.step2 && state.step2.activity && !formData.socialPurpose) {
      const selectedActivity = activitiesData.find(
        (act) => act.display === state.step2.activity
      );
      const activityDetail = selectedActivity ? selectedActivity.detail : "";
      if (activityDetail) {
        setFormData((prev) => ({
          ...prev,
          socialPurpose: `Objet principal : ${activityDetail}\n(Autres mentions éventuelles)`,
        }));
      }
    }
  }, [
    state.step2,
    state.step3,
    state.step0,
    formData.socialPurpose,
    isPrefilled,
  ]);

  const handleAddActivity = () => {
    setShowAdditionalActivitiesWarning(true);
  };

  const confirmAddActivity = () => {
    setAdditionalActivities([
      ...additionalActivities,
      { name: "", description: "" },
    ]);
    setShowAdditionalActivitiesWarning(false);
  };

  const cancelAddActivity = () => {
    setShowAdditionalActivitiesWarning(false);
  };

  const handleAdditionalActivityChange = (index, field, value) => {
    const newActivities = [...additionalActivities];
    newActivities[index][field] = value;
    setAdditionalActivities(newActivities);
  };

  const handleRemoveActivity = (index) => {
    const newActivities = [...additionalActivities];
    newActivities.splice(index, 1);
    setAdditionalActivities(newActivities);
  };

  const handleNext = () => {
    // Include additional activities in the social purpose if defined
    if (additionalActivities.length > 0) {
      const additionalActivitiesText = additionalActivities
        .map((a) => `- ${a.name}: ${a.description}`)
        .join("\n");

      const updatedSocialPurpose =
        formData.socialPurpose +
        "\n\nActivités secondaires:\n" +
        additionalActivitiesText;

      updateStep(3, { ...formData, socialPurpose: updatedSocialPurpose });
    } else {
      updateStep(3, formData);
    }

    setCurrentStep(4);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handleBack = () => {
    // Save current data before going back
    updateStep(3, formData);
    setCurrentStep(2);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle step={3} totalSteps={14}>
          {t("STEP2_TITLE")}
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
              {t("NAME_GUIDE_TITLE")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-red-700 mb-2">
                  {t("NAMING_FORBIDDEN_TITLE")}
                </h5>
                <ul className="text-sm text-red-600 list-disc pl-5 space-y-1">
                  {t("FORBIDDEN_NAMES", { returnObjects: true }).map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-green-700 mb-2">
                  {t("NAMING_TIPS_TITLE")}
                </h5>
                <ul className="text-sm text-green-600 list-disc pl-5 space-y-1">
                  {t("NAMING_TIPS", { returnObjects: true }).map(
                    (tip, index) => (
                      <li key={index}>{tip}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t("COMPANY_NAME_LABEL")}
            </label>
            <div className="relative">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder={t("COMPANY_NAME_PLACEHOLDER")}
                required
              />
              {isSearching && (
                <>
                  <div className="mt-2 p-3 bg-blue-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-blue-700">
                        {t("DOMAIN_CHECK_TITLE")}
                      </span>
                    </div>

                    <a
                      href={getSearchUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {t("DOMAIN_CHECK_LINK")}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>

                  <div className="mt-2 p-3 bg-blue-50 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-blue-700">
                        {t("DOMAIN_AVAILABILITY_TITLE")}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {domainSuggestions.map((domain, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-2 rounded"
                        >
                          <span className="font-mono text-sm">
                            {domain.domain}
                          </span>
                          {domain.available ? (
                            <div className="flex items-center gap-2">
                              <span className="text-green-600 text-sm">
                                {t("DOMAIN_AVAILABLE")}
                              </span>
                              <button
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(
                                    `https://example.com/register?domain=${domain.domain}`,
                                    "_blank"
                                  );
                                }}
                              >
                                {t("DOMAIN_RESERVE")} ({domain.price})
                              </button>
                            </div>
                          ) : (
                            <span className="text-red-600 text-sm">
                              {t("DOMAIN_TAKEN")}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {t("COMPANY_NAME_HELP")}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t("SOCIAL_PURPOSE_LABEL")}
            </label>
            <textarea
              name="socialPurpose"
              value={formData.socialPurpose}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder={t("SOCIAL_PURPOSE_PLACEHOLDER")}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {t("SOCIAL_PURPOSE_HELP")}
            </p>

            {/* Button to add other activities */}
            <div className="mt-3">
              <button
                type="button"
                onClick={handleAddActivity}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                <Info className="h-4 w-4 mr-1" />
                {t("ADD_OTHER_ACTIVITIES", "Add other activities")}
              </button>
            </div>

            {/* Warning about additional activities */}
            {showAdditionalActivitiesWarning && (
              <div className="mt-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-orange-700 font-medium mb-2">
                      {t(
                        "ADDITIONAL_ACTIVITIES_WARNING_TITLE",
                        "Beware of complexity with INPI!"
                      )}
                    </p>
                    <p className="text-sm text-orange-600 mb-3">
                      {t(
                        "ADDITIONAL_ACTIVITIES_WARNING",
                        "Adding secondary activities may complicate registration with INPI and lead to clarification requests. Do you still want to add additional activities?"
                      )}
                    </p>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={cancelAddActivity}
                        className="px-3 py-1 bg-white border border-gray-300 text-sm rounded hover:bg-gray-50"
                      >
                        {t("CANCEL", "Cancel")}
                      </button>
                      <button
                        type="button"
                        onClick={confirmAddActivity}
                        className="px-3 py-1 bg-orange-100 border border-orange-200 text-orange-800 text-sm rounded hover:bg-orange-200"
                      >
                        {t("CONTINUE_ANYWAY", "Continue anyway")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* List of additional activities */}
            {additionalActivities.length > 0 && (
              <div className="mt-3 space-y-3">
                <h4 className="text-sm font-medium text-gray-700">
                  {t("ADDITIONAL_ACTIVITIES", "Secondary activities")}
                </h4>
                {additionalActivities.map((activity, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between mb-2">
                      <h5 className="text-sm font-medium">
                        {t("ACTIVITY", "Activity")} #{index + 1}
                      </h5>
                      <button
                        type="button"
                        onClick={() => handleRemoveActivity(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        {t("REMOVE", "Remove")}
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          {t("ACTIVITY_NAME", "Activity name")}
                        </label>
                        <input
                          type="text"
                          value={activity.name}
                          onChange={(e) =>
                            handleAdditionalActivityChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md text-sm"
                          placeholder={t(
                            "ACTIVITY_NAME_PLACEHOLDER",
                            "Ex: Marketing consulting"
                          )}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          {t("ACTIVITY_DESCRIPTION", "Description")}
                        </label>
                        <textarea
                          value={activity.description}
                          onChange={(e) =>
                            handleAdditionalActivityChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md text-sm"
                          rows="2"
                          placeholder={t(
                            "ACTIVITY_DESCRIPTION_PLACEHOLDER",
                            "Short description of the activity"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setAdditionalActivities([
                      ...additionalActivities,
                      { name: "", description: "" },
                    ])
                  }
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + {t("ADD_MORE_ACTIVITIES", "Add another activity")}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("DURATION_LABEL")}
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                min="1"
                max="99"
                required
              />
              <p className="text-sm text-gray-500 mt-1">{t("DURATION_HELP")}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("START_DATE_LABEL")}
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {t("START_DATE_HELP")}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <div
              onClick={() => setShowAdditionalFields(!showAdditionalFields)}
              className="flex items-center justify-between cursor-pointer bg-gray-50 p-4 rounded-t-lg"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <h3 className="font-medium text-gray-700">
                    {t("ADDITIONAL_FIELDS_TITLE")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t("ADDITIONAL_FIELDS_SUBTITLE")}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 transform transition-transform ${
                  showAdditionalFields ? "rotate-180" : ""
                }`}
              />
            </div>

            {showAdditionalFields && (
              <div className="bg-gray-50 p-4 rounded-b-lg space-y-4">
                <div className="bg-orange-50 p-3 rounded-md mb-4">
                  <p className="text-sm text-orange-700">
                    {t("ADDITIONAL_FIELDS_WARNING")}
                    <ul className="list-disc ml-4 mt-2">
                      {t("ADDITIONAL_FIELDS_CASES", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {t("TRADE_NAME_LABEL")}
                  </label>
                  <input
                    type="text"
                    name="tradeName"
                    value={formData.tradeName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-white"
                    placeholder={t("TRADE_NAME_PLACEHOLDER")}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {t("TRADE_NAME_HELP")}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {t("ACRONYM_LABEL")}
                  </label>
                  <input
                    type="text"
                    name="acronym"
                    value={formData.acronym}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-white"
                    placeholder={t("ACRONYM_PLACEHOLDER")}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {t("ACRONYM_HELP")}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {t("SHOP_SIGN_LABEL")}
                  </label>
                  <input
                    type="text"
                    name="shopSign"
                    value={formData.shopSign}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-white"
                    placeholder={t("SHOP_SIGN_PLACEHOLDER")}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {t("SHOP_SIGN_HELP")}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              {t("IMPORTANT_INFO_TITLE")}
            </h4>
            <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
              {t("IMPORTANT_INFO_ITEMS", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>
        </form>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t("BACK_BUTTON")}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            {t("CONTINUE_BUTTON")}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyNamingAndSocialPurpose;
