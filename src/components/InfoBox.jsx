// src/components/InfoBox.jsx

import React from "react";
import { useTranslation } from "react-i18next";

const infoData = {
  SAS: {
    advantages: [
      "Flexibilité statutaire",
      "Capital libre",
      "Président assimilé salarié (protection sociale)",
    ],
    inconvenients: [
      "Charges sociales plus élevées qu’en TNS",
      "Formalités de rédaction de statuts",
    ],
  },
  SARL: {
    advantages: [
      "Statut TNS (cotisations moins chères)",
      "Cadre juridique stable",
    ],
    inconvenients: [
      "Responsabilité limitée mais plus stricte qu’une SAS",
      "Moins de flexibilité dans la rédaction des statuts",
    ],
  },
  "micro-entreprise": {
    advantages: ["Formalités simplifiées", "Pas de TVA si CA < seuils"],
    inconvenients: [
      "Plafond de CA restreint",
      "Moins crédible pour certains partenaires",
    ],
  },
  // ...
};

function InfoBox({ companyType }) {
  const data = infoData[companyType];
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <div className="p-4 border rounded bg-violet-50 border-violet-100">
      <h3 className="text-md font-semibold text-violet-800 mb-2">
        {t("ADVANTAGES_INCONVENIENTS_OF", "Avantages et Inconvénients de")} {companyType}
      </h3>
      <p className="text-sm text-violet-700 font-medium">
        {t("ADVANTAGES", "Avantages")} :
      </p>
      <ul className="list-disc ml-5 mb-2 text-sm text-gray-700">
        {data.advantages.map((adv, i) => (
          <li key={i}>{adv}</li>
        ))}
      </ul>
      {data.inconvenients.length > 0 && (
        <>
          <p className="text-sm text-violet-700 font-medium">
            {t("INCONVENIENTS", "Inconvénients")} :
          </p>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {data.inconvenients.map((inc, i) => (
              <li key={i}>{inc}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default InfoBox;