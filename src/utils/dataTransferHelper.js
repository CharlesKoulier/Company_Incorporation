// src/utils/dataTransferHelper.js

/**
 * Utilitaire pour transférer les données entre les étapes du formulaire
 * Permet de pré-remplir les formulaires d'une étape à partir des données
 * collectées lors des étapes précédentes
 */

/**
 * Transfère les données de préqualification vers les étapes suivantes
 * @param {Object} prequalData - Données de l'étape de préqualification
 * @returns {Object} - Données formatées pour chaque étape ultérieure
 */
export const transferPrequalDataToSteps = (prequalData) => {
  const data = {
    step2: {}, // CompanyBasicInfo
    step3: {}, // CompanyNamingAndSocialPurpose
    step4: {}, // CapitalContributionAndPartners
    step5: {}, // CompanyHeadquartersAndDomiciliation
    step6: {}, // FiscalAndSocialRegime
    step7: {}, // ClosingDateAndInitialExercise
    step8: {}, // ComplimentaryServices
  };

  // Step 2: Infos basiques d'entreprise
  if (prequalData.creationMode) {
    data.step2.numberOfPartners =
      prequalData.creationMode === "alone"
        ? "1"
        : prequalData.exactPartners || "2";
  }

  if (prequalData.patrimoineProtection) {
    // Suggérer le type d'entreprise en fonction du niveau de protection patrimoniale
    if (prequalData.creationMode === "alone") {
      data.step2.companyType =
        prequalData.patrimoineProtection === "high" ? "SASU" : "EURL";
    } else {
      data.step2.companyType =
        prequalData.patrimoineProtection === "high" ? "SAS" : "SARL";
    }
  }

  if (prequalData.activityType) {
    data.step2.activityCategory = prequalData.activityType;
  }

  if (prequalData.mainActivity) {
    data.step2.activity = prequalData.mainActivity;
  }

  // Step 3: Nommage et objet social
  if (prequalData.mainActivity) {
    // Générer un objet social basé sur l'activité principale
    data.step3.socialPurpose = generateSocialPurpose(prequalData.mainActivity);
  }

  if (prequalData.startDate) {
    // Convertir la préférence de date de début en date réelle
    data.step3.startDate = convertStartDatePreference(prequalData.startDate);
  }

  // Step 4: Capital et associés
  if (prequalData.initialInvestment) {
    data.step4.capitalAmount = prequalData.initialInvestment;
  }

  if (prequalData.creationMode && prequalData.exactPartners) {
    data.step4.partners = generatePartnersArray(
      prequalData.creationMode === "alone"
        ? 1
        : parseInt(prequalData.exactPartners, 10),
      data.step2.companyType
    );
  }

  // Step 5: Domiciliation
  // Si c'est une activité de service, suggérer Koulier, sinon local commercial
  if (prequalData.activityType) {
    data.step5.headquartersType =
      prequalData.activityType === "SERVICE" ? "koulier" : "commercial";

    // Pour Koulier, pré-remplir l'adresse
    if (data.step5.headquartersType === "koulier") {
      data.step5.address = "44 rue Pasquier";
      data.step5.postalCode = "75008";
      data.step5.city = "Paris";
    }
  }

  // Step 6: Régimes fiscal et social
  if (prequalData.projectedRevenue) {
    data.step6.turnoverEstimate = prequalData.projectedRevenue;

    // Suggérer le régime fiscal
    if (
      parseInt(prequalData.projectedRevenue, 10) > 85000 ||
      (data.step2.companyType &&
        ["SAS", "SASU"].includes(data.step2.companyType))
    ) {
      data.step6.taxRegime = "IS";
    } else {
      data.step6.taxRegime = "IR";
    }

    // Suggérer le régime TVA
    if (parseInt(prequalData.projectedRevenue, 10) < 35000) {
      data.step6.vatRegime = "franchise";
    } else {
      data.step6.vatRegime = "realSimplified";
    }

    // Suggérer le régime social
    if (
      data.step2.companyType &&
      ["SAS", "SASU"].includes(data.step2.companyType)
    ) {
      data.step6.socialRegime = "assimile";
    } else {
      data.step6.socialRegime = "TNS";
    }
  }

  // Step 7: Date de clôture
  if (prequalData.startDate) {
    data.step7.startDate = convertStartDatePreference(prequalData.startDate);
    data.step7.closingMonth = "12";
    data.step7.closingDay = "31";

    // Déterminer si un exercice long est recommandé
    const startDate = new Date(data.step7.startDate);
    const month = startDate.getMonth();
    data.step7.exerciseType = month >= 9 ? "long" : "standard"; // Si dernier trimestre, exercice long
  }

  // Step 8: Services complémentaires
  if (prequalData.fundingSource) {
    data.step8.complementaryServices = {};

    if (prequalData.fundingSource === "bank") {
      data.step8.complementaryServices.bankAccount = "shine";
    }

    if (parseInt(prequalData.projectedRevenue, 10) > 50000) {
      data.step8.complementaryServices.accounting = "captaincompta";
    } else if (parseInt(prequalData.projectedRevenue, 10) > 30000) {
      data.step8.complementaryServices.accounting = "placedesexperts";
    }
  }

  return data;
};

