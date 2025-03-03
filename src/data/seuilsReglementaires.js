// src/data/seuilsReglementaires.js

/**
 * Liste des seuils réglementaires pour les entreprises françaises
 * Ces seuils sont classés par catégorie et contiennent les informations
 * nécessaires pour générer des alertes pertinentes
 */

const SEUILS = {
  // Seuils TVA
  TVA: [
    {
      id: "franchise-services",
      category: "TVA",
      regime: "franchise",
      activityType: "SERVICE",
      threshold: 34400,
      title: "Franchise en base de TVA (prestations de services)",
      warning:
        "Vous approchez du seuil de la franchise en base de TVA pour les prestations de services",
      description:
        "Au-delà de 34 400€ de CA annuel, vous devrez facturer la TVA à vos clients et la reverser à l'État. En contrepartie, vous pourrez déduire la TVA sur vos achats professionnels.",
      warningThreshold: 0.9, // Alerte à 90% du seuil
      criticalThreshold: 0.95, // Alerte critique à 95% du seuil
      link: "https://www.impots.gouv.fr/professionnel/tva",
    },
    {
      id: "franchise-commerce",
      category: "TVA",
      regime: "franchise",
      activityType: "COMMERCE",
      threshold: 85800,
      title: "Franchise en base de TVA (vente de marchandises)",
      warning:
        "Vous approchez du seuil de la franchise en base de TVA pour les ventes de marchandises",
      description:
        "Au-delà de 85 800€ de CA annuel, vous devrez facturer la TVA à vos clients et la reverser à l'État. En contrepartie, vous pourrez déduire la TVA sur vos achats professionnels.",
      warningThreshold: 0.9,
      criticalThreshold: 0.95,
      link: "https://www.impots.gouv.fr/professionnel/tva",
    },
    {
      id: "reel-simplifie",
      category: "TVA",
      regime: "realSimplified",
      activityType: "ALL",
      threshold: 247000,
      title: "Régime réel simplifié de TVA",
      warning: "Vous approchez du seuil du régime réel simplifié de TVA",
      description:
        "Au-delà de 247 000€ de CA annuel, vous devrez passer au régime réel normal de TVA, avec des déclarations mensuelles obligatoires.",
      warningThreshold: 0.9,
      criticalThreshold: 0.95,
      link: "https://www.impots.gouv.fr/professionnel/tva",
    },
  ],

  // Seuils micro-entreprise et micro-fiscal
  MICRO: [
    {
      id: "micro-bnc",
      category: "MICRO",
      threshold: 72600,
      title: "Régime micro-BNC",
      warning: "Vous approchez du plafond du régime micro-BNC",
      description:
        "Au-delà de 72 600€ de CA annuel, vous ne pourrez plus bénéficier du régime micro-BNC et devrez passer au régime de la déclaration contrôlée.",
      warningThreshold: 0.85,
      criticalThreshold: 0.95,
      link: "https://www.impots.gouv.fr/professionnel/benefices-non-commerciaux",
    },
    {
      id: "micro-bic-services",
      category: "MICRO",
      activityType: "SERVICE",
      threshold: 72600,
      title: "Régime micro-BIC (prestations de services)",
      warning:
        "Vous approchez du plafond du régime micro-BIC pour les prestations de services",
      description:
        "Au-delà de 72 600€ de CA annuel, vous ne pourrez plus bénéficier du régime micro-BIC et devrez passer au régime réel.",
      warningThreshold: 0.85,
      criticalThreshold: 0.95,
      link: "https://www.impots.gouv.fr/professionnel/benefices-industriels-et-commerciaux",
    },
    {
      id: "micro-bic-commerce",
      category: "MICRO",
      activityType: "COMMERCE",
      threshold: 176200,
      title: "Régime micro-BIC (vente de marchandises)",
      warning:
        "Vous approchez du plafond du régime micro-BIC pour les ventes de marchandises",
      description:
        "Au-delà de 176 200€ de CA annuel, vous ne pourrez plus bénéficier du régime micro-BIC et devrez passer au régime réel.",
      warningThreshold: 0.85,
      criticalThreshold: 0.95,
      link: "https://www.impots.gouv.fr/professionnel/benefices-industriels-et-commerciaux",
    },
  ],

  // Seuils liés aux obligations sociales
  SOCIAL: [
    {
      id: "cotisations-minimales",
      category: "SOCIAL",
      companyTypes: ["EURL", "SARL"],
      socialRegime: "TNS",
      threshold: 4731,
      title: "Seuil des cotisations minimales (TNS)",
      warning: "Attention au seuil des cotisations minimales pour TNS",
      description:
        "Même avec un revenu faible, vous serez redevable de cotisations sociales minimales d'environ 1 100€ par an.",
      warningThreshold: 1,
      criticalThreshold: 1,
      link: "https://www.urssaf.fr/portail/home/independant/mes-cotisations/quelles-cotisations.html",
    },
    {
      id: "reduction-debut-activite",
      category: "SOCIAL",
      companyTypes: ["ALL"],
      threshold: 0,
      title: "Exonération ACRE",
      warning: "Pensez à demander l'ACRE pour votre première année",
      description:
        "L'ACRE (Aide aux Créateurs et Repreneurs d'Entreprise) permet de bénéficier d'une exonération partielle des charges sociales durant la première année d'activité.",
      warningThreshold: 1,
      criticalThreshold: 1,
      link: "https://www.urssaf.fr/portail/home/independant/je-beneficie-dexonerations/accre.html",
    },
  ],

  // Seuils liés au bilan comptable
  COMPTABLE: [
    {
      id: "bilan-simplifie",
      category: "COMPTABLE",
      companyTypes: ["SAS", "SARL", "EURL", "SA"],
      threshold: 350000,
      title: "Bilan simplifié",
      warning: "Vous approchez du seuil pour un bilan simplifié",
      description:
        "Au-delà de 350 000€ de total bilan, vous ne pourrez plus déposer un bilan simplifié et devrez produire un bilan complet.",
      warningThreshold: 0.9,
      criticalThreshold: 0.98,
      link: "https://www.economie.gouv.fr/entreprises/obligations-comptables-pme",
    },
    {
      id: "commissaire-comptes",
      category: "COMPTABLE",
      companyTypes: ["SAS", "SASU"],
      threshold: 1000000,
      title: "Nomination d'un commissaire aux comptes",
      warning: "Vous approchez du seuil nécessitant un commissaire aux comptes",
      description:
        "Au-delà de 1 000 000€ de total bilan, vous devrez nommer un commissaire aux comptes pour certifier vos comptes annuels.",
      warningThreshold: 0.85,
      criticalThreshold: 0.95,
      link: "https://www.economie.gouv.fr/entreprises/commissaire-comptes",
    },
  ],

  // Seuils liés aux obligations d'embauche
  EMPLOI: [
    {
      id: "obligation-handicap",
      category: "EMPLOI",
      threshold: 20,
      title: "Obligation d'emploi de travailleurs handicapés",
      warning:
        "À l'approche de 20 salariés, vous serez soumis à l'obligation d'emploi de travailleurs handicapés",
      description:
        "Les entreprises d'au moins 20 salariés doivent employer des travailleurs handicapés dans une proportion de 6% de leur effectif total.",
      warningThreshold: 0.9,
      criticalThreshold: 1,
      link: "https://www.agefiph.fr/",
    },
    {
      id: "comite-social-economique",
      category: "EMPLOI",
      threshold: 11,
      title: "Mise en place du CSE",
      warning:
        "À l'approche de 11 salariés, vous devrez mettre en place un CSE",
      description:
        "Un Comité Social et Économique (CSE) doit être mis en place dans les entreprises d'au moins 11 salariés.",
      warningThreshold: 0.91,
      criticalThreshold: 1,
      link: "https://travail-emploi.gouv.fr/dialogue-social/le-comite-social-et-economique/",
    },
  ],
};

/**
 * Récupère tous les seuils applicables pour une entreprise donnée
 * @param {Object} companyData - Les données de l'entreprise
 * @returns {Array} - Liste des seuils applicables
 */
export const getApplicableSeuils = (companyData) => {
  const result = [];

  // Extraction des données pertinentes de l'entreprise
  const companyType = companyData.companyType || "SAS";
  const activityType = companyData.activityType || "SERVICE";
  const taxRegime = companyData.taxRegime || "IS";
  const vatRegime = companyData.vatRegime || "franchise";
  const socialRegime = companyData.socialRegime || "TNS";
  const turnover = parseInt(companyData.turnover || 0);
  const employeesCount = parseInt(companyData.employeesCount || 0);

  // Parcourir toutes les catégories de seuils
  Object.keys(SEUILS).forEach((category) => {
    SEUILS[category].forEach((seuil) => {
      // Vérifier si le seuil est applicable à ce type d'entreprise
      const isCompanyTypeMatch =
        !seuil.companyTypes ||
        seuil.companyTypes.includes(companyType) ||
        seuil.companyTypes.includes("ALL");

      // Vérifier si le seuil est applicable à ce type d'activité
      const isActivityTypeMatch =
        !seuil.activityType ||
        seuil.activityType === activityType ||
        seuil.activityType === "ALL";

      // Vérifier si le seuil est applicable à ce régime fiscal/TVA/social
      const isTaxRegimeMatch =
        !seuil.taxRegime || seuil.taxRegime === taxRegime;
      const isVatRegimeMatch = !seuil.regime || seuil.regime === vatRegime;
      const isSocialRegimeMatch =
        !seuil.socialRegime || seuil.socialRegime === socialRegime;

      // Si tous les critères sont validés, ajouter ce seuil à la liste
      if (
        isCompanyTypeMatch &&
        isActivityTypeMatch &&
        isTaxRegimeMatch &&
        isVatRegimeMatch &&
        isSocialRegimeMatch
      ) {
        result.push(seuil);
      }
    });
  });

  return result;
};

