// src/App.jsx

import React from "react";
import { useCompany } from "./CompanyContext";
import CompanyRegistrationWizard from "./CompanyRegistrationWizard";
// NOTE: l'import de WizardEntryPageWrapper n'est pas direct,
// mais on garde le code existant tel quel.
// On ne supprime pas la logique existante.

/**
 * Composants internes
 */
function WizardEntryPageWrapper() {
  const { setCurrentStep } = useCompany();
  const PreQualificationForm =
    require("./wizard/0_PreQualificationForm").default;
  return <PreQualificationForm />;
}

function CompanyCreationFormWrapper() {
  const CompanyCreationForm = require("./form-preview").default;
  return <CompanyCreationForm />;
}

/**
 * Composant MainApp
 * Conserve la logique :
 *  - state.currentStep === 0 => wizard entry
 *  - sinon, company creation form
 */
function MainApp() {
  const { state } = useCompany();
  return state.currentStep === 0 ? (
    <WizardEntryPageWrapper />
  ) : (
    <CompanyCreationFormWrapper />
  );
}

/**
 * App
 * Rend le wizard complet
 */
const App = () => {
  // posthog.capture("app_rendered"); // placeholder potentiel
  return <CompanyRegistrationWizard />;
};

export default App;
