// src/wizard/13_ApplicationStatusTracking.jsx

import React from "react";
import { useCompany } from "../CompanyContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
// import posthog from 'posthog-js'; // placeholder for tracking

/**
 * Step 13 of the wizard
 * ApplicationStatusTracking
 *
 * We keep all the original code (timeline, steps, etc.),
 * adding i18n and PostHog placeholders if needed.
 */

function ApplicationStatusTracking() {
  const { state } = useCompany(); // if needed
  const { t } = useTranslation();

  // No handleNext or handleBack functions in the original code,
  // so we don't remove anything.
  // posthog.capture("application_status_tracking_viewed"); // placeholder if needed

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <LanguageSwitcher />

      <h2 className="text-2xl font-semibold text-violet-700 mb-4">
        {t("DOSSIER_STATUS_TITLE", "Suivi de votre dossier")}
      </h2>

      {/* Timeline or list of steps: JAL publication, Court Registry, INPI, INSEE, etc. */}
      <ul className="list-disc ml-5 text-sm text-gray-700">
        <li>
          {t("PUBLICATION_JAL_LABEL", "Publication Journal d'annonces légales")}
        </li>
        <li>{t("GREFFE_DEPOSIT_LABEL", "Dépôt au greffe")}</li>
        <li>{t("INPI_VALIDATION_LABEL", "Validation INPI")}</li>
        <li>{t("INSEE_VALIDATION_LABEL", "Validation INSEE")}</li>
        <li>{t("NEXT_STEPS_LABEL", "... etc.")}</li>
      </ul>
    </div>
  );
}

export default ApplicationStatusTracking;