/**
 * Vérifie si la valeur approche ou dépasse un seuil
 * @param {Number} value - Valeur à comparer (ex: CA)
 * @param {Object} seuil - Objet seuil
 * @returns {Object|null} - Informations sur l'alerte ou null si aucune alerte
 */
export const checkSeuil = (value, seuil) => {
  const ratio = value / seuil.threshold;

  if (ratio >= seuil.criticalThreshold) {
    return {
      id: seuil.id,
      title: seuil.title,
      message: seuil.warning,
      description: seuil.description,
      severity: "critical",
      link: seuil.link,
      ratio: ratio,
    };
  } else if (ratio >= seuil.warningThreshold) {
    return {
      id: seuil.id,
      title: seuil.title,
      message: seuil.warning,
      description: seuil.description,
      severity: "warning",
      link: seuil.link,
      ratio: ratio,
    };
  }

  return null;
};

/**
 * Génère toutes les alertes de seuils pour une entreprise
 * @param {Object} companyData - Les données de l'entreprise
 * @returns {Array} - Liste des alertes de seuils
 */
export const getSeuilAlerts = (companyData) => {
  const applicableSeuils = getApplicableSeuils(companyData);
  const alerts = [];

  applicableSeuils.forEach((seuil) => {
    let valueToCheck = 0;

    // Déterminer quelle valeur vérifier selon la catégorie du seuil
    switch (seuil.category) {
      case "TVA":
      case "MICRO":
        valueToCheck = parseInt(companyData.turnover || 0);
        break;
      case "EMPLOI":
        valueToCheck = parseInt(companyData.employeesCount || 0);
        break;
      case "COMPTABLE":
        valueToCheck = parseInt(companyData.totalBilan || 0);
        break;
      default:
        valueToCheck = parseInt(companyData.turnover || 0);
    }

    const alert = checkSeuil(valueToCheck, seuil);
    if (alert) {
      alerts.push(alert);
    }
  });

  return alerts;
};

/**
 * Identifie les seuils réglementaires approchants pour une entreprise
 * Cette fonction est utilisée par CompanyRegistrationWizard.jsx
 * @param {Object} companyData - Les données de l'entreprise
 * @returns {Array} - Liste des seuils identifiés
 */
export const identifyThresholds = (companyData) => {
  // Déterminer le type d'activité (SERVICE ou COMMERCE)
  const activityType = companyData.activity?.toLowerCase().includes("commerce")
    ? "COMMERCE"
    : "SERVICE";

  // Préparer les données pour la vérification
  const formattedData = {
    companyType: companyData.companyType || "SAS",
    activityType: activityType,
    turnover: parseFloat(companyData.turnover) || 0,
    employeesCount: companyData.employeesCount || 0,
    totalBilan: parseFloat(companyData.turnover) * 0.8 || 0, // Estimation grossière
  };

  // Utiliser getSeuilAlerts pour identifier les seuils
  return getSeuilAlerts(formattedData);
};

export default SEUILS;
