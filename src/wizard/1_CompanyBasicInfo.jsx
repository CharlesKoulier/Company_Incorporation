import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCompany } from "../CompanyContext";
import activitiesData from "../data/activities.json";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";

const COMPANY_TYPES = {
  EURL: {
    advantages: "EURL_ADVANTAGES",
    disadvantages: "EURL_DISADVANTAGES",
  },
  SASU: {
    advantages: "SASU_ADVANTAGES",
    disadvantages: "SASU_DISADVANTAGES",
  },
  SARL: {
    advantages: "SARL_ADVANTAGES",
    disadvantages: "SARL_DISADVANTAGES",
  },
  SAS: {
    advantages: "SAS_ADVANTAGES",
    disadvantages: "SAS_DISADVANTAGES",
  },
  SNC: {
    advantages: "SNC_ADVANTAGES",
    disadvantages: "SNC_DISADVANTAGES",
  },
  SA: {
    advantages: "SA_ADVANTAGES",
    disadvantages: "SA_DISADVANTAGES",
  },
};

const CompanyBasicInfo = () => {
  const { state, updateStep, setCurrentStep } = useCompany();
  const { t } = useTranslation();
  const searchRef = useRef(null);

  // État pour indiquer si les données ont été pré-remplies
  const [isPrefilled, setIsPrefilled] = useState(false);

  // Calculer la progression actuelle
  const currentProgress = 14; // Step 2 sur 14 étapes, environ 14%

  // Initialiser avec les données du contexte si disponibles
  const [formData, setFormData] = useState({
    partners: "",
    type: "",
    activity: "",
    activityType: "", // Standardisé - Type d'activité (SERVICE, COMMERCE, etc.)
    activityCategory: "", // Standardisé - Catégorie plus détaillée si disponible
    activityDetails: "", // Standardisé - Détails supplémentaires sur l'activité
  });

  const [searchState, setSearchState] = useState({
    term: "",
    suggestions: [],
    isOpen: false,
    selectedIndex: -1,
  });

  // Synchroniser avec le contexte lorsqu'il change
  useEffect(() => {
    if (state.step2 && Object.keys(state.step2).length > 0) {
      const hasData =
        state.step2.partners || state.step2.type || state.step2.activity;

      if (hasData) {
        setFormData({
          partners: state.step2.partners || "",
          type: state.step2.type || "",
          activity: state.step2.activity || "",
          activityType: state.step2.activityType || "",
          activityCategory: state.step2.activityCategory || "",
          activityDetails: state.step2.activityDetails || "",
        });

        // Si nous venons de charger des données pré-remplies, mettre à jour le terme de recherche
        if (state.step2.activity && !isPrefilled) {
          setSearchState((prev) => ({
            ...prev,
            term: state.step2.activity,
          }));
          setIsPrefilled(true);
        }
      }
    }
  }, [state.step2, isPrefilled]);

  const getArrayFromTranslation = (translationString) => {
    return t(translationString).split(", ");
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (!term.trim()) {
        setSearchState((prev) => ({ ...prev, suggestions: [] }));
        return;
      }

      const matches = activitiesData
        .filter((activity) =>
          activity.display.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 5);

      setSearchState((prev) => ({ ...prev, suggestions: matches }));
    }, 150),
    []
  );

  useEffect(() => {
    debouncedSearch(searchState.term);
  }, [searchState.term, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchState((prev) => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePartnerInput = (value) => {
    setFormData((prev) => ({
      ...prev,
      partners: value,
      type: "",
    }));
  };

  const handleTypeSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleActivitySelect = (activity) => {
    setFormData((prev) => ({
      ...prev,
      activity: activity.display,
      activityType: activity.classification || "", // Standardisé - Type d'activité
      activityCategory: activity.category || "", // Standardisé - Catégorie
      activityDetails: activity.detail || "", // Standardisé - Détails
    }));
    setSearchState((prev) => ({
      ...prev,
      term: activity.display,
      isOpen: false,
    }));
  };

  const handleSearchInput = (value) => {
    setSearchState((prev) => ({
      ...prev,
      term: value,
      isOpen: true,
      selectedIndex: -1,
    }));
  };

  const handleSearchKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSearchState((prev) => ({
          ...prev,
          selectedIndex: Math.min(
            prev.selectedIndex + 1,
            prev.suggestions.length - 1
          ),
        }));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSearchState((prev) => ({
          ...prev,
          selectedIndex: Math.max(prev.selectedIndex - 1, -1),
        }));
        break;
      case "Enter":
        e.preventDefault();
        if (
          searchState.selectedIndex >= 0 &&
          searchState.suggestions[searchState.selectedIndex]
        ) {
          handleActivitySelect(
            searchState.suggestions[searchState.selectedIndex]
          );
        }
        break;
      case "Escape":
        setSearchState((prev) => ({ ...prev, isOpen: false }));
        break;
      default:
        break;
    }
  };

  const getAvailableCompanyTypes = (partners) => {
    const count = parseInt(partners);
    if (!count || isNaN(count)) return [];
    if (count === 1) return ["EURL", "SASU"];
    if (count >= 2 && count <= 100) return ["SARL", "SAS", "SNC"];
    return ["SA", "SCA"];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log des données standardisées pour debug
    console.log("Saving standardized activity data:", {
      activity: formData.activity,
      activityType: formData.activityType,
      activityCategory: formData.activityCategory,
      activityDetails: formData.activityDetails,
    });

    updateStep(2, formData);
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <CardTitle>{t("COMPANY_CREATION")}</CardTitle>
          <AlertCircle className="h-5 w-5 text-blue-500" />
        </div>
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
                "Ce formulaire a été pré-rempli d'après vos réponses à l'étape de préqualification. Vous pouvez modifier ces informations si nécessaire."
              )}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Partners Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {t("PARTNERS_LABEL")}
            </label>
            <input
              type="number"
              min="1"
              max="99" // Limité à 99 associés maximum
              value={formData.partners}
              onChange={(e) => handlePartnerInput(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm"
              required
            />
          </div>

          {/* Company Type Select */}
          {formData.partners && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {t("LEGAL_FORM_LABEL")}
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleTypeSelect(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              >
                <option value="">{t("SELECT_OPTION")}</option>
                {getAvailableCompanyTypes(formData.partners).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {formData.type && COMPANY_TYPES[formData.type] && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-blue-800">
                    {t("COMPANY_CHARACTERISTICS", { type: formData.type })}
                  </h4>
                  <div>
                    <h5 className="text-sm font-medium text-green-700 mb-2">
                      {t("ADVANTAGES")}
                    </h5>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {getArrayFromTranslation(
                        COMPANY_TYPES[formData.type].advantages
                      ).map((adv, index) => (
                        <li key={index} className="text-gray-700">
                          {adv}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-red-700 mb-2">
                      {t("DISADVANTAGES")}
                    </h5>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {getArrayFromTranslation(
                        COMPANY_TYPES[formData.type].disadvantages
                      ).map((disadv, index) => (
                        <li key={index} className="text-gray-700">
                          {disadv}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Activity Search */}
          <div className="space-y-2 relative" ref={searchRef}>
            <label className="block text-sm font-medium text-gray-700">
              {t("ACTIVITY_LABEL")}
            </label>
            <input
              type="text"
              value={searchState.term}
              onChange={(e) => handleSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder={t("ACTIVITY_SEARCH_PLACEHOLDER")}
              className="w-full p-3 border rounded-lg shadow-sm"
              required
            />

            {searchState.isOpen && searchState.suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                {searchState.suggestions.map((activity, index) => (
                  <li
                    key={activity.id}
                    onClick={() => handleActivitySelect(activity)}
                    className={`p-3 cursor-pointer hover:bg-gray-50 
                     ${
                       index === searchState.selectedIndex ? "bg-gray-100" : ""
                     }`}
                  >
                    {activity.display}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Activity Type & Category Display */}
          {formData.activityType && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                {t("ACTIVITY_CATEGORY_LABEL")}{" "}
                <strong>{formData.activityType}</strong>
              </p>
              {formData.activityCategory && (
                <p className="text-sm text-blue-900 mt-2">
                  Catégorie détaillée:{" "}
                  <strong>{formData.activityCategory}</strong>
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t-2 border-gray-100">
            <Button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white"
            >
              {t("BACK")}
            </Button>
            <Button type="submit" className="bg-violet-600 text-white">
              {t("CONTINUE")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyBasicInfo;