/**
 * Génère un objet social basé sur l'activité principale
 * @param {string} activity - L'activité principale
 * @returns {string} - L'objet social suggéré
 */
function generateSocialPurpose(activity) {
  if (!activity) return "";

  return `Objet principal : ${activity}

Autres activités : Toutes activités connexes ou complémentaires pouvant se rattacher directement ou indirectement à l'objet social.
Import, export, achat, vente, distribution de tous produits non réglementés liés à l'activité principale.
Conseil, formation et assistance dans les domaines liés à l'objet social.
Et plus généralement, toutes opérations industrielles, commerciales, financières, mobilières ou immobilières, se rapportant directement ou indirectement à l'objet social.`;
}

/**
 * Convertit une préférence de date de début en date réelle
 * @param {string} preference - La préférence (immediate, 3months, 6months)
 * @returns {string} - La date au format YYYY-MM-DD
 */
function convertStartDatePreference(preference) {
  const today = new Date();

  switch (preference) {
    case "immediate":
      return today.toISOString().split("T")[0];
    case "3months":
      today.setMonth(today.getMonth() + 3);
      return today.toISOString().split("T")[0];
    case "6months":
      today.setMonth(today.getMonth() + 6);
      return today.toISOString().split("T")[0];
    default:
      // Si c'est déjà une date au format YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(preference)) {
        return preference;
      }
      return today.toISOString().split("T")[0];
  }
}

/**
 * Génère un tableau d'associés avec les bons rôles selon le type d'entreprise
 * @param {number} count - Nombre d'associés
 * @param {string} companyType - Type d'entreprise (SAS, SARL, etc.)
 * @returns {Array} - Tableau d'associés pré-configurés
 */
function generatePartnersArray(count, companyType) {
  const partners = [];

  for (let i = 0; i < count; i++) {
    let defaultRole = "associe";

    // Le premier associé prend le rôle principal selon le type d'entreprise
    if (i === 0) {
      if (["EURL", "SARL"].includes(companyType)) {
        defaultRole = "gerant";
      } else if (["SASU", "SAS"].includes(companyType)) {
        defaultRole = "president";
      } else if (companyType === "SA") {
        defaultRole = "president_ca";
      }
    }

    partners.push({
      firstName: "",
      lastName: "",
      birthDate: "",
      birthPlace: "",
      nationality: "Française",
      capitalContribution: "",
      contributionType: "numeraire",
      role: defaultRole,
      sharePercentage: (100 / count).toFixed(2),
    });
  }

  return partners;
}

/**
 * Applique les données d'une étape à l'autre pour compléter les informations manquantes
 * @param {Object} state - État global
 * @returns {Object} - État mis à jour
 */
export const applyDataAcrossSteps = (state) => {
  const newState = { ...state };

  // Si on a défini une adresse à l'étape 5, l'utiliser pour les partenaires à l'étape 4
  if (
    newState.step5 &&
    newState.step5.address &&
    newState.step4 &&
    newState.step4.partners
  ) {
    const address = `${newState.step5.address}, ${newState.step5.postalCode} ${newState.step5.city}`;

    newState.step4.partners = newState.step4.partners.map((partner) => {
      if (!partner.address) {
        return { ...partner, address };
      }
      return partner;
    });
  }

  // Si on a défini une date de début à l'étape 3, l'utiliser à l'étape 7
  if (newState.step3 && newState.step3.startDate && newState.step7) {
    newState.step7.startDate =
      newState.step7.startDate || newState.step3.startDate;
  }

  return newState;
};
