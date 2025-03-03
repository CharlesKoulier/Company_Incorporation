// src/helpers/simulationEngine.js

/**
 * Moteur de calcul pour les simulations fiscales et sociales
 * Permet d'estimer les charges et impôts en fonction des paramètres de l'entreprise
 */

/**
 * Calcule les impôts et taxes applicables
 * @param {Object} params - Paramètres de calcul
 * @returns {Object} - Détail des taxes calculées
 */
export const calculateTaxes = (params) => {
  const { turnover, expenses, salary, companyType, taxRegime, vatRegime } = params;
  
  // Calcul du résultat avant impôt
  const grossProfit = turnover - expenses - (taxRegime === 'IS' ? salary : 0);
  
  // Détail des taxes à payer
  const taxDetails = {
    is: 0,         // Impôt sur les sociétés
    ir: 0,         // Impôt sur le revenu (part professionnelle)
    cfe: 0,        // Contribution foncière des entreprises
    cvae: 0,       // Cotisation sur la valeur ajoutée des entreprises
    taxeApprentissage: 0, // Taxe d'apprentissage
    formationContinue: 0  // Formation continue
  };
  
  // 1. Calcul de l'IS (si applicable)
  if (taxRegime === 'IS') {
    // Taux d'IS actuel: 15% jusqu'à 42 500€, 25% au-delà
    if (grossProfit <= 42500) {
      taxDetails.is = grossProfit * 0.15;
    } else {
      taxDetails.is = 42500 * 0.15 + (grossProfit - 42500) * 0.25;
    }
  }
  
  // 2. Calcul de l'IR (si applicable)
  if (taxRegime === 'IR') {
    // Simulation simplifiée, taux moyen estimé à 20% - à adapter selon situation personnelle
    taxDetails.ir = grossProfit * 0.2;
  }
  
  // 3. CFE - estimation forfaitaire, varie selon localité et superficie
  taxDetails.cfe = Math.min(1000, Math.max(200, turnover * 0.005));
  
  // 4. CVAE - applicable uniquement si CA > 500 000€
  if (turnover > 500000) {
    taxDetails.cvae = Math.max(0, turnover * 0.005);
  }
  
  // 5. Taxe d'apprentissage et formation continue - si employeur
  if (companyType !== 'EI' && companyType !== 'EIRL') {
    taxDetails.taxeApprentissage = salary * 0.0068;
    taxDetails.formationContinue = salary * 0.01;
  }
  
  // Total des taxes
  const totalTaxes = Object.values(taxDetails).reduce((sum, tax) => sum + tax, 0);
  
  return {
    totalTaxes: Math.round(totalTaxes),
    details: {
      isOuIr: Math.round(taxDetails.is + taxDetails.ir),
      cfe: Math.round(taxDetails.cfe),
      cvae: Math.round(taxDetails.cvae),
      taxeApprentissage: Math.round(taxDetails.taxeApprentissage),
      formationContinue: Math.round(taxDetails.formationContinue)
    }
  };
};

/**
 * Calcule les charges sociales applicables
 * @param {Object} params - Paramètres de calcul
 * @returns {Object} - Détail des charges sociales
 */
export const calculateSocialCharges = (params) => {
  const { salary, companyType, socialRegime, taxRegime } = params;
  
  // Détail des charges sociales
  const chargesDetails = {
    maladie: 0,        // Assurance maladie
    retraite: 0,       // Retraite base + complémentaire
    allocationsFamiliales: 0, // Allocations familiales
    csg: 0,            // CSG/CRDS
    formationPro: 0,   // Formation professionnelle
    autres: 0          // Autres charges (prévoyance, etc.)
  };
  
  // Calcul selon le régime social
  if (socialRegime === 'TNS') {
    // Travailleur non salarié - taux approximatifs, à adapter selon situation
    // Base de calcul : revenus professionnels (= bénéfice)
    let baseCalcul = salary;
    
    if (taxRegime === 'IR') {
      // Pour les TNS à l'IR, les charges sont calculées sur le bénéfice
      baseCalcul = salary;
    }
    
    // Estimation globale des charges TNS (environ 40-45% du revenu)
    chargesDetails.maladie = baseCalcul * 0.06;  // Environ 6%
    chargesDetails.retraite = baseCalcul * 0.17; // Base + complémentaire environ 17%
    chargesDetails.allocationsFamiliales = baseCalcul * 0.03; // Environ 3%
    chargesDetails.csg = baseCalcul * 0.095; // CSG/CRDS environ 9.5%
    chargesDetails.formationPro = Math.min(baseCalcul * 0.001, 400); // 0.1% plafonné
    chargesDetails.autres = baseCalcul * 0.04; // Prévoyance, invalidité-décès, etc.
  } else if (socialRegime === 'assimile') {
    // Assimilé salarié (SAS/SASU) - taux approximatifs 
    // Charges patronales pour les dirigeants assimilés salariés environ 60-65% du salaire brut
    chargesDetails.maladie = salary * 0.13; // Environ 13%
    chargesDetails.retraite = salary * 0.20; // Base + complémentaire + Agirc-Arrco
    chargesDetails.allocationsFamiliales = salary * 0.035; // Environ 3.5%
    chargesDetails.csg = salary * 0.095; // CSG/CRDS
    chargesDetails.formationPro = salary * 0.015; // Environ 1.5%
    chargesDetails.autres = salary * 0.14; // Autres (chômage, prévoyance, accident du travail...)
  } else {
    // Par défaut, on estime un taux global de 45%
    chargesDetails.maladie = salary * 0.10;
    chargesDetails.retraite = salary * 0.15;
    chargesDetails.allocationsFamiliales = salary * 0.03;
    chargesDetails.csg = salary * 0.095;
    chargesDetails.formationPro = salary * 0.01;
    chargesDetails.autres = salary * 0.065;
  }
  
  // Total des charges sociales
  const totalCharges = Object.values(chargesDetails).reduce((sum, charge) => sum + charge, 0);
  
  return {
    totalCharges: Math.round(totalCharges),
    details: {
      maladie: Math.round(chargesDetails.maladie),
      retraite: Math.round(chargesDetails.retraite),
      allocationsFamiliales: Math.round(chargesDetails.allocationsFamiliales),
      csg: Math.round(chargesDetails.csg),
      formationPro: Math.round(chargesDetails.formationPro),
      autres: Math.round(chargesDetails.autres)
    }
  };
};

/**
 * Retourne les responsabilités légales en fonction du type d'entreprise
 * @param {String} companyType - Type d'entreprise
 * @returns {Array} - Liste des responsabilités légales
 */
export const getLegalResponsibilities = (companyType) => {
  const commonResponsibilities = [
    "Établir et déposer les déclarations fiscales et sociales dans les délais",
    "Tenir une comptabilité conforme aux principes comptables",
    "Conserver les documents légaux pendant les durées légales",
    "Respecter les obligations en matière de facturation"
  ];
  
  // Responsabilités spécifiques par type d'entreprise
  const specificResponsibilities = {
    'SAS': [
      "Tenir annuellement une assemblée générale d'approbation des comptes",
      "Déposer les comptes annuels au greffe du tribunal de commerce",
      "Prendre les décisions importantes selon les règles statutaires",
      "Mettre à jour le registre des mouvements de titres"
    ],
    'SASU': [
      "Approuver annuellement les comptes",
      "Déposer les comptes annuels au greffe du tribunal de commerce",
      "Mettre à jour le registre des décisions de l'associé unique",
      "Respecter les règles de conventions réglementées"
    ],
    'SARL': [
      "Tenir annuellement une assemblée générale d'approbation des comptes",
      "Déposer les comptes annuels au greffe du tribunal de commerce",
      "Respect du quorum et des majorités pour les assemblées",
      "Tenir à jour le registre des parts sociales"
    ],
    'EURL': [
      "Approuver annuellement les comptes",
      "Déposer les comptes annuels au greffe du tribunal de commerce",
      "Tenir à jour le registre des décisions de l'associé unique",
      "Distinguer les actes de gestion des actes patrimoniaux"
    ],
    'EI': [
      "Séparer les comptes professionnels et personnels",
      "Déclarer son résultat avec sa déclaration de revenus personnelle",
      "Effectuer les déclarations sociales auprès du SSI"
    ],
    'SA': [
      "Tenir les réunions obligatoires du conseil d'administration",
      "Tenir l'assemblée générale annuelle dans les délais légaux",
      "Respecter les règles de quorum et de majorité",
      "Faire certifier les comptes par un commissaire aux comptes",
      "Déposer les comptes annuels au greffe du tribunal de commerce"
    ]
  };
  
  // Ajouter les responsabilités spécifiques si elles existent
  const allResponsibilities = [...commonResponsibilities];
  
  if (specificResponsibilities[companyType]) {
    allResponsibilities.push(...specificResponsibilities[companyType]);
  }
  
  return allResponsibilities;
};