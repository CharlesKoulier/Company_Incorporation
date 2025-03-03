/**
 * Analyse le type d'activité et retourne sa catégorie
 */
const analyzeActivity = (activity) => {
  const CATEGORIES = {
    COMMERCIAL: [
      "commerce",
      "vente",
      "négoce",
      "distribution",
      "import",
      "export",
      "restaurant",
    ],
    SERVICE: ["service", "conseil", "consulting", "formation", "développement"],
    ARTISANAL: ["artisan", "fabrication", "production", "réparation"],
    LIBERAL: ["santé", "médical", "juridique", "expert"],
  };

  const activityLower = activity.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((keyword) => activityLower.includes(keyword))) {
      return category;
    }
  }

  return "SERVICE"; // Catégorie par défaut
};

/**
 * Analyse la structure de gouvernance
 */
const analyzeGovernance = (partners) => {
  if (!partners || partners.length === 0) {
    return {
      type: "SINGLE",
      hasMultiplePartners: false,
      hasMajorityShareholder: false,
    };
  }

  const totalShares = partners.reduce(
    (sum, partner) => sum + Number(partner.shares || 0),
    0
  );
  const hasMajorityShareholder = partners.some(
    (partner) => Number(partner.shares || 0) / totalShares > 0.5
  );

  return {
    type: partners.length > 1 ? "MULTIPLE" : "SINGLE",
    hasMultiplePartners: partners.length > 1,
    hasMajorityShareholder,
  };
};

/**
 * Analyse le type de domiciliation
 */
const analyzeDomiciliation = (headquarters) => {
  if (!headquarters) return "UNKNOWN";

  if (headquarters.domiciliationContract) {
    return "COMMERCIAL";
  }

  if (headquarters.ownerAuthorization) {
    return "PERSONAL";
  }

  return headquarters.headquartersType || "UNKNOWN";
};

/**
 * Détermine le régime fiscal recommandé
 */
const getTaxRegimeRecommendation = (
  companyType,
  governance,
  estimatedTurnover
) => {
  // Cas où l'IS est obligatoire
  const isRequired = ["SAS", "SASU", "SA"].includes(companyType);

  if (isRequired) {
    return {
      regime: "IS",
      explanation:
        "L'Impôt sur les Sociétés (IS) est obligatoire pour votre forme juridique.",
      isForced: true,
    };
  }

  // Recommandation basée sur le CA et la gouvernance
  const shouldRecommendIS =
    estimatedTurnover > 80000 ||
    governance.hasMultiplePartners ||
    governance.hasMajorityShareholder;

  return {
    regime: shouldRecommendIS ? "IS" : "IR",
    explanation: shouldRecommendIS
      ? "L'IS est recommandé vu votre CA prévisionnel et/ou structure de gouvernance."
      : "L'IR est adapté à votre situation, mais vous pouvez opter pour l'IS.",
    isForced: false,
  };
};

/**
 * Détermine le régime de TVA recommandé
 */
const getVATRegimeRecommendation = (
  activityCategory,
  domiciliation,
  estimatedTurnover
) => {
  // Seuils de franchise en base
  const THRESHOLDS = {
    SERVICE: 34400,
    COMMERCIAL: 85800,
  };

  const threshold =
    activityCategory === "COMMERCIAL"
      ? THRESHOLDS.COMMERCIAL
      : THRESHOLDS.SERVICE;

  if (estimatedTurnover <= threshold) {
    return {
      regime: "franchise",
      periodicity: "monthly",
      explanation: "Vous êtes éligible à la franchise en base de TVA.",
      isForced: false,
    };
  }

  if (estimatedTurnover <= 247000) {
    return {
      regime: "realSimplified",
      periodicity: "quarterly",
      explanation:
        "Le régime réel simplifié est adapté à votre niveau d'activité.",
      isForced: false,
    };
  }

  return {
    regime: "realNormal",
    periodicity: "monthly",
    explanation:
      "Le régime réel normal est obligatoire vu votre CA prévisionnel.",
    isForced: true,
  };
};

/**
 * Détermine le régime social recommandé
 */
const getSocialRegimeRecommendation = (companyType, governance) => {
  const isAssimileSalarieRequired =
    ["SAS", "SASU", "SA"].includes(companyType) &&
    governance.hasMajorityShareholder;

  if (isAssimileSalarieRequired) {
    return {
      regime: "assimile",
      explanation:
        "Le statut assimilé-salarié est obligatoire pour les dirigeants majoritaires de SAS/SASU.",
      isForced: true,
    };
  }

  return {
    regime: "TNS",
    explanation: "Le statut TNS est recommandé pour votre situation.",
    isForced: false,
  };
};

/**
 * Génère l'ensemble des recommandations fiscales et sociales
 */
export const getRecommendations = (data) => {
  try {
    const { companyType, activity, partners, headquarters, estimatedTurnover } =
      data;

    // Analyses préliminaires
    const activityCategory = analyzeActivity(activity);
    const governance = analyzeGovernance(partners);
    const domiciliation = analyzeDomiciliation(headquarters);

    // Génération des recommandations
    const taxRegime = getTaxRegimeRecommendation(
      companyType,
      governance,
      estimatedTurnover
    );
    const vatRegime = getVATRegimeRecommendation(
      activityCategory,
      domiciliation,
      estimatedTurnover
    );
    const socialRegime = getSocialRegimeRecommendation(companyType, governance);

    // Message de synthèse
    const summary = {
      message:
        `Recommandations basées sur votre CA prévisionnel de ${estimatedTurnover}€ ` +
        `et votre activité de type ${activityCategory.toLowerCase()}.`,
    };

    return {
      taxRegime,
      vatRegime,
      socialRegime,
      summary,
    };
  } catch (error) {
    console.error("Error in getRecommendations:", error);
    // Retourne des valeurs par défaut en cas d'erreur
    return {
      taxRegime: {
        regime: "IR",
        explanation:
          "Régime par défaut - une erreur est survenue lors de l'analyse.",
        isForced: false,
      },
      vatRegime: {
        regime: "franchise",
        periodicity: "monthly",
        explanation:
          "Régime par défaut - une erreur est survenue lors de l'analyse.",
        isForced: false,
      },
      socialRegime: {
        regime: "TNS",
        explanation:
          "Régime par défaut - une erreur est survenue lors de l'analyse.",
        isForced: false,
      },
      summary: {
        message:
          "Une erreur est survenue lors de la génération des recommandations.",
      },
    };
  }
};
