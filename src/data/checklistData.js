// src/data/checklistData.js

/**
 * Fonction pour obtenir la liste des éléments de la check-list
 * en fonction du profil de l'entreprise.
 * 
 * @param {Object} companyProfile - Profil de l'entreprise
 * @returns {Array} Liste des catégories avec leurs éléments
 */
export const getChecklistItems = (companyProfile) => {
  const { companyType, activity, headquartersType, hasEmployees } = companyProfile;
  
  // Éléments administratifs (communs à toutes les entreprises)
  const administrativeItems = {
    id: 'administrative',
    title: 'Démarches administratives',
    items: [
      {
        id: 'open_bank_account',
        title: 'Ouvrir un compte bancaire professionnel',
        description: 'Obligatoire pour les sociétés et recommandé pour les entreprises individuelles',
        timeframe: 'immediate',
        link: { 
          text: 'Comparer les offres bancaires', 
          url: 'https://entreprendre.service-public.fr/vosdroits/F31204' 
        }
      },
      {
        id: 'deposit_capital',
        title: 'Déposer le capital social',
        description: 'Effectuer le dépôt du capital social sur le compte bancaire professionnel',
        timeframe: 'immediate'
      },
      {
        id: 'register_company',
        title: 'Immatriculer l\'entreprise',
        description: 'Effectuer les démarches d\'immatriculation auprès du CFE compétent',
        timeframe: 'immediate',
        link: { 
          text: 'En savoir plus sur l\'immatriculation', 
          url: 'https://www.infogreffe.fr/formalites-entreprise/immatriculation-entreprise.html' 
        }
      },
      {
        id: 'get_kbis',
        title: 'Obtenir un extrait Kbis',
        description: 'Document officiel attestant l\'existence juridique de l\'entreprise',
        timeframe: 'first-week'
      },
      {
        id: 'declare_beneficial_owners',
        title: 'Déclarer les bénéficiaires effectifs',
        description: 'Obligatoire pour toutes les sociétés commerciales depuis 2018',
        timeframe: 'first-week'
      },
      {
        id: 'register_tax_center',
        title: 'S\'enregistrer auprès du centre des impôts',
        description: 'Déclarer l\'existence de votre entreprise auprès de l\'administration fiscale',
        timeframe: 'first-week'
      }
    ]
  };

  // Éléments fiscaux
  const taxItems = {
    id: 'tax',
    title: 'Fiscalité et comptabilité',
    items: [
      {
        id: 'accounting_setup',
        title: 'Mettre en place une comptabilité',
        description: companyType === 'EURL' || companyType === 'SARL' || companyType === 'SAS' || companyType === 'SASU' || companyType === 'SA' 
          ? 'Obligation de tenir une comptabilité complète (plan comptable général)'
          : 'Tenir un livre des recettes et un registre des achats',
        timeframe: 'immediate'
      },
      {
        id: 'choose_accounting_software',
        title: 'Choisir un logiciel de comptabilité',
        description: 'Sélectionner une solution adaptée à vos besoins et à la taille de votre entreprise',
        timeframe: 'first-week',
        link: {
          text: 'Comparatif des logiciels de comptabilité',
          url: 'https://www.captaincontrat.com/articles-gestion-entreprise/logiciels-comptabilite'
        }
      },
      {
        id: 'setup_invoice_system',
        title: 'Mettre en place un système de facturation',
        description: 'Créer des modèles de factures conformes à la législation en vigueur',
        timeframe: 'first-week'
      },
      {
        id: 'tax_calendar',
        title: 'Établir un calendrier fiscal',
        description: 'Identifier les échéances fiscales à respecter (TVA, IS/IR, CFE, etc.)',
        timeframe: 'first-month'
      }
    ]
  };

  // Éléments d'assurance
  const insuranceItems = {
    id: 'insurance',
    title: 'Assurances et protection',
    items: [
      {
        id: 'professional_liability',
        title: 'Souscrire une assurance responsabilité civile professionnelle',
        description: 'Protège contre les dommages causés aux tiers dans le cadre de votre activité',
        timeframe: 'first-week',
        link: {
          text: 'En savoir plus sur la RC Pro',
          url: 'https://www.economie.gouv.fr/entreprises/assurance-responsabilite-civile-professionnelle'
        }
      }
    ]
  };

  // Éléments spécifiques selon le local
  if (headquartersType === 'commercial') {
    insuranceItems.items.push(
      {
        id: 'premises_insurance',
        title: 'Souscrire une assurance multirisque locaux professionnels',
        description: 'Obligatoire pour les locaux commerciaux, couvre incendie, dégâts des eaux, etc.',
        timeframe: 'first-week'
      }
    );
  }

  // Éléments de protection juridique
  if (companyType === 'SAS' || companyType === 'SASU' || companyType === 'SA') {
    insuranceItems.items.push(
      {
        id: 'director_liability',
        title: 'Souscrire une assurance responsabilité des dirigeants',
        description: 'Protège le patrimoine personnel du dirigeant en cas de faute de gestion',
        timeframe: 'first-month',
        link: {
          text: 'En savoir plus sur cette assurance',
          url: 'https://www.economie.gouv.fr/entreprises/assurance-responsabilite-dirigeants'
        }
      }
    );
  }

  // Éléments liés à l'activité
  const businessItems = {
    id: 'business',
    title: 'Développement commercial',
    items: [
      {
        id: 'create_website',
        title: 'Créer un site web professionnel',
        description: 'Vitrine en ligne indispensable pour la plupart des activités',
        timeframe: 'first-month'
      },
      {
        id: 'register_google',
        title: 'Inscrire l\'entreprise sur Google My Business',
        description: 'Améliore la visibilité locale et facilite le contact avec les clients',
        timeframe: 'first-week',
        link: {
          text: 'S\'inscrire sur Google My Business',
          url: 'https://www.google.com/business/'
        }
      },
      {
        id: 'create_business_cards',
        title: 'Créer des cartes de visite et supports de communication',
        description: 'Outils essentiels pour le réseautage et la prospection',
        timeframe: 'first-month'
      },
      {
        id: 'define_commercial_strategy',
        title: 'Définir une stratégie commerciale',
        description: 'Plan d\'action pour acquérir et fidéliser des clients',
        timeframe: 'first-month'
      }
    ]
  };

  // Éléments RH (si l'entreprise a des employés)
  const hrItems = {
    id: 'hr',
    title: 'Ressources humaines',
    items: []
  };

  if (hasEmployees) {
    hrItems.items.push(
      {
        id: 'register_urssaf',
        title: 'S\'immatriculer en tant qu\'employeur auprès de l\'URSSAF',
        description: 'Obligatoire avant toute embauche',
        timeframe: 'immediate'
      },
      {
        id: 'work_medicine',
        title: 'Adhérer à un service de médecine du travail',
        description: 'Obligation légale pour tout employeur',
        timeframe: 'immediate'
      },
      {
        id: 'display_obligations',
        title: 'Mettre en place l\'affichage obligatoire',
        description: 'Informations légales devant être affichées dans les locaux de l\'entreprise',
        timeframe: 'first-week',
        link: {
          text: 'Liste des affichages obligatoires',
          url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F23106'
        }
      },
      {
        id: 'payroll_solution',
        title: 'Choisir une solution de paie',
        description: 'Logiciel ou externalisation pour gérer les fiches de paie et déclarations sociales',
        timeframe: 'immediate'
      }
    );
  } else {
    // Même pour les entrepreneurs sans salariés
    hrItems.items.push(
      {
        id: 'choose_health_insurance',
        title: 'Choisir une complémentaire santé',
        description: 'Importante pour compléter la couverture de base du régime TNS',
        timeframe: 'first-month'
      },
      {
        id: 'retirement_planning',
        title: 'Se renseigner sur les compléments de retraite',
        description: 'Anticipation importante pour les TNS dont la retraite de base est souvent limitée',
        timeframe: 'three-months'
      }
    );
  }

  // Éléments spécifiques à certaines activités
  const specificItems = {
    id: 'specific',
    title: 'Éléments spécifiques à votre activité',
    items: []
  };

  // Activités commerciales
  if (activity.toLowerCase().includes('commerce') || activity.toLowerCase().includes('vente') || activity.toLowerCase().includes('retail')) {
    specificItems.items.push(
      {
        id: 'inventory_management',
        title: 'Mettre en place un système de gestion des stocks',
        description: 'Essentiel pour suivre les entrées/sorties et optimiser les approvisionnements',
        timeframe: 'first-week'
      },
      {
        id: 'payment_solutions',
        title: 'Mettre en place des solutions de paiement',
        description: 'Terminal de paiement, paiement en ligne, solutions mobiles, etc.',
        timeframe: 'immediate'
      }
    );
  }

  // Professions réglementées
  if (activity.toLowerCase().includes('conseil') || 
      activity.toLowerCase().includes('consulting') || 
      activity.toLowerCase().includes('comptable') || 
      activity.toLowerCase().includes('juridique')) {
    specificItems.items.push(
      {
        id: 'professional_insurance',
        title: 'Souscrire une assurance professionnelle spécifique',
        description: 'Souvent obligatoire pour les professions de conseil avec un niveau de couverture minimum',
        timeframe: 'immediate'
      },
      {
        id: 'rgpd_compliance',
        title: 'Mettre en place une conformité RGPD',
        description: 'Protection des données clients/prospects, mentions légales, politique de confidentialité',
        timeframe: 'first-week',
        link: {
          text: 'Guide RGPD pour TPE/PME',
          url: 'https://www.cnil.fr/fr/la-cnil-et-bpifrance-sassocient-pour-accompagner-les-tpe-et-pme-dans-leur-appropriation-du-rgpd'
        }
      }
    );
  }

  // Construction/Artisanat
  if (activity.toLowerCase().includes('artisan') || 
      activity.toLowerCase().includes('bâtiment') || 
      activity.toLowerCase().includes('construction')) {
    specificItems.items.push(
      {
        id: 'professional_qualification',
        title: 'Vérifier les qualifications professionnelles requises',
        description: 'Certaines activités artisanales nécessitent des diplômes ou une expérience validée',
        timeframe: 'immediate'
      },
      {
        id: 'decennial_insurance',
        title: 'Souscrire une assurance décennale',
        description: 'Obligatoire pour les artisans du bâtiment, couvre les vices de construction pendant 10 ans',
        timeframe: 'immediate',
        link: {
          text: 'En savoir plus sur l\'assurance décennale',
          url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F2034'
        }
      }
    );
  }

  // Constituer la liste finale en fonction de la pertinence
  const finalChecklist = [administrativeItems, taxItems, insuranceItems];
  
  // Ajouter les éléments RH si pertinent
  if (hasEmployees || companyType !== 'EI') {
    finalChecklist.push(hrItems);
  }
  
  // Ajouter les éléments commerciaux
  finalChecklist.push(businessItems);
  
  // Ajouter les éléments spécifiques s'il y en a
  if (specificItems.items.length > 0) {
    finalChecklist.push(specificItems);
  }
  
  return finalChecklist;
};