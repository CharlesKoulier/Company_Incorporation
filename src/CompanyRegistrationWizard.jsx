// src/CompanyRegistrationWizard.jsx

import React, { Suspense, lazy, useState, useEffect } from "react";
import { useCompany } from "./CompanyContext";
import ProgressBar from "./components/ProgressBar";

// On lazy-load chaque étape
const WizardEntryPage = lazy(() => import("./wizard/WizardEntryPage"));
const PreQualificationForm = lazy(() =>
  import("./wizard/0_PreQualificationForm")
);
const CompanyBasicInfo = lazy(() => import("./wizard/1_CompanyBasicInfo"));
const CompanyNamingAndSocialPurpose = lazy(() =>
  import("./wizard/2_CompanyNamingAndSocialPurpose")
);
const CapitalContributionAndPartners = lazy(() =>
  import("./wizard/3_CapitalContributionAndPartners")
);
const CompanyHeadquartersAndDomiciliation = lazy(() =>
  import("./wizard/4_CompanyHeadquartersAndDomiciliation")
);
const FiscalAndSocialRegime = lazy(() =>
  import("./wizard/5_FiscalAndSocialRegime")
);
const ClosingDateAndInitialExercise = lazy(() =>
  import("./wizard/6_ClosingDateAndInitialExercise")
);
const ComplimentaryServices = lazy(() =>
  import("./wizard/7_ComplimentaryServices")
);
const FinalReview = lazy(() => import("./wizard/8_FinalReview"));
const FinalGenerationDocs = lazy(() =>
  import("./wizard/9_FinalGenerationDocs")
);
const DocumentUpload = lazy(() => import("./wizard/10_DocumentUpload"));
const ExpertConsultation = lazy(() => import("./wizard/11_ExpertConsultation"));
const ApplicationStatusTracking = lazy(() =>
  import("./wizard/12_ApplicationStatusTracking")
);
const FinalConfirmationStep = lazy(() =>
  import("./wizard/13_FinalConfirmationStep")
);

/**
 * COMPANY REGISTRATION WIZARD
 */
function CompanyRegistrationWizard() {
  const { state, resetWizard } = useCompany();
  const { currentStep } = state;
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'application vient d'être chargée
  useEffect(() => {
    // Court délai pour assurer que tous les composants sont chargés
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // S'assurer que l'on commence toujours par l'étape 0 au premier chargement de la page
  useEffect(() => {
    // Vérifier si c'est le premier rendu et si on n'est pas sur l'étape 0
    if (
      !isLoading &&
      currentStep !== 0 &&
      !sessionStorage.getItem("wizardStarted")
    ) {
      console.log("First load, resetting to step 0");
      sessionStorage.setItem("wizardStarted", "true");
      // Réinitialiser uniquement l'étape courante, pas toutes les données
      state.currentStep = 0;
    }
  }, [isLoading, currentStep]);

  // Fonction pour réinitialiser complètement l'application
  const handleReset = () => {
    resetWizard();
    sessionStorage.removeItem("wizardStarted");
    window.location.reload();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WizardEntryPage />;
      case 1:
        return <PreQualificationForm />;
      case 2:
        return <CompanyBasicInfo />;
      case 3:
        return <CompanyNamingAndSocialPurpose />;
      case 4:
        return <CapitalContributionAndPartners />;
      case 5:
        return <CompanyHeadquartersAndDomiciliation />;
      case 6:
        return <FiscalAndSocialRegime />;
      case 7:
        return <ClosingDateAndInitialExercise />;
      case 8:
        return <ComplimentaryServices />;
      case 9:
        return <FinalReview />;
      case 10:
        return <FinalGenerationDocs />;
      case 11:
        return <DocumentUpload />;
      case 12:
        return <ExpertConsultation />;
      case 13:
        return <ApplicationStatusTracking />;
      case 14:
        return <FinalConfirmationStep />;
      default:
        return <WizardEntryPage />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">Initialisation du formulaire...</div>
    );
  }

  return (
    <Suspense fallback={<div className="p-4 text-center">Chargement...</div>}>
      <div className="max-w-5xl mx-auto p-4">
        {/* Bouton de réinitialisation - visible uniquement en développement ou avec paramètre */}
        {(process.env.NODE_ENV === "development" ||
          new URLSearchParams(window.location.search).get("debug") ===
            "true") && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleReset}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Réinitialiser le parcours
            </button>
          </div>
        )}

        <ProgressBar />
        {renderStep()}
      </div>
    </Suspense>
  );
}

export default CompanyRegistrationWizard;