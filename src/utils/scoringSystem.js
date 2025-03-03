// utils/scoringSystem.js
export const calculateCompanyScore = (companyData) => {
  let score = {
    companyTypeScore: 0,
    domiciliationScore: 0,
    businessPotentialScore: 0,
    servicesNeededScore: 0,
    totalScore: 0
  };
  
  // Évaluation du type de société
  if (companyData.step2?.companyType) {
    switch (companyData.step2.companyType) {
      case 'SAS':
      case 'SASU':
        score.companyTypeScore = 8;
        break;
      case 'SARL':
      case 'EURL':
        score.companyTypeScore = 6;
        break;
      case 'SA':
        score.companyTypeScore = 9;
        break;
      case 'SNC':
        score.companyTypeScore = 4;
        break;
      default:
        score.companyTypeScore = 3;
    }
  }
  
  // Évaluation de la domiciliation
  if (companyData.step5?.headquartersType) {
    switch (companyData.step5.headquartersType) {
      case 'koulier':
        score.domiciliationScore = 10;
        break;
      case 'commercial':
        score.domiciliationScore = 7;
        break;
      case 'personal':
        score.domiciliationScore = 4;
        break;
      default:
        score.domiciliationScore = 2;
    }
  }
  
  // Potentiel business basé sur le CA prévisionnel
  const turnover = parseFloat(companyData.step6?.turnoverEstimate || 0);
  if (turnover > 0) {
    if (turnover > 500000) score.businessPotentialScore = 10;
    else if (turnover > 200000) score.businessPotentialScore = 8;
    else if (turnover > 100000) score.businessPotentialScore = 6;
    else if (turnover > 50000) score.businessPotentialScore = 4;
    else score.businessPotentialScore = 2;
  }
  
  // Services complémentaires nécessaires
  const hasAccountingService = companyData.step8?.complementaryServices?.accounting;
  const hasBankingService = companyData.step8?.complementaryServices?.bankAccount;
  
  score.servicesNeededScore = (hasAccountingService ? 5 : 0) + (hasBankingService ? 5 : 0);
  
  // Score total (pondéré)
  score.totalScore = Math.round(
    (score.companyTypeScore * 0.3) + 
    (score.domiciliationScore * 0.3) + 
    (score.businessPotentialScore * 0.3) + 
    (score.servicesNeededScore * 0.1)
  );
  
  return score;
};

// Classification du client
export const classifyClient = (score) => {
  const totalScore = typeof score === 'object' ? score.totalScore : score;
  
  if (totalScore >= 8) return { tier: 'premium', label: 'Client Premium' };
  if (totalScore >= 6) return { tier: 'standard', label: 'Client Standard' };
  return { tier: 'basic', label: 'Client Basique' };
};

// Recommandations basées sur le score
export const getRecommendations = (score, companyData) => {
  const recommendations = [];
  
  // Recommendations basées sur le type d'entreprise
  if (companyData.step2?.companyType === 'SAS' || companyData.step2?.companyType === 'SASU') {
    recommendations.push({
      type: 'legal',
      text: 'Une assurance Responsabilité Civile Pro est fortement recommandée'
    });
  }
  
  // Recommendations basées sur le CA
  const turnover = parseFloat(companyData.step6?.turnoverEstimate || 0);
  if (turnover > 100000 && !companyData.step8?.complementaryServices?.accounting) {
    recommendations.push({
      type: 'accounting',
      text: 'Avec votre CA prévisionnel, un expert-comptable est vivement conseillé'
    });
  }
  
  // Recommendations basées sur la domiciliation
  if (companyData.step5?.headquartersType !== 'koulier' && (
    typeof score === 'object' ? score.totalScore : score) >= 7) {
    recommendations.push({
      type: 'domiciliation',
      text: 'Avec votre profil, une domiciliation Koulier serait plus adaptée'
    });
  }
  
  return recommendations;
};

// Obtenir les activités associées à la catégorie principale
export const getFilteredActivities = (activities, mainCategory) => {
  if (!mainCategory || mainCategory === '') {
    return activities;
  }
  
  return activities.filter(activity => {
    return activity.classification === mainCategory || 
           activity.category.toLowerCase().includes(mainCategory.toLowerCase());
  });
};

// Déterminer si une activité est adaptée à la domiciliation Koulier
export const isActivitySuitableForKoulier = (activity) => {
  if (!activity) return true;
  
  // Activités adaptées à la domiciliation Koulier (services principalement)
  if (activity.classification === 'Service' || 
      activity.category?.toLowerCase().includes('service')) {
    return true;
  }
  
  // Activités nécessitant généralement un local
  const needsPhysicalLocation = [
    'Commerce', 'Artisanat', 'Restauration', 'Fabrication',
    'Production', 'Industrie', 'Agriculture'
  ];
  
  for (const term of needsPhysicalLocation) {
    if (activity.classification === term || 
        activity.category?.toLowerCase().includes(term.toLowerCase())) {
      return false;
    }
  }
  
  return true;
};

// Obtenir des conseils de domiciliation adaptés à l'activité
export const getDomiciliationAdvice = (activity) => {
  if (!activity) return null;
  
  if (isActivitySuitableForKoulier(activity)) {
    return {
      recommended: 'koulier',
      reason: "Une domiciliation professionnelle est recommandée pour votre activité de services qui ne nécessite pas de local commercial."
    };
  }
  
  if (activity.classification === 'Commerce' || 
      activity.category?.toLowerCase().includes('commerce')) {
    return {
      recommended: 'commercial',
      reason: "Un local commercial est généralement nécessaire pour votre activité de commerce."
    };
  }
  
  if (activity.classification === 'Artisanat' || 
      activity.category?.toLowerCase().includes('artisan')) {
    return {
      recommended: 'commercial',
      reason: "Un atelier ou un local professionnel est généralement nécessaire pour votre activité artisanale."
    };
  }
  
  return null;
};