// src/wizard/WizardEntryPage.jsx

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCompany } from "../CompanyContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
// import posthog from 'posthog-js'; // placeholder si on veut du tracking

/**
 * WizardEntryPage : étape initiale (avant step 0 ou step 0)
 * permettant de choisir entre un parcours guidé ou direct.
 */

function WizardEntryPage() {
  const { t } = useTranslation();
  const { setCurrentStep, resetWizard } = useCompany();

  // Garantir que cette page est bien considérée comme le point de départ
  useEffect(() => {
    // Marquer cette étape comme le point de départ du wizard
    sessionStorage.setItem("wizardStarted", "true");
  }, []);

  /**
   * handleGuided : l'utilisateur choisit un parcours guidé => step 1
   */
  const handleGuided = () => {
    // posthog.capture("wizard_entry_guided_clicked");
    setCurrentStep(1); // redirige vers la pré-qualification (0_PreQualificationForm)
  };

  /**
   * handleDirect : l'utilisateur sait déjà ce qu'il veut => step 2
   */
  const handleDirect = () => {
    // posthog.capture("wizard_entry_direct_clicked");
    setCurrentStep(2); // redirige vers les infos de base (1_CompanyBasicInfo)
  };

  /**
   * handleReset : réinitialiser complètement le parcours (pour le débogage)
   */
  const handleReset = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir réinitialiser toutes vos données ?"
      )
    ) {
      resetWizard();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <LanguageSwitcher />

      <h1 className="text-xl font-semibold mb-4">
        {t("WELCOME", "Bienvenue sur notre formulaire")}
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        {t(
          "CHOOSE_YOUR_PATH",
          "Choisissez le parcours pour créer votre entreprise"
        )}
      </p>

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleGuided}
          className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
        >
          {t("GUIDED_PATH", "Je veux être guidé pas à pas")}
        </button>
        <button
          onClick={handleDirect}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          {t("DIRECT_PATH", "Je sais déjà ce que je veux")}
        </button>
      </div>

      {/* Bouton pour réinitialiser (visible uniquement en mode développement) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={handleReset}
            className="text-xs text-red-600 hover:text-red-800"
          >
            Réinitialiser les données (développement uniquement)
          </button>
        </div>
      )}
    </div>
  );
}

export default WizardEntryPage;
