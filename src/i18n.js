import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      // ========================
      // Navigation générale
      // ========================
      WELCOME: "Bienvenue sur notre formulaire",
      CHOOSE_YOUR_PATH: "Choisissez votre parcours pour créer votre entreprise",
      GUIDED_PATH: "Je veux être guidé pas à pas",
      DIRECT_PATH: "Je sais déjà ce que je veux",
      NEED_HELP: "Besoin d'aide pour faire votre choix ?",
      CONTACT_SUPPORT: "Contactez notre support",
      CHOOSE_LANGUAGE: "Choisissez votre langue",
      BACK: "Retour",
      PREVIOUS: "Précédent",
      CONTINUE: "Continuer",
      NEXT: "Suivant",
      VALIDATE: "Valider",
      FINISH: "Terminer",
      RESET: "Recommencer",
      BACK_BUTTON: "Retour",
      CONTINUE_BUTTON: "Continuer",
      MODIFY: "Modifier",
      LEARN_MORE: "En savoir plus",
      PROGRESS: "Progression",
      COMPLETED: "complété",
      CANCEL: "Annuler",
      CONTINUE_ANYWAY: "Continuer malgré tout",
      REMOVE: "Supprimer",
      NOT_DEFINED: "Non défini",
      NOT_SELECTED: "Non sélectionné",
      YEARS: "ans",
      SELECT_OPTION: "Sélectionner une option",
      FORM_PREFILLED:
        "Ce formulaire a été pré-rempli d'après vos réponses précédentes. Vous pouvez modifier ces informations si nécessaire.",
      RECOMMENDED: "Recommandé",
      RECOMMENDED_FOR_ACTIVITY: "(Recommandé pour votre activité)",
      START_COMPANY_CREATION: "Démarrer la création de votre entreprise",
      VALIDATE_AND_CONTINUE: "Valider et continuer",
      DOCS_NEEDED: "Documents nécessaires :",
      CHECK_BEFORE_CONTINUING:
        "Vérifiez attentivement toutes les informations avant de continuer. Vous pouvez modifier chaque section en cliquant sur 'Modifier'.",

      // ========================
      // WizardEntryPage
      // ========================
      GUIDED_PATH_DESCRIPTION:
        "Un parcours interactif qui vous guide à travers chaque étape de la création de votre entreprise.",
      DIRECT_PATH_DESCRIPTION:
        "Accédez directement au formulaire si vous connaissez déjà les détails de votre projet.",

      // ========================
      // 0_PreQualificationForm
      // ========================
      PREQUAL_FORM_TITLE: "Pré-qualification entreprise",

      // Sections principales
      PREQUAL_PROFILE_TITLE: "Votre profil d'entrepreneur",
      PREQUAL_PROJECT_TITLE: "Votre projet",
      PREQUAL_FINANCIAL_TITLE: "Aspects financiers",

      // Questions - Profil entrepreneur
      QUESTION_ENTREPRENEUR_STATUS: "Êtes-vous déjà entrepreneur ?",
      OPTION_FIRST_TIME: "Première fois",
      OPTION_ALREADY: "Déjà entrepreneur",

      QUESTION_CREATION_MODE: "Allez-vous créer cette entreprise seul ?",
      OPTION_ALONE: "Seul",
      OPTION_MULTIPLE: "À plusieurs",

      QUESTION_EXACT_PARTNERS_NUMBERS: "Nombre exact d'associés",

      QUESTION_CURRENT_SITUATION: "Quelle est votre situation actuelle ?",
      OPTION_EMPLOYED: "Salarié",
      OPTION_UNEMPLOYED: "Demandeur d'emploi",
      OPTION_STUDENT: "Étudiant",
      OPTION_RETIRED: "Retraité",

      QUESTION_PATRIMOINE_PROTECTION:
        "Protection de votre patrimoine personnel",
      OPTION_PATRIMOINE_HIGH: "Protection maximale (recommandé)",
      OPTION_PATRIMOINE_MEDIUM: "Protection moyenne",
      OPTION_PATRIMOINE_LOW: "Protection minimale",
      HELP_PATRIMOINE_HIGH:
        "Cette option sépare totalement votre patrimoine personnel et professionnel. Recommandée pour les activités à risque ou fort investissement. Implique généralement une SAS ou SASU avec assurance RC Pro.",
      HELP_PATRIMOINE_MEDIUM:
        "Protection intermédiaire. Votre responsabilité peut être engagée dans certains cas spécifiques. Adapté aux activités à risque modéré. Implique généralement une SARL ou EURL.",
      HELP_PATRIMOINE_LOW:
        "Protection limitée. Votre patrimoine personnel peut être engagé en cas de difficultés. Adapté uniquement aux activités à très faible risque. Correspond généralement au statut d'auto-entrepreneur.",
      PATRIMOINE_PROTECTION_HIGH: "Protection juridique élevée",
      PATRIMOINE_PROTECTION_STANDARD: "Protection juridique standard",
      PATRIMOINE_PROTECTION_LIMITED: "Protection juridique limitée",

      // Questions - Projet
      QUESTION_ACTIVITY_TYPE: "Type d'activité principal :",
      OPTION_SERVICES: "Services",
      OPTION_COMMERCE: "Commerce",
      OPTION_ARTISANAT: "Artisanat",
      OPTION_LIBERAL: "Profession libérale",

      QUESTION_MAIN_ACTIVITY: "Précisez votre activité :",
      ACTIVITY_PLACEHOLDER: "Décrivez votre activité...",

      QUESTION_START_DATE: "Date de démarrage souhaitée ?",
      OPTION_ASAP: "Le plus tôt possible",
      OPTION_IN_3_MONTHS: "Dans les 3 mois",
      OPTION_IN_6_MONTHS: "Dans les 6 mois",

      // Questions - Finance
      QUESTION_PROJECTED_REVENUE: "CA annuel envisagé ?",
      QUESTION_INITIAL_INVESTMENT: "Investissement initial prévu ?",
      QUESTION_FUNDING_SOURCE: "Source de financement principale ?",
      OPTION_PERSONAL_FUNDS: "Fonds personnels",
      OPTION_BANK_LOAN: "Prêt bancaire",
      OPTION_INVESTORS: "Investisseurs",

      QUESTION_EMPLOYEE_HIRING: "Prévoyez-vous des embauches ?",
      OPTION_HIRE_IMMEDIATE: "Embauche immédiate",
      OPTION_HIRE_FUTURE: "Embauche future",
      OPTION_HIRE_NONE: "Pas d'embauche prévue",

      // Recommendations
      RECOMMENDATIONS_TITLE: "Nos recommandations pour votre projet",
      PLEASE_CONFIRM_RECOMMENDATIONS:
        "Veuillez confirmer les recommandations avant de continuer",
      LEGAL_STRUCTURE: "Structure juridique recommandée",
      RECOMMENDED_BASED_ON:
        "Recommandation basée sur votre profil et votre activité",
      PARTNERS_LABEL: "Nombre d'associés",
      ACTIVITY_LABEL: "Activité principale",

      // Domiciliation
      DOMICILIATION_RECOMMENDATION: "Domiciliation recommandée",
      KOULIER_REASON_1:
        "Adresse prestigieuse au cœur du 8ème arrondissement de Paris",
      KOULIER_REASON_2: "Service de gestion du courrier inclus",
      KOULIER_REASON_3: "Processus d'immatriculation simplifié",
      KOULIER_REASON_4: "Flexibilité pour changer d'adresse facilement",
      KOULIER_REASON_5: "Coût compétitif à partir de 20€ HT par mois",
      KOULIER_REASON_6: "Accompagnement personnalisé et support client réactif",
      LOCAL_REASON_1:
        "Votre activité nécessite généralement un local professionnel",
      LOCAL_REASON_2: "Meilleure visibilité pour votre clientèle",
      LOCAL_REASON_3: "Espace adapté à votre type d'activité",
      LOCAL_REASON_4: "Possibilité de recevoir clients et fournisseurs",

      // Régimes fiscaux et sociaux
      HEADQUARTERS_SECTION: "Siège social",
      FISCAL_SOCIAL_SECTION: "Régimes fiscal et social",
      FISCAL_REGIME: "Régime fiscal",
      SOCIAL_REGIME: "Régime social",
      TVA_REGIME: "Régime de TVA",

      // Avantages par catégorie
      CATEGORY_ECONOMIQUE: "Avantages économiques",
      CATEGORY_JURIDIQUE: "Avantages juridiques",
      CATEGORY_FISCAL: "Avantages fiscaux",
      CATEGORY_SOCIAL: "Avantages sociaux",
      CATEGORY_ADMINISTRATIF: "Avantages administratifs",
      CATEGORY_AUTRES: "Autres avantages",

      // Avantages spécifiques
      BENEFIT_LIABILITY_PROTECTION:
        "Responsabilité limitée aux apports, protection maximale du patrimoine personnel",
      BENEFIT_FLEXIBLE_STATUTES:
        "Grande flexibilité statutaire adaptée à votre situation",
      BENEFIT_LIMITED_LIABILITY: "Responsabilité limitée aux apports",
      BENEFIT_SIMPLICITY: "Structure juridique simple et bien connue",
      BENEFIT_IS_HIGH_REVENUE:
        "Impôt sur les Sociétés avantageux pour des revenus élevés",
      BENEFIT_IS_REINVESTMENT:
        "Possibilité de réinvestir les bénéfices avec une fiscalité avantageuse",
      BENEFIT_IR_SIMPLICITY:
        "Impôt sur le Revenu pour une simplicité de gestion fiscale",
      BENEFIT_IR_STARTUP:
        "Idéal pour les débuts d'activité à faible chiffre d'affaires",
      BENEFIT_SOCIAL_ASSIMILE:
        "Régime social assimilé-salarié avec meilleure protection sociale",
      BENEFIT_SOCIAL_TNS: "Régime TNS avec des charges sociales plus légères",
      BENEFIT_INVESTORS_STRUCTURE:
        "Structure attractive pour les investisseurs",
      BENEFIT_CREDIBILITY:
        "Structure offrant une bonne crédibilité auprès des banques",
      BENEFIT_HIRING_FRAMEWORK: "Cadre adapté pour l'embauche de salariés",

      // Services additionnels
      ADDITIONAL_SERVICES: "Services complémentaires recommandés",
      ACRE_HELP: "Aide ACRE",
      ACRE_DESCRIPTION: "Exonération partielle de charges sociales",
      ACCOUNTING_SERVICE: "Service comptable",
      ACCOUNTING_DESCRIPTION: "Recommandé pour votre niveau d'activité",
      BANK_ACCOUNT: "Compte professionnel",
      BANK_DESCRIPTION: "Nécessaire pour votre prêt bancaire",
      PAYROLL_SERVICE: "Service de paie",
      PAYROLL_DESCRIPTION: "Gérez vos salariés sereinement",
      LEGAL_PROTECTION: "Protection juridique",
      LEGAL_PROTECTION_DESCRIPTION:
        "Assurance adaptée à votre niveau de protection souhaité",
      BENEFITS_FOR_YOUR_SITUATION: "Avantages pour votre situation",

      // ========================
      // 1_CompanyBasicInfo
      // ========================
      COMPANY_CREATION: "Création de société",
      LEGAL_FORM_LABEL: "Forme juridique *",
      ACTIVITY_SEARCH_PLACEHOLDER: "Rechercher une activité...",
      ACTIVITY_CATEGORY_LABEL: "Catégorie d'activité :",
      COMPANY_CHARACTERISTICS: "Caractéristiques de la {{type}}",
      ADVANTAGES: "Avantages :",
      DISADVANTAGES: "Inconvénients :",

      // Company Types Advantages
      EURL_ADVANTAGES:
        "Responsabilité limitée aux apports, Capital social libre, Régime fiscal flexible (IR ou IS), Structure simple à gérer, Pas de pluralité d'associés requise",
      SASU_ADVANTAGES:
        "Responsabilité limitée aux apports, Capital social libre, Statut assimilé salarié, Grande flexibilité statutaire, Transformation facile en SAS",
      SARL_ADVANTAGES:
        "Responsabilité limitée aux apports, Capital social libre, Régime fiscal flexible (IR ou IS), Coûts de création modérés, Structure bien connue des partenaires",
      SAS_ADVANTAGES:
        "Grande liberté statutaire, Statut assimilé salarié, Capital social libre, Image moderne et dynamique, Attractive pour les investisseurs",
      SNC_ADVANTAGES:
        "Transparence fiscale, Pas de capital minimum, Forte crédibilité auprès des banques, Confidentialité des comptes possible",
      SA_ADVANTAGES:
        "Image prestigieuse, Facilité pour lever des fonds, Possibilité d'être cotée en bourse, Distinction claire entre direction et contrôle",

      // Company Types Disadvantages
      EURL_DISADVANTAGES:
        "Un seul associé possible, Image moins prestigieuse que la SAS, Statut TNS pour le gérant, Moins attractive pour les investisseurs",
      SASU_DISADVANTAGES:
        "Un seul associé possible, Charges sociales plus élevées, Formalisme plus important, Coûts de création plus élevés",
      SARL_DISADVANTAGES:
        "Gérant soumis au régime TNS, Formalisme des assemblées, Image moins moderne que la SAS, Transformation en SAS coûteuse",
      SAS_DISADVANTAGES:
        "Charges sociales élevées, Coût de création plus élevé, Formalisme important, Commissaire aux comptes obligatoire dans certains cas",
      SNC_DISADVANTAGES:
        "Responsabilité solidaire et indéfinie, Accord unanime pour cession de parts, Tous les associés sont commerçants, Régime fiscal IR obligatoire",
      SA_DISADVANTAGES:
        "Capital minimum de 37 000€, Structure lourde et complexe, Coûts de fonctionnement élevés, Minimum 7 actionnaires",

      // ========================
      // 2_CompanyNamingAndSocialPurpose
      // ========================
      STEP2_TITLE: "Création de société",

      // Company Name Guide
      NAME_GUIDE_TITLE: "Guide pour choisir votre nom d'entreprise",
      NAMING_FORBIDDEN_TITLE: "À éviter :",
      NAMING_TIPS_TITLE: "Conseils :",

      // Forbidden Names List
      FORBIDDEN_NAMES: [
        "Les termes protégés (Ordre, Institut, National, Municipal...)",
        "Les termes trompeurs (Banque, Assurance si ce n'est pas l'activité)",
        "Les marques déposées",
        "Les noms de personnalités sans autorisation",
        "Les termes offensants ou contraires à l'ordre public",
      ],

      // Naming Tips List
      NAMING_TIPS: [
        "Vérifiez la disponibilité sur infogreffe.fr",
        "Évitez les noms trop similaires à des marques existantes",
        "Pensez à la dimension internationale",
        "Vérifiez la disponibilité du nom de domaine",
        "Assurez-vous que le nom soit facile à prononcer et à retenir",
      ],

      // Form Labels
      COMPANY_NAME_LABEL: "Dénomination sociale *",
      COMPANY_NAME_PLACEHOLDER: "Nom officiel de votre société",
      COMPANY_NAME_HELP: "Ce nom apparaîtra sur tous vos documents officiels",

      // Domain Search
      DOMAIN_CHECK_TITLE: "Vérifiez la disponibilité sur Infogreffe :",
      DOMAIN_CHECK_LINK: "Voir les résultats sur Infogreffe",
      DOMAIN_AVAILABILITY_TITLE: "Disponibilité des noms de domaine :",
      DOMAIN_AVAILABLE: "Disponible",
      DOMAIN_TAKEN: "Déjà pris",
      DOMAIN_RESERVE: "Réserver",

      // Social Purpose
      SOCIAL_PURPOSE_LABEL: "Objet social *",
      SOCIAL_PURPOSE_PLACEHOLDER:
        "Description détaillée des activités de la société",
      SOCIAL_PURPOSE_HELP:
        "Décrivez précisément toutes les activités que votre société exercera",

      // Company Duration
      DURATION_LABEL: "Durée de la société (années) *",
      DURATION_HELP: "99 ans est la durée standard",

      // Start Date
      START_DATE_LABEL: "Date de début d'activité *",
      START_DATE_HELP: "Date de démarrage effective",

      // Additional Fields Section
      ADDITIONAL_FIELDS_TITLE: "Options rarement nécessaires",
      ADDITIONAL_FIELDS_SUBTITLE:
        "95% des entreprises n'utilisent pas ces options",
      ADDITIONAL_FIELDS_WARNING:
        "Ces options sont uniquement utiles dans des cas spécifiques :",
      ADDITIONAL_FIELDS_CASES: [
        "Groupes d'entreprises avec plusieurs marques",
        "Franchises avec une identité distincte",
        "Stratégies marketing complexes multi-marques",
      ],

      // Optional Fields
      TRADE_NAME_LABEL: "Nom commercial (facultatif)",
      TRADE_NAME_PLACEHOLDER: "Nom utilisé pour votre communication",
      TRADE_NAME_HELP: "Nom distinct utilisé pour vos activités commerciales",

      ACRONYM_LABEL: "Sigle (facultatif)",
      ACRONYM_PLACEHOLDER: "Ex: SNCF, EDF...",
      ACRONYM_HELP: "Version abrégée de votre dénomination sociale",

      SHOP_SIGN_LABEL: "Enseigne (facultatif)",
      SHOP_SIGN_PLACEHOLDER: "Nom visible sur votre devanture",
      SHOP_SIGN_HELP:
        "Nom utilisé pour identifier votre établissement physique",

      // Important Information
      IMPORTANT_INFO_TITLE: "Informations importantes :",
      IMPORTANT_INFO_ITEMS: [
        "L'objet social doit être précis mais suffisamment large pour couvrir vos activités futures",
        "La date de début d'activité peut être postérieure à la date d'immatriculation",
        "Le nom commercial peut être modifié plus facilement que la dénomination sociale",
      ],

      // Additional Activities
      ADD_OTHER_ACTIVITIES: "Ajouter d'autres activités",
      ADDITIONAL_ACTIVITIES_WARNING_TITLE:
        "Attention à la complexité avec l'INPI !",
      ADDITIONAL_ACTIVITIES_WARNING:
        "L'ajout d'activités secondaires peut compliquer l'immatriculation auprès de l'INPI et entraîner des demandes de clarification. Souhaitez-vous tout de même ajouter des activités supplémentaires ?",
      ADDITIONAL_ACTIVITIES: "Activités secondaires",
      ACTIVITY: "Activité",
      ACTIVITY_NAME: "Nom de l'activité",
      ACTIVITY_NAME_PLACEHOLDER: "Ex: Conseil en marketing",
      ACTIVITY_DESCRIPTION: "Description",
      ACTIVITY_DESCRIPTION_PLACEHOLDER: "Description courte de l'activité",
      ADD_MORE_ACTIVITIES: "Ajouter une autre activité",

      // ========================
      // 3_CapitalContributionAndPartners
      // ========================
      CAPITAL_ASSOCIES: "Capital et Associés",

      // Capital Variable
      CAPITAL_TYPE: "Type de capital social",
      FIXED_CAPITAL_RECOMMENDED: "Capital fixe (recommandé)",
      FIXED_CAPITAL_DESC:
        "Le capital fixe est la forme la plus courante et la plus simple à gérer.",
      FIXED_ADVANTAGE_1: "Structure claire et stable pour les investisseurs",
      FIXED_ADVANTAGE_2: "Procédures administratives simplifiées",
      FIXED_ADVANTAGE_3: "Meilleure image auprès des banques et partenaires",
      FIXED_ADVANTAGE_4: "Gestion plus simple au quotidien",

      VARIABLE_CAPITAL: "Capital variable",
      VARIABLE_CAPITAL_DESC:
        "Le capital variable est adapté dans des cas spécifiques :",
      VARIABLE_EX_1: "Coopératives et structures à adhésion flexible",
      VARIABLE_EX_2: "Sociétés avec entrées/sorties fréquentes d'associés",
      VARIABLE_EX_3:
        "Structures nécessitant une flexibilité importante du capital",
      WARNING: "Attention :",
      VARIABLE_CAP_WARNING:
        "Le capital variable implique une complexité administrative accrue.",

      // Limites du capital variable
      VARIABLE_CAPITAL_LIMITS: "Limites du capital variable",
      MINIMUM_CAPITAL: "Capital minimum (€) *",
      MAXIMUM_CAPITAL: "Capital maximum (€) *",
      LEGAL_MINIMUM: "Minimum légal :",
      CAPITAL_MUST_BE_HIGHER: "Doit être supérieur au capital minimum",

      // Points importants
      IMPORTANT_POINTS: "Points importants :",
      MINIMUM_CAPITAL_REQUIRED: "Le capital minimum requis est de",
      SHARE_DISTRIBUTION_100: "La répartition des parts doit totaliser 100%",
      RELEASE_20_PERCENT:
        "Chaque associé doit libérer au moins 20% de son apport à la création",
      RELEASE_REST_5YEARS:
        "Le reste du capital doit être libéré dans les 5 ans",
      VARIABLE_CAP_MORE_FLEX:
        "Le capital variable permet une plus grande flexibilité dans l'évolution du capital",
      VARIABLE_CAP_MUST_STAY_LIMITS:
        "Les variations de capital doivent rester dans les limites fixées par les statuts",

      // Informations des associés
      ASSOCIATE: "Associé",
      LEGAL_REPRESENTATIVE: "(Représentant légal)",
      COMPANY_ROLE: "Fonction dans la société *",

      // Informations personnelles
      FIRST_NAME: "Prénom *",
      FIRST_NAME_PLACEHOLDER: "Premier prénom",
      SECOND_NAME: "Deuxième prénom",
      OPTIONAL_SECOND_NAME: "Deuxième prénom (optionnel)",
      THIRD_NAME: "Troisième prénom",
      OPTIONAL_THIRD_NAME: "Troisième prénom (optionnel)",
      FOURTH_NAME: "Quatrième prénom",
      OPTIONAL_FOURTH_NAME: "Quatrième prénom (optionnel)",
      LAST_NAME: "Nom *",
      LAST_NAME_PLACEHOLDER: "Nom de famille",

      // Informations de contribution
      BIRTH_DATE: "Date de naissance *",
      BIRTH_PLACE: "Lieu de naissance *",
      NATIONALITY: "Nationalité *",
      CONTRIBUTION_TYPE: "Type d'apport *",
      APPORT_NUMERAIRE: "Numéraire",
      APPORT_NATURE: "Nature",
      APPORT_INDUSTRIE: "Industrie",
      APPORT_AMOUNT: "Montant de l'apport (€) *",
      SHARE_PERCENTAGE: "Pourcentage de parts",

      // Résumé du capital
      TOTAL_ESTIMATED_CAPITAL: "Capital total estimé :",
      MINIMUM_REQUIRED: "Minimum requis :",
      CAPITAL_CONFIRMATION: "Confirmation du capital social *",
      CAPITAL_TO_VALIDATE: "Montant du capital à valider",
      VALIDATE_THIS_AMOUNT: "Valider ce montant",
      CAPITAL_WILL_BE_IN_STATUTES:
        "Ce montant sera inscrit dans les statuts de votre société",

      // Messages d'erreur
      CAPITAL_MAX_MUST_BE_SUPERIOR:
        "Le capital maximum doit être supérieur au capital minimum",
      SHARES_TOTAL_100: "La répartition des parts doit totaliser 100%",
      CAPITAL_BELOW_MIN:
        "Le capital social ne peut pas être inférieur à {{min}}€ pour ce type de société",

      // Rôles d'entreprise
      ROLE_ALREADY_TAKEN: "Ce rôle est déjà attribué à un autre associé",
      ROLE_REQUIRED: "Un {{role}} doit être désigné pour ce type de société",
      ROLE_ALREADY_TAKEN_GERANT:
        "Le rôle de gérant est déjà attribué à un autre associé",
      ROLE_ALREADY_TAKEN_GERANT_EURL:
        "Le rôle de gérant est déjà attribué à un autre associé. Dans une EURL, il ne peut y avoir qu'un seul gérant.",
      ROLE_ALREADY_TAKEN_PRESIDENT:
        "Le rôle de président est déjà attribué à un autre associé",
      ROLE_ALREADY_TAKEN_PRESIDENT_SASU:
        "Le rôle de président est déjà attribué à un autre associé. Dans une SASU, il ne peut y avoir qu'un seul président.",
      ROLE_ALREADY_TAKEN_DG:
        "Le rôle de directeur général est déjà attribué à un autre associé",
      ROLE_ALREADY_TAKEN_DG_SASU:
        "Le rôle de directeur général est déjà attribué à un autre associé. Dans une SASU, il ne peut y avoir qu'un seul directeur général.",
      ROLE_ALREADY_TAKEN_PRESIDENT_CA:
        "Le rôle de président du conseil d'administration est déjà attribué à un autre associé",
      ROLE_ALREADY_TAKEN_DG_SA:
        "Le rôle de directeur général est déjà attribué à un autre associé. Dans une SA, il ne peut y avoir qu'un seul directeur général.",

      // ========================
      // 4_CompanyHeadquartersAndDomiciliation
      // ========================
      // Important Points for Headquarters
      HEADQUARTERS_DETERMINES_REGISTRATION:
        "Le siège social détermine le lieu d'immatriculation de votre société",
      HEADQUARTERS_CORRESPONDS_LOCAL:
        "Il doit correspondre à un local où s'exerce l'activité administrative",
      HEADQUARTERS_VISIBLE_DOCUMENTS:
        "L'adresse sera visible sur tous les documents officiels",
      CHANGE_OF_ADDRESS_FORMALITIES:
        "Le changement d'adresse nécessite des formalités administratives",

      // Domiciliation Types
      CHOOSE_DOMICILIATION_TYPE: "Choisissez votre type de domiciliation",

      // Koulier Option
      KOULIER_DOMICILIATION_LABEL:
        "Domiciliation d'entreprise Koulier - Recommandé",
      ACTIVITY_KOULIER_SUITABLE:
        "La domiciliation professionnelle Koulier est idéale pour une activité de {{activityType}} comme la vôtre.",
      ACTIVITY_KOULIER_NOT_IDEAL:
        "Pour une activité de {{activityType}}, un local commercial pourrait être plus adapté, mais la domiciliation Koulier reste possible.",
      ADVANTAGES_INCLUDED: "Avantages inclus :",
      KOULIER_ADVANTAGE_1:
        "Adresse professionnelle premium au cœur du 8ème arrondissement",
      KOULIER_ADVANTAGE_2: "Réception et gestion du courrier",
      KOULIER_ADVANTAGE_3: "Scan et notification des courriers importants",
      KOULIER_ADVANTAGE_4: "Service de réexpédition sur demande",
      KOULIER_ADVANTAGE_5: "Accès à votre espace client en ligne",
      KOULIER_ADVANTAGE_6: "Attestation de domiciliation immédiate",
      FROM_20_EUROS: "À partir de 20€ HT/mois",

      // Commercial Option
      COMMERCIAL_LOCAL: "Local commercial",
      COMMERCIAL_LOCATION_NEEDED:
        "Pour une activité de {{activityType}}, un local commercial est généralement nécessaire pour accueillir vos clients et stocker vos marchandises/équipements.",
      BAIL_COMMERCIAL_COPY: "Copie du bail commercial ou titre de propriété",

      // Personal Option
      DOMICILE_DIRIGEANT: "Domiciliation au domicile du dirigeant",
      JUSTIFICATIF_DOMICILE: "Justificatif de domicile de moins de 3 mois",
      OWNER_AUTHORIZATION: "Autorisation du propriétaire (si locataire)",
      PLACEHOLDER_DOMICILE: "Justificatif de domicile",
      PLACEHOLDER_OWNER_AUTH: "Autorisation du propriétaire",

      // Address Fields
      KOULIER_DOMICILIATION_ADDRESS: "Adresse de domiciliation Koulier",
      ATTESTATION_INSTANT:
        "Une attestation de domiciliation vous sera fournie instantanément",
      ADDRESS_LABEL: "Adresse *",
      ADDRESS_PLACEHOLDER: "Numéro et nom de la voie",
      ADDRESS_COMPLEMENT: "Complément d'adresse",
      ADDRESS_COMPLEMENT_PLACEHOLDER: "Bâtiment, étage, etc.",
      POSTAL_CODE: "Code postal *",
      POSTAL_CODE_EX: "Ex: 75001",
      CITY_LABEL: "Ville *",
      CITY_EX: "Ex: Paris",

      // ========================
      // 5_FiscalAndSocialRegime
      // ========================
      // Titres et en-têtes
      ESTIMATION_ACTIVITE: "Estimation de votre activité",
      REGIMES_RECOMMANDES: "Régimes fiscaux et sociaux recommandés",
      THRESHOLDS_ALERTS: "Alertes seuils réglementaires",
      HIDE_SIMULATOR: "Masquer le simulateur de charges",
      SHOW_SIMULATOR: "Afficher le simulateur de charges",

      // Chiffre d'affaires
      CA_ANNUEL_HT: "Chiffre d'affaires prévisionnel annuel HT *",
      EX_TURNOVER: "Ex: 50000",
      FISCAL_NEED_TURNOVER:
        "Pour vous recommander les régimes les plus adaptés, indiquez votre CA prévisionnel.",

      // Messages de validation
      TURNOVER_REQUIRED: "Le chiffre d'affaires prévisionnel est requis",
      TURNOVER_POSITIVE: "Le chiffre d'affaires doit être un nombre positif",
      RECOMMENDATION_ERROR: "Erreur lors de la génération des recommandations",

      // Régimes fiscaux
      IR_LABEL: "Impôt sur le Revenu (IR)",
      IS_LABEL: "Impôt sur les Sociétés (IS)",

      // Régimes de TVA
      FRANCHISE_BASE_TVA: "Franchise de base de TVA",
      REAL_SIMPLIFIED: "Réel simplifié",
      REAL_NORMAL: "Réel normal",

      // Périodicité TVA
      TVA_PERIODICITY: "Périodicité TVA",
      DECLARATION_MENSUELLES: "Déclarations mensuelles",
      DECLARATION_TRIMESTRIELLES: "Déclarations trimestrielles",

      // Régimes sociaux
      TNS_LABEL: "Travailleur Non Salarié (TNS)",
      ASSIMILE_LABEL: "Assimilé Salarié",
      ASSIMILE_SAL_AR: "Assimilé Salarié",

      // Confirmation des choix
      CONFIRM_CHOICES: "Confirmation des choix",
      PLEASE_CONFIRM_RECOMMENDATIONS:
        "Veuillez confirmer que vous avez pris connaissance des régimes recommandés.",
      I_CONFIRM_RECOMMENDATIONS:
        "Je confirme avoir pris connaissance des recommandations",

      // Messages explicatifs pour chaque régime
      IR_EXPLANATION:
        "L'IR permet une imposition directe des bénéfices sur votre déclaration personnelle",
      IS_EXPLANATION:
        "L'IS implique une séparation entre le patrimoine personnel et professionnel",
      TVA_FRANCHISE_EXPLANATION:
        "Pas de TVA à collecter ni à déduire, idéal pour un faible CA",
      TVA_REEL_EXPLANATION: "Permet de déduire la TVA sur vos achats",
      TNS_EXPLANATION:
        "Régime traditionnel des indépendants avec des charges sociales modérées",
      ASSIMILE_EXPLANATION:
        "Protection sociale similaire aux salariés mais charges plus élevées",

      // Conseils spécifiques par type d'activité
      SERVICE_FISCAL_TIP:
        "Pour votre activité de service, surveillez le seuil de franchise TVA (34 400€). Le régime micro-entreprise pourrait être une option à considérer au démarrage si votre chiffre d'affaires est faible.",
      COMMERCE_FISCAL_TIP:
        "En tant que commerçant, vos seuils TVA sont plus élevés (85 800€) et la récupération de TVA sur vos achats peut être avantageuse dès le début.",
      ARTISAN_FISCAL_TIP:
        "En tant qu'artisan, tenez compte des différentes charges fiscales liées à votre activité spécifique. Certains métiers bénéficient d'avantages fiscaux particuliers.",
      IR_SERVICE_TIP:
        "Pour une activité de service comme la vôtre, l'IR peut être avantageux si vos charges sont faibles.",
      IS_COMMERCE_TIP:
        "Pour une activité commerciale, l'IS facilite la constitution de stocks et les investissements.",
      FRANCHISE_SERVICE_TIP:
        "Le régime de franchise peut être intéressant pour vos activités de service, notamment avec des clients particuliers.",
      REAL_COMMERCE_TIP:
        "Pour votre activité commerciale, le régime réel vous permet de récupérer la TVA sur vos achats.",
      TNS_ARTISAN_TIP:
        "Le statut TNS est particulièrement adapté aux artisans avec des charges sociales modérées.",
      ASSIMILE_SERVICE_TIP:
        "Le statut assimilé-salarié vous offre une meilleure protection sociale, importante pour une activité de service.",

      // ========================
      // 6_ClosingDateAndInitialExercise
      // ========================
      CLOSING_DATE_TITLE: "Date de clôture et premier exercice",

      // Points importants
      CLOSING_DATE_IMPACT:
        "La date de clôture détermine la fin de votre exercice comptable",
      CLOSING_DATE_FISCAL_OBLIG:
        "Elle impacte le calendrier de vos obligations fiscales",
      CLOSING_DATE_SUGGESTION:
        "Le choix du 31 décembre simplifie la gestion administrative",
      CLOSING_DATE_DECALEE:
        "Une clôture décalée peut être pertinente pour certaines activités",

      // Premier exercice
      FIRST_EXERCISE_TYPE: "Type de premier exercice",
      STANDARD_EXERCISE: "Exercice standard",
      LESS_THAN_12_MONTHS: "Moins de 12 mois",
      LONG_EXERCISE: "Exercice long",
      MORE_THAN_12_MONTHS: "Plus de 12 mois",
      FISCAL_ADVANTAGE: "Avantage fiscal (report d'imposition)",
      BETTER_TREND_VIEW: "Meilleure visibilité des tendances",
      MORE_TIME_FOR_ACCOUNTING: "Plus de temps pour la mise en place comptable",
      LONG_EXERCISE_RECOMMENDATION:
        "Compte tenu de votre date de début d'activité, un exercice long pourrait être plus avantageux fiscalement.",
      LONG_PERIOD_INFO:
        "Votre premier exercice sera long (> 12 mois), ce qui peut être avantageux fiscalement.",

      // Choix de la date de clôture
      CHOOSE_CLOSING_DATE: "Choix de la date de clôture",
      RECOMMENDED_DATE_LABEL: "Date recommandée",
      OTHER_CLOSING_DATE_LABEL: "Autre date de clôture",

      // Dates spécifiques
      DECEMBER_31: "31 décembre",
      MARCH_31: "31 mars",
      JUNE_30: "30 juin",
      SEPT_30: "30 septembre",
      DEC_31: "31 décembre",
      ALIGNED_FISCAL_YEAR: "Aligné sur l'année civile",

      // Option recommandée
      RECOMMENDED_OPTION: "✨ Option recommandée",
      ALIGNED_ANNUAL_CALENDAR: "Alignement avec l'année civile",
      SIMPLIFIED_FISCAL_DECLARATIONS: "Déclarations fiscales simplifiées",
      SYNCHRONIZE_PARTNERS: "Synchronisation avec vos partenaires",
      CLEAR_PERFORMANCE_VIEW: "Vision claire de la performance annuelle",

      // Avertissements date personnalisée
      CUSTOM_DATE_WARNING: "Points d'attention pour une date décalée",
      MORE_COMPLEX_ADMIN: "Gestion administrative plus complexe",
      FISCAL_YEAR_MISMATCH: "Décalage avec l'année fiscale",
      POSSIBLE_EXTRA_COSTS: "Surcoûts possibles en expertise comptable",

      // Premier exercice comptable
      FIRST_ACCOUNTING_PERIOD: "Premier exercice comptable",
      START_DATE_FROM_STEP_2: "Date de début définie à l'étape 2 :",
      MODIFY_DATE: "Modifier",
      ACTIVITY_START_DATE: "Date de début d'activité :",
      FIRST_PERIOD_DURATION: "Durée du premier exercice : {{months}} mois",
      LONG_PERIOD_WARNING:
        "⚠️ Cette durée est supérieure à 12 mois. Un premier exercice long peut être avantageux fiscalement.",

      // ========================
      // 7_ComplimentaryServices
      // ========================
      // Client profile
      CLIENT_PROFILE: "Profil client",
      STANDARD_CLIENT: "Client Standard",
      SERVICES_RECOMMENDATION:
        "Des services adaptés à votre profil et votre activité vous sont proposés ci-dessous.",

      // Services bancaires
      BUSINESS_BANK_ACCOUNT: "Ouverture de compte professionnel",
      BANK_ACCOUNT_EXPLANATION:
        "Un compte dédié facilite la gestion de votre trésorerie. Nous vous proposons des offres avantageuses avec nos partenaires.",
      ALREADY_HAVE_SERVICE: "J'ai déjà un compte",
      ALREADY_HAVE_BANK_ACCOUNT:
        "Vous avez indiqué posséder déjà un compte bancaire professionnel. Si vous souhaitez néanmoins voir nos offres, décochez la case ci-dessus.",

      // Shine
      SHINE_DESC:
        "La néobanque idéale pour les indépendants et TPE. Compte pro 100% en ligne.",
      SHINE_ADVANTAGE_1: "Ouverture de compte rapide et sans frais",
      SHINE_ADVANTAGE_2: "Dépôt du capital social en quelques clics",
      SHINE_ADVANTAGE_3: "Outils de facturation et comptabilité inclus",
      SHINE_INFO_NO_PHYSICAL: "Pas d'agence physique",

      // Qonto
      QONTO_DESC:
        "La solution tout-en-un pour gérer les finances de votre entreprise.",
      QONTO_ADVANTAGE_1: "Compte avec IBAN français ou allemand",
      QONTO_ADVANTAGE_2: "Cartes virtuelles et physiques sécurisées",
      QONTO_ADVANTAGE_3: "Gestion multi-utilisateurs et droits d'accès",
      QONTO_INFO_PRICING: "Tarifs adaptés à la croissance de l'entreprise",

      // Pas de compte bancaire
      NO_BANK_ACCOUNT_NOW: "Pas de compte pour le moment",
      NO_BANK_ACCOUNT_DESC:
        "Vous pourrez toujours ouvrir un compte professionnel plus tard.",

      // Services comptables
      ACCOUNTING_SUPPORT: "Accompagnement comptable",
      ACCOUNTING_SUPPORT_DESC:
        "Choisissez l'expertise d'un spécialiste pour vous concentrer sur votre cœur de métier.",
      ALREADY_HAVE_ACCOUNTING: "J'ai déjà un expert-comptable",
      ALREADY_HAVE_ACCOUNTING_SERVICE:
        "Vous avez indiqué avoir déjà un expert-comptable. Si vous souhaitez néanmoins voir nos offres, décochez la case ci-dessus.",

      // Place des Experts
      PLACE_DES_EXPERTS: "Place des Experts",
      PLACE_EXPERT_ADV_1: "Tenue de comptabilité en ligne",
      PLACE_EXPERT_ADV_2: "Déclarations sociales et fiscales",
      PLACE_EXPERT_ADV_3: "Tableaux de bord et pilotage",
      PLACE_EXPERT_INFO: "Peu adapté aux activités complexes",
      FROM_89_EUROS_MONTH: "À partir de 89€ HT/mois",

      // CaptainCompta
      CAPTAIN_COMPTA_ADV_1: "Gestion comptable complète",
      CAPTAIN_COMPTA_ADV_2: "Conseils fiscaux et optimisation",
      CAPTAIN_COMPTA_ADV_3: "Assistance aux contrôles fiscaux",
      CAPTAIN_COMPTA_INFO: "Tarif adapté aux petites structures",
      FROM_149_EUROS_MONTH: "À partir de 149€ HT/mois",

      // Ca Compte Pour Moi
      CACOMPTE_ADV_1: "Conseils illimités par un expert dédié",
      CACOMPTE_ADV_2: "Comptabilité et fiscalité intégralement gérées",
      CACOMPTE_ADV_3: "Prévisionnel d'activité et plan de développement",
      CACOMPTE_INFO_PREMIUM: "Solution premium avec coût plus élevé",
      FROM_249_EUROS_MONTH: "À partir de 249€ HT/mois",

      // Pas d'accompagnement comptable
      NO_ACCOUNTING_SUPPORT: "Pas d'accompagnement pour le moment",

      // Services d'assurance
      INSURANCE_SUPPORT: "Assurance professionnelle",
      ALREADY_HAVE_INSURANCE: "J'ai déjà une assurance",
      INSURANCE_RECOMMENDATION:
        "Pour votre activité, une assurance responsabilité civile professionnelle est fortement recommandée.",
      INSURANCE_SUPPORT_DESC:
        "Une assurance adaptée à votre activité vous protège contre les risques professionnels.",
      INSURANCE_CONTACT_INFO:
        "Un conseiller spécialisé vous contactera pour vous proposer une assurance adaptée à votre activité et vos besoins spécifiques.",
      ALREADY_HAVE_INSURANCE_SERVICE:
        "Vous avez indiqué avoir déjà une assurance professionnelle. Si vous souhaitez néanmoins plus d'informations, décochez la case ci-dessus.",

      // ========================
      // 8_FinalReview
      // ========================
      COMPANY_RECAP: "Récapitulatif de votre société",

      // Sections du récapitulatif
      BASIC_INFO_SECTION: "Informations de base",
      COMPANY_TYPE_LABEL: "Type de société",
      NUMBER_OF_ASSOCIATES_LABEL: "Nombre d'associés",
      MAIN_ACTIVITY_LABEL: "Activité principale",
      ACTIVITY_CATEGORY_LABEL: "Catégorie d'activité",

      COMPANY_IDENTITY_SECTION: "Identité de l'entreprise",
      DENOMINATION_LABEL: "Dénomination sociale",
      ACRONYM_LABEL: "Sigle",
      SHOP_SIGN_LABEL: "Enseigne",
      SOCIAL_PURPOSE_LABEL: "Objet social",
      START_DATE_LABEL: "Date de début d'activité",
      DURATION_LABEL: "Durée",

      CAPITAL_ASSOCIES_SECTION: "Capital et Associés",
      SOCIAL_CAPITAL_LABEL: "Capital social",
      ASSOCIATES_LABEL: "Associés :",
      FULL_NAME_LABEL: "Nom complet",
      ROLE_LABEL: "Rôle",
      SHARES_LABEL: "Parts",

      HEADQUARTERS_SECTION: "Siège social",
      DOMICILIATION_TYPE_LABEL: "Type de domiciliation",
      KOULIER_DOMICILIATION: "Domiciliation Koulier",
      LOCAL_COMMERCIAL: "Local commercial",
      LEADER_HOME: "Domicile du dirigeant",
      ADDRESS_COMPLEMENT_LABEL: "Complément d'adresse",
      POSTAL_CODE_LABEL: "Code postal",

      ACCOUNTING_INFO_SECTION: "Informations comptables",
      CLOSING_DATE_LABEL: "Date de clôture",
      FIRST_EXERCISE_LABEL: "Premier exercice",

      COMPLIMENTARY_SERVICES_LABEL: "Services complémentaires",
      BANKING_SERVICE_LABEL: "Service bancaire",
      ACCOUNTING_SERVICE_LABEL: "Service comptable",

      // ========================
      // 9_FinalGenerationDocs
      // ========================
      FINAL_GENERATION_DOCS_TITLE: "Génération des documents communs",
      IMPORTANT_INFO: "Informations importantes :",
      VERIFY_BEFORE_SIGNATURE:
        "Vérifiez attentivement tous les documents avant signature",
      LEGAL_DOCS:
        "Ces documents ont une valeur juridique et seront déposés au greffe",

      GENERATING_STATUTS: "Génération des statuts en cours...",
      GENERATE_STATUTS: "Générer les statuts",
      GENERATING: "Génération en cours...",
      GENERATE_ALL: "Générer tous les documents",
      DOWNLOAD_STATUTS: "Télécharger les statuts",
      DOWNLOAD_M0: "Télécharger le M0",
      DOWNLOAD_DNC: "Télécharger la DNC",
      DOWNLOAD_RBE: "Télécharger le RBE",
      GENERATE_STATUTS_BTN: "Générer les statuts",

      // Erreurs et messages
      COMPANY_NAME_REQUIRED: "Le nom de l'entreprise est requis",
      COMPANY_TYPE_REQUIRED: "Le type de société est requis",
      ADDRESS_TO_COMPLETE: "Adresse à compléter",
      DEFAULT_PURPOSE: "Conseil aux entreprises et services",

      // ========================
      // 10_DocumentUpload
      // ========================
      DOCUMENT_UPLOAD: "Téléchargement des documents",
      DOCUMENT_REQUIREMENTS: "Exigences pour les documents :",
      CLEAR_SCAN: "Scan clair et lisible",
      FILE_FORMATS: "Formats acceptés : PDF, JPG, PNG",
      FILE_SIZE: "Taille maximale par fichier : 5 Mo",
      VALID_DOCUMENTS: "Les documents doivent être valides et non expirés",

      // Types de document
      IDENTITY_PROOF: "Pièce d'identité",
      IDENTITY_DESCRIPTION: "Carte d'identité ou passeport valide",
      ADDRESS_PROOF: "Justificatif de domicile",
      ADDRESS_DESCRIPTION: "Moins de 3 mois (facture EDF, internet...)",
      BANK_DETAILS: "RIB",
      BANK_DESCRIPTION: "Relevé d'identité bancaire au nom de l'entreprise",
      CAPITAL_DEPOSIT: "Attestation de dépôt du capital",
      CAPITAL_DESCRIPTION: "Document fourni par votre banque",

      CLICK_OR_DROP: "Cliquez ou glissez-déposez un fichier",
      SUPPORTED_FORMATS: "PDF, JPG ou PNG (max 5 Mo)",
      UPLOAD_ALL_DOCUMENTS:
        "Veuillez télécharger tous les documents requis avant de continuer.",

      // ========================
      // 11_ElectronicSignature
      // ========================
      ELECTRONIC_SIGNATURE: "Signature électronique",
      LEGAL_VALUE:
        "La signature électronique a la même valeur légale qu'une signature manuscrite",
      VERIFY_INFO:
        "Vérifiez attentivement toutes les informations avant de signer",
      ALL_PARTNERS:
        "Tous les associés devront signer électroniquement les documents",

      GENERATE_STATUTS: "Génération des statuts",
      SEND_TO_YOUSIGN: "Envoyer pour signature via Yousign",
      SENDING: "Envoi en cours...",
      SENT_TO_YOUSIGN: "Envoyé pour signature",
      DOCUMENTS_SENT: "Documents envoyés",
      CHECK_EMAIL:
        "Vérifiez votre email pour compléter le processus de signature.",
      GENERATE_FIRST:
        "Veuillez d'abord générer les statuts avant de procéder à la signature",

      // Erreurs et messages
      PLEASE_GENERATE_PDF_FIRST: "Veuillez d'abord générer le PDF.",
      PLEASE_SEND_TO_YOUSIGN:
        "Veuillez envoyer les documents à Yousign avant de continuer.",
      PDF_GENERATION_ERROR:
        "Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.",
      YOUSIGN_ERROR:
        "Une erreur est survenue lors de l'envoi à Yousign. Veuillez réessayer.",
      DOC_SENT_TO_YOUSIGN:
        "Les documents ont été envoyés à Yousign pour signature.",

      // ========================
      // 12_ExpertConsultation
      // ========================
      EXPERT_CONSULTATION_TITLE: "Consultation avec un expert",
      BENEFITS_TITLE: "Avantages de la consultation :",
      BENEFIT_1: "Vérification de vos choix juridiques et fiscaux",
      BENEFIT_2: "Réponses à vos questions spécifiques",
      BENEFIT_3: "Conseils personnalisés pour votre activité",
      BENEFIT_4: "Consultation gratuite et sans engagement",

      // Choix de rendez-vous
      WANTS_MEETING_YES: "Je souhaite un rendez-vous",
      MEETING_DESCRIPTION: "Un expert vous accompagnera dans vos choix",
      WANTS_MEETING_NO: "Je continue sans rendez-vous",
      NO_MEETING_DESCRIPTION: "Je maîtrise mes choix",

      // Détails du rendez-vous
      MEETING_DETAILS: "Détails du rendez-vous",
      MEETING_TYPE: "Type de rendez-vous",
      VIDEO_CALL: "Appel vidéo",
      PHONE_CALL: "Appel téléphonique",
      MEETING_DATE: "Date",
      MEETING_TIME: "Horaire",
      CHOOSE_TIMESLOT: "Choisir un horaire",

      // ========================
      // 13_ApplicationStatusTracking
      // ========================
      DOSSIER_STATUS_TITLE: "Suivi de votre dossier",
      PUBLICATION_JAL_LABEL: "Publication Journal d'annonces légales",
      GREFFE_DEPOSIT_LABEL: "Dépôt au greffe",
      INPI_VALIDATION_LABEL: "Validation INPI",
      INSEE_VALIDATION_LABEL: "Validation INSEE",
      NEXT_STEPS_LABEL: "... etc.",
    },
  },
  en: {
    translation: {
      // ========================
      // General navigation
      // ========================
      WELCOME: "Welcome to our form",
      CHOOSE_YOUR_PATH: "Choose your path to create your company",
      GUIDED_PATH: "I want to be guided step by step",
      DIRECT_PATH: "I already know what I need",
      NEED_HELP: "Need help making your choice?",
      CONTACT_SUPPORT: "Contact our support",
      CHOOSE_LANGUAGE: "Choose your language",
      BACK: "Back",
      PREVIOUS: "Previous",
      CONTINUE: "Continue",
      NEXT: "Next",
      VALIDATE: "Validate",
      FINISH: "Finish",
      RESET: "Start over",
      BACK_BUTTON: "Back",
      CONTINUE_BUTTON: "Continue",
      MODIFY: "Edit",
      LEARN_MORE: "Learn more",
      PROGRESS: "Progress",
      COMPLETED: "completed",
      CANCEL: "Cancel",
      CONTINUE_ANYWAY: "Continue anyway",
      REMOVE: "Remove",
      NOT_DEFINED: "Not defined",
      NOT_SELECTED: "Not selected",
      YEARS: "years",
      SELECT_OPTION: "Select an option",
      FORM_PREFILLED:
        "This form has been pre-filled based on your previous answers. You can modify this information if necessary.",
      RECOMMENDED: "Recommended",
      RECOMMENDED_FOR_ACTIVITY: "(Recommended for your activity)",
      START_COMPANY_CREATION: "Start your company creation",
      VALIDATE_AND_CONTINUE: "Validate and continue",
      DOCS_NEEDED: "Required documents:",
      CHECK_BEFORE_CONTINUING:
        "Carefully check all information before continuing. You can modify each section by clicking 'Edit'.",

      // ========================
      // WizardEntryPage
      // ========================
      GUIDED_PATH_DESCRIPTION:
        "An interactive journey that guides you through every step of creating your company.",
      DIRECT_PATH_DESCRIPTION:
        "Access the form directly if you already know your project details.",

      // ========================
      // 0_PreQualificationForm
      // ========================
      PREQUAL_FORM_TITLE: "Company Pre-qualification",

      // Main sections
      PREQUAL_PROFILE_TITLE: "Your Entrepreneur Profile",
      PREQUAL_PROJECT_TITLE: "Your Project",
      PREQUAL_FINANCIAL_TITLE: "Financial Aspects",

      // Questions - Entrepreneur Profile
      QUESTION_ENTREPRENEUR_STATUS: "Are you already an entrepreneur?",
      OPTION_FIRST_TIME: "First time",
      OPTION_ALREADY: "Already an entrepreneur",

      QUESTION_CREATION_MODE: "Will you create this company alone?",
      OPTION_ALONE: "Alone",
      OPTION_MULTIPLE: "With partners",

      QUESTION_EXACT_PARTNERS_NUMBERS: "Exact number of partners",

      QUESTION_CURRENT_SITUATION: "What is your current situation?",
      OPTION_EMPLOYED: "Employed",
      OPTION_UNEMPLOYED: "Job seeker",
      OPTION_STUDENT: "Student",
      OPTION_RETIRED: "Retired",

      QUESTION_PATRIMOINE_PROTECTION: "Personal asset protection",
      OPTION_PATRIMOINE_HIGH: "Maximum protection (recommended)",
      OPTION_PATRIMOINE_MEDIUM: "Medium protection",
      OPTION_PATRIMOINE_LOW: "Minimal protection",
      HELP_PATRIMOINE_HIGH:
        "This option completely separates your personal and professional assets. Recommended for high-risk activities or large investments. Usually involves an SAS or SASU with professional liability insurance.",
      HELP_PATRIMOINE_MEDIUM:
        "Intermediate protection. Your liability may be engaged in specific cases. Suitable for moderate-risk activities. Usually involves an SARL or EURL.",
      HELP_PATRIMOINE_LOW:
        "Limited protection. Your personal assets may be engaged in case of difficulties. Only suitable for very low-risk activities. Usually corresponds to self-employed status.",
      PATRIMOINE_PROTECTION_HIGH: "High legal protection",
      PATRIMOINE_PROTECTION_STANDARD: "Standard legal protection",
      PATRIMOINE_PROTECTION_LIMITED: "Limited legal protection",

      // Questions - Project
      QUESTION_ACTIVITY_TYPE: "Main activity type:",
      OPTION_SERVICES: "Services",
      OPTION_COMMERCE: "Commerce",
      OPTION_ARTISANAT: "Craft",
      OPTION_LIBERAL: "Liberal profession",

      QUESTION_MAIN_ACTIVITY: "Specify your activity:",
      ACTIVITY_PLACEHOLDER: "Describe your activity...",

      QUESTION_START_DATE: "Desired start date?",
      OPTION_ASAP: "As soon as possible",
      OPTION_IN_3_MONTHS: "In 3 months",
      OPTION_IN_6_MONTHS: "In 6 months",

      // Questions - Finance
      QUESTION_PROJECTED_REVENUE: "Expected annual revenue?",
      QUESTION_INITIAL_INVESTMENT: "Planned initial investment?",
      QUESTION_FUNDING_SOURCE: "Main funding source?",
      OPTION_PERSONAL_FUNDS: "Personal funds",
      OPTION_BANK_LOAN: "Bank loan",
      OPTION_INVESTORS: "Investors",

      QUESTION_EMPLOYEE_HIRING: "Do you plan to hire employees?",
      OPTION_HIRE_IMMEDIATE: "Immediate hiring",
      OPTION_HIRE_FUTURE: "Future hiring",
      OPTION_HIRE_NONE: "No hiring planned",

      // Recommendations
      RECOMMENDATIONS_TITLE: "Our recommendations for your project",
      PLEASE_CONFIRM_RECOMMENDATIONS:
        "Please confirm the recommendations before continuing",
      LEGAL_STRUCTURE: "Recommended legal structure",
      RECOMMENDED_BASED_ON: "Recommendation based on your profile and activity",
      PARTNERS_LABEL: "Number of partners",
      ACTIVITY_LABEL: "Main activity",

      // Domiciliation
      DOMICILIATION_RECOMMENDATION: "Recommended domiciliation",
      KOULIER_REASON_1:
        "Prestigious address in the heart of Paris' 8th district",
      KOULIER_REASON_2: "Mail management service included",
      KOULIER_REASON_3: "Simplified registration process",
      KOULIER_REASON_4: "Flexibility to change address easily",
      KOULIER_REASON_5: "Competitive cost from €20/month before tax",
      KOULIER_REASON_6: "Personalized support and responsive customer service",
      LOCAL_REASON_1:
        "Your activity generally requires a professional premises",
      LOCAL_REASON_2: "Better visibility for your customers",
      LOCAL_REASON_3: "Space adapted to your type of activity",
      LOCAL_REASON_4: "Possibility to receive clients and suppliers",

      // Fiscal and social regimes
      HEADQUARTERS_SECTION: "Headquarters",
      FISCAL_SOCIAL_SECTION: "Tax and Social Security Regimes",
      FISCAL_REGIME: "Tax regime",
      SOCIAL_REGIME: "Social security regime",
      TVA_REGIME: "VAT regime",

      // Advantages by category
      CATEGORY_ECONOMIQUE: "Economic advantages",
      CATEGORY_JURIDIQUE: "Legal advantages",
      CATEGORY_FISCAL: "Tax advantages",
      CATEGORY_SOCIAL: "Social advantages",
      CATEGORY_ADMINISTRATIF: "Administrative advantages",
      CATEGORY_AUTRES: "Other advantages",

      // Specific advantages
      BENEFIT_LIABILITY_PROTECTION:
        "Limited liability to contributions, maximum protection of personal assets",
      BENEFIT_FLEXIBLE_STATUTES:
        "High statutory flexibility adapted to your situation",
      BENEFIT_LIMITED_LIABILITY: "Limited liability to contributions",
      BENEFIT_SIMPLICITY: "Simple and well-known legal structure",
      BENEFIT_IS_HIGH_REVENUE: "Corporate Tax advantageous for high revenues",
      BENEFIT_IS_REINVESTMENT:
        "Possibility to reinvest profits with advantageous taxation",
      BENEFIT_IR_SIMPLICITY: "Income Tax for simplicity of tax management",
      BENEFIT_IR_STARTUP: "Ideal for starting activities with low turnover",
      BENEFIT_SOCIAL_ASSIMILE:
        "Employee-like social regime with better social protection",
      BENEFIT_SOCIAL_TNS: "Self-employed regime with lighter social charges",
      BENEFIT_INVESTORS_STRUCTURE: "Structure attractive to investors",
      BENEFIT_CREDIBILITY: "Structure offering good credibility with banks",
      BENEFIT_HIRING_FRAMEWORK: "Suitable framework for hiring employees",

      // Additional services
      ADDITIONAL_SERVICES: "Recommended additional services",
      ACRE_HELP: "ACRE Support",
      ACRE_DESCRIPTION: "Partial exemption from social charges",
      ACCOUNTING_SERVICE: "Accounting service",
      ACCOUNTING_DESCRIPTION: "Recommended for your activity level",
      BANK_ACCOUNT: "Professional account",
      BANK_DESCRIPTION: "Necessary for your bank loan",
      PAYROLL_SERVICE: "Payroll service",
      PAYROLL_DESCRIPTION: "Manage your employees with peace of mind",
      LEGAL_PROTECTION: "Legal protection",
      LEGAL_PROTECTION_DESCRIPTION:
        "Insurance tailored to your desired level of protection",
      BENEFITS_FOR_YOUR_SITUATION: "Benefits for your situation",

      // ========================
      // 1_CompanyBasicInfo
      // ========================
      COMPANY_CREATION: "Company Creation",
      LEGAL_FORM_LABEL: "Legal form *",
      ACTIVITY_SEARCH_PLACEHOLDER: "Search for an activity...",
      ACTIVITY_CATEGORY_LABEL: "Activity category:",
      COMPANY_CHARACTERISTICS: "Characteristics of {{type}}",
      ADVANTAGES: "Advantages:",
      DISADVANTAGES: "Disadvantages:",

      // Company Types Advantages
      EURL_ADVANTAGES:
        "Limited liability to contributions, Free share capital, Flexible tax regime (IR or IS), Simple structure to manage, No plurality of partners required",
      SASU_ADVANTAGES:
        "Limited liability to contributions, Free share capital, Employee-like status, High statutory flexibility, Easy transformation to SAS",
      SARL_ADVANTAGES:
        "Limited liability to contributions, Free share capital, Flexible tax regime (IR or IS), Moderate creation costs, Well-known structure to partners",
      SAS_ADVANTAGES:
        "High statutory freedom, Employee-like status, Free share capital, Modern and dynamic image, Attractive to investors",
      SNC_ADVANTAGES:
        "Tax transparency, No minimum capital, Strong credibility with banks, Possible accounts confidentiality",
      SA_ADVANTAGES:
        "Prestigious image, Easy fundraising, Possibility of stock exchange listing, Clear distinction between management and control",

      // Company Types Disadvantages
      EURL_DISADVANTAGES:
        "Single partner only, Less prestigious image than SAS, Self-employed status for manager, Less attractive to investors",
      SASU_DISADVANTAGES:
        "Single partner only, Higher social charges, More formal requirements, Higher creation costs",
      SARL_DISADVANTAGES:
        "Manager subject to self-employed regime, Assembly formalism, Less modern image than SAS, Expensive transformation to SAS",
      SAS_DISADVANTAGES:
        "High social charges, Higher creation cost, Important formalism, Statutory auditor mandatory in some cases",
      SNC_DISADVANTAGES:
        "Unlimited joint liability, Unanimous agreement for share transfer, All partners are traders, Mandatory IR tax regime",
      SA_DISADVANTAGES:
        "Minimum capital of €37,000, Heavy and complex structure, High operating costs, Minimum 7 shareholders",

      // ========================
      // 2_CompanyNamingAndSocialPurpose
      // ========================
      STEP2_TITLE: "Company Creation",

      // Company Name Guide
      NAME_GUIDE_TITLE: "Guide to choosing your company name",
      NAMING_FORBIDDEN_TITLE: "To avoid:",
      NAMING_TIPS_TITLE: "Tips:",

      // Forbidden Names List
      FORBIDDEN_NAMES: [
        "Protected terms (Order, Institute, National, Municipal...)",
        "Misleading terms (Bank, Insurance if not the actual activity)",
        "Registered trademarks",
        "Names of personalities without authorization",
        "Offensive terms or terms contrary to public order",
      ],

      // Naming Tips List
      NAMING_TIPS: [
        "Check availability on infogreffe.fr",
        "Avoid names too similar to existing brands",
        "Consider the international dimension",
        "Check domain name availability",
        "Ensure the name is easy to pronounce and remember",
      ],

      // Form Labels
      COMPANY_NAME_LABEL: "Company name *",
      COMPANY_NAME_PLACEHOLDER: "Official name of your company",
      COMPANY_NAME_HELP: "This name will appear on all your official documents",

      // Domain Search
      DOMAIN_CHECK_TITLE: "Check availability on Infogreffe:",
      DOMAIN_CHECK_LINK: "See results on Infogreffe",
      DOMAIN_AVAILABILITY_TITLE: "Domain name availability:",
      DOMAIN_AVAILABLE: "Available",
      DOMAIN_TAKEN: "Already taken",
      DOMAIN_RESERVE: "Reserve",

      // Social Purpose
      SOCIAL_PURPOSE_LABEL: "Social purpose *",
      SOCIAL_PURPOSE_PLACEHOLDER: "Detailed description of company activities",
      SOCIAL_PURPOSE_HELP:
        "Describe precisely all activities your company will perform",

      // Company Duration
      DURATION_LABEL: "Company duration (years) *",
      DURATION_HELP: "99 years is the standard duration",

      // Start Date
      START_DATE_LABEL: "Start date *",
      START_DATE_HELP: "Effective start date",

      // Additional Fields Section
      ADDITIONAL_FIELDS_TITLE: "Rarely needed options",
      ADDITIONAL_FIELDS_SUBTITLE: "95% of companies don't use these options",
      ADDITIONAL_FIELDS_WARNING:
        "These options are only useful in specific cases:",
      ADDITIONAL_FIELDS_CASES: [
        "Company groups with multiple brands",
        "Franchises with distinct identity",
        "Complex multi-brand marketing strategies",
      ],

      // Optional Fields
      TRADE_NAME_LABEL: "Trade name (optional)",
      TRADE_NAME_PLACEHOLDER: "Name used for your communication",
      TRADE_NAME_HELP: "Distinct name used for your commercial activities",

      ACRONYM_LABEL: "Acronym (optional)",
      ACRONYM_PLACEHOLDER: "Ex: IBM, NASA...",
      ACRONYM_HELP: "Abbreviated version of your company name",

      SHOP_SIGN_LABEL: "Shop sign (optional)",
      SHOP_SIGN_PLACEHOLDER: "Name visible on your storefront",
      SHOP_SIGN_HELP: "Name used to identify your physical establishment",

      // Important Information
      IMPORTANT_INFO_TITLE: "Important information:",
      IMPORTANT_INFO_ITEMS: [
        "The social purpose must be precise but broad enough to cover your future activities",
        "The start date can be after the registration date",
        "The trade name can be modified more easily than the company name",
      ],

      // Additional Activities
      ADD_OTHER_ACTIVITIES: "Add other activities",
      ADDITIONAL_ACTIVITIES_WARNING_TITLE: "Beware of complexity with INPI!",
      ADDITIONAL_ACTIVITIES_WARNING:
        "Adding secondary activities may complicate registration with INPI and lead to clarification requests. Do you still want to add additional activities?",
      ADDITIONAL_ACTIVITIES: "Secondary activities",
      ACTIVITY: "Activity",
      ACTIVITY_NAME: "Activity name",
      ACTIVITY_NAME_PLACEHOLDER: "Ex: Marketing consulting",
      ACTIVITY_DESCRIPTION: "Description",
      ACTIVITY_DESCRIPTION_PLACEHOLDER: "Short description of the activity",
      ADD_MORE_ACTIVITIES: "Add another activity",

      // ========================
      // 3_CapitalContributionAndPartners
      // ========================
      CAPITAL_ASSOCIES: "Capital and Partners",

      // Capital Variable
      CAPITAL_TYPE: "Share capital type",
      FIXED_CAPITAL_RECOMMENDED: "Fixed capital (recommended)",
      FIXED_CAPITAL_DESC:
        "Fixed capital is the most common and simplest form to manage.",
      FIXED_ADVANTAGE_1: "Clear and stable structure for investors",
      FIXED_ADVANTAGE_2: "Simplified administrative procedures",
      FIXED_ADVANTAGE_3: "Better image with banks and partners",
      FIXED_ADVANTAGE_4: "Simpler day-to-day management",

      VARIABLE_CAPITAL: "Variable capital",
      VARIABLE_CAPITAL_DESC: "Variable capital is suitable for specific cases:",
      VARIABLE_EX_1: "Cooperatives and flexible membership structures",
      VARIABLE_EX_2: "Companies with frequent partner entries/exits",
      VARIABLE_EX_3: "Structures requiring significant capital flexibility",
      WARNING: "Warning:",
      VARIABLE_CAP_WARNING:
        "Variable capital involves increased administrative complexity.",

      // Variable capital limits
      VARIABLE_CAPITAL_LIMITS: "Variable capital limits",
      MINIMUM_CAPITAL: "Minimum capital (€) *",
      MAXIMUM_CAPITAL: "Maximum capital (€) *",
      LEGAL_MINIMUM: "Legal minimum:",
      CAPITAL_MUST_BE_HIGHER: "Must be higher than minimum capital",

      // Important points
      IMPORTANT_POINTS: "Important points:",
      MINIMUM_CAPITAL_REQUIRED: "The minimum required capital is",
      SHARE_DISTRIBUTION_100: "Share distribution must total 100%",
      RELEASE_20_PERCENT:
        "Each partner must release at least 20% of their contribution at creation",
      RELEASE_REST_5YEARS:
        "The remaining capital must be released within 5 years",
      VARIABLE_CAP_MORE_FLEX:
        "Variable capital allows more flexibility in capital evolution",
      VARIABLE_CAP_MUST_STAY_LIMITS:
        "Capital variations must stay within the limits set by the bylaws",

      // Partner information
      ASSOCIATE: "Partner",
      LEGAL_REPRESENTATIVE: "(Legal representative)",
      COMPANY_ROLE: "Company role *",

      // Personal information
      FIRST_NAME: "First name *",
      FIRST_NAME_PLACEHOLDER: "First name",
      SECOND_NAME: "Second name",
      OPTIONAL_SECOND_NAME: "Second name (optional)",
      THIRD_NAME: "Third name",
      OPTIONAL_THIRD_NAME: "Third name (optional)",
      FOURTH_NAME: "Fourth name",
      OPTIONAL_FOURTH_NAME: "Fourth name (optional)",
      LAST_NAME: "Last name *",
      LAST_NAME_PLACEHOLDER: "Family name",

      // Contribution information
      BIRTH_DATE: "Date of birth *",
      BIRTH_PLACE: "Place of birth *",
      NATIONALITY: "Nationality *",
      CONTRIBUTION_TYPE: "Contribution type *",
      APPORT_NUMERAIRE: "Cash",
      APPORT_NATURE: "In kind",
      APPORT_INDUSTRIE: "Industry",
      APPORT_AMOUNT: "Contribution amount (€) *",
      SHARE_PERCENTAGE: "Share percentage",

      // Capital summary
      TOTAL_ESTIMATED_CAPITAL: "Total estimated capital:",
      MINIMUM_REQUIRED: "Minimum required:",
      CAPITAL_CONFIRMATION: "Share capital confirmation *",
      CAPITAL_TO_VALIDATE: "Capital amount to validate",
      VALIDATE_THIS_AMOUNT: "Validate this amount",
      CAPITAL_WILL_BE_IN_STATUTES:
        "This amount will be written in your company's bylaws",

      // Error messages
      CAPITAL_MAX_MUST_BE_SUPERIOR:
        "Maximum capital must be higher than minimum capital",
      SHARES_TOTAL_100: "Share distribution must total 100%",
      CAPITAL_BELOW_MIN:
        "Share capital cannot be less than {{min}}€ for this type of company",

      // Company roles
      ROLE_ALREADY_TAKEN: "This role is already assigned to another partner",
      ROLE_REQUIRED: "A {{role}} must be designated for this type of company",
      ROLE_ALREADY_TAKEN_GERANT:
        "The manager role is already assigned to another partner",
      ROLE_ALREADY_TAKEN_GERANT_EURL:
        "The manager role is already assigned to another partner. In an EURL, there can only be one manager.",
      ROLE_ALREADY_TAKEN_PRESIDENT:
        "The president role is already assigned to another partner",
      ROLE_ALREADY_TAKEN_PRESIDENT_SASU:
        "The president role is already assigned to another partner. In a SASU, there can only be one president.",
      ROLE_ALREADY_TAKEN_DG:
        "The CEO role is already assigned to another partner",
      ROLE_ALREADY_TAKEN_DG_SASU:
        "The CEO role is already assigned to another partner. In a SASU, there can only be one CEO.",
      ROLE_ALREADY_TAKEN_PRESIDENT_CA:
        "The board chairman role is already assigned to another partner",
      ROLE_ALREADY_TAKEN_DG_SA:
        "The CEO role is already assigned to another partner. In an SA, there can only be one CEO.",

      // ========================
      // 4_CompanyHeadquartersAndDomiciliation
      // ========================
      // Important Points for Headquarters
      HEADQUARTERS_DETERMINES_REGISTRATION:
        "The headquarters determines where your company will be registered",
      HEADQUARTERS_CORRESPONDS_LOCAL:
        "It must correspond to a location where administrative activity is carried out",
      HEADQUARTERS_VISIBLE_DOCUMENTS:
        "The address will be visible on all official documents",
      CHANGE_OF_ADDRESS_FORMALITIES:
        "Changing address requires administrative procedures",

      // Domiciliation Types
      CHOOSE_DOMICILIATION_TYPE: "Choose your domiciliation type",

      // Koulier Option
      KOULIER_DOMICILIATION_LABEL:
        "Koulier Business Domiciliation - Recommended",
      ACTIVITY_KOULIER_SUITABLE:
        "Koulier professional domiciliation is ideal for a {{activityType}} activity like yours.",
      ACTIVITY_KOULIER_NOT_IDEAL:
        "For a {{activityType}} activity, a commercial location might be more suitable, but Koulier domiciliation is still possible.",
      ADVANTAGES_INCLUDED: "Included advantages:",
      KOULIER_ADVANTAGE_1:
        "Premium business address in the heart of the 8th district",
      KOULIER_ADVANTAGE_2: "Mail reception and management",
      KOULIER_ADVANTAGE_3: "Scanning and notification of important mail",
      KOULIER_ADVANTAGE_4: "Mail forwarding service on request",
      KOULIER_ADVANTAGE_5: "Access to your online customer area",
      KOULIER_ADVANTAGE_6: "Immediate domiciliation certificate",
      FROM_20_EUROS: "Starting from €20/month excl. tax",

      // Commercial Option
      COMMERCIAL_LOCAL: "Commercial premises",
      COMMERCIAL_LOCATION_NEEDED:
        "For a {{activityType}} activity, a commercial location is generally necessary to welcome your customers and store your goods/equipment.",
      BAIL_COMMERCIAL_COPY: "Copy of commercial lease or property deed",

      // Personal Option
      DOMICILE_DIRIGEANT: "Domiciliation at director's home",
      JUSTIFICATIF_DOMICILE: "Proof of residence less than 3 months old",
      OWNER_AUTHORIZATION: "Owner's authorization (if tenant)",
      PLACEHOLDER_DOMICILE: "Proof of residence",
      PLACEHOLDER_OWNER_AUTH: "Owner's authorization",

      // Address Fields
      KOULIER_DOMICILIATION_ADDRESS: "Koulier domiciliation address",
      ATTESTATION_INSTANT:
        "A domiciliation certificate will be provided instantly",
      ADDRESS_LABEL: "Address *",
      ADDRESS_PLACEHOLDER: "Street number and name",
      ADDRESS_COMPLEMENT: "Address complement",
      ADDRESS_COMPLEMENT_PLACEHOLDER: "Building, floor, etc.",
      POSTAL_CODE: "Postal code *",
      POSTAL_CODE_EX: "Ex: 75001",
      CITY_LABEL: "City *",
      CITY_EX: "Ex: Paris",

      // ========================
      // 5_FiscalAndSocialRegime
      // ========================
      // Titles and headers
      ESTIMATION_ACTIVITE: "Activity Estimation",
      REGIMES_RECOMMANDES: "Recommended Tax and Social Security Regimes",
      THRESHOLDS_ALERTS: "Regulatory threshold alerts",
      HIDE_SIMULATOR: "Hide charges simulator",
      SHOW_SIMULATOR: "Show charges simulator",

      // Turnover
      CA_ANNUEL_HT: "Estimated annual turnover excluding VAT *",
      EX_TURNOVER: "Ex: 50000",
      FISCAL_NEED_TURNOVER:
        "To recommend the most suitable regimes, please indicate your estimated turnover.",

      // Validation messages
      TURNOVER_REQUIRED: "Estimated turnover is required",
      TURNOVER_POSITIVE: "Turnover must be a positive number",
      RECOMMENDATION_ERROR: "Error generating recommendations",

      // Tax regimes
      IR_LABEL: "Personal Income Tax (IR)",
      IS_LABEL: "Corporate Tax (IS)",

      // VAT regimes
      FRANCHISE_BASE_TVA: "VAT basic franchise",
      REAL_SIMPLIFIED: "Simplified real",
      REAL_NORMAL: "Normal real",

      // VAT periodicity
      TVA_PERIODICITY: "VAT periodicity",
      DECLARATION_MENSUELLES: "Monthly declarations",
      DECLARATION_TRIMESTRIELLES: "Quarterly declarations",

      // Social security regimes
      TNS_LABEL: "Self-employed",
      ASSIMILE_LABEL: "Employee-like status",
      ASSIMILE_SAL_AR: "Employee status",

      // Choice confirmation
      CONFIRM_CHOICES: "Confirmation of choices",
      PLEASE_CONFIRM_RECOMMENDATIONS:
        "Please confirm that you have reviewed the recommended regimes.",
      I_CONFIRM_RECOMMENDATIONS:
        "I confirm that I have reviewed the recommendations",

      // Explanatory messages for each regime
      IR_EXPLANATION:
        "IR allows direct taxation of profits on your personal tax return",
      IS_EXPLANATION:
        "IS implies a separation between personal and professional assets",
      TVA_FRANCHISE_EXPLANATION:
        "No VAT to collect or deduct, ideal for low turnover",
      TVA_REEL_EXPLANATION: "Allows VAT deduction on your purchases",
      TNS_EXPLANATION:
        "Traditional self-employed regime with moderate social charges",
      ASSIMILE_EXPLANATION:
        "Social protection similar to employees but higher charges",

      // Activity-specific tips
      SERVICE_FISCAL_TIP:
        "For your service activity, watch the VAT franchise threshold (34,400€). The micro-enterprise regime could be an option to consider when starting if your revenue is low.",
      COMMERCE_FISCAL_TIP:
        "As a merchant, your VAT thresholds are higher (85,800€) and recovering VAT on your purchases can be advantageous from the beginning.",
      ARTISAN_FISCAL_TIP:
        "As a craftsman, consider the various tax charges related to your specific activity. Some trades benefit from particular tax advantages.",
      IR_SERVICE_TIP:
        "For a service activity like yours, IR can be advantageous if your expenses are low.",
      IS_COMMERCE_TIP:
        "For a commercial activity, IS makes it easier to build inventory and investments.",
      FRANCHISE_SERVICE_TIP:
        "The franchise scheme can be interesting for your service activities, especially with individual clients.",
      REAL_COMMERCE_TIP:
        "For your commercial activity, the real regime allows you to recover VAT on your purchases.",
      TNS_ARTISAN_TIP:
        "The TNS status is particularly suitable for craftsmen with moderate social charges.",
      ASSIMILE_SERVICE_TIP:
        "The employee-like status offers you better social protection, important for a service activity.",

      // ========================
      // 6_ClosingDateAndInitialExercise
      // ========================
      CLOSING_DATE_TITLE: "Closing Date and First Financial Year",

      // Important points
      CLOSING_DATE_IMPACT:
        "The closing date determines the end of your financial year",
      CLOSING_DATE_FISCAL_OBLIG:
        "It affects the calendar of your fiscal obligations",
      CLOSING_DATE_SUGGESTION:
        "Choosing December 31st simplifies administrative management",
      CLOSING_DATE_DECALEE:
        "A different closing date may be relevant for certain activities",

      // First exercise type
      FIRST_EXERCISE_TYPE: "First financial year type",
      STANDARD_EXERCISE: "Standard financial year",
      LESS_THAN_12_MONTHS: "Less than 12 months",
      LONG_EXERCISE: "Long financial year",
      MORE_THAN_12_MONTHS: "More than 12 months",
      FISCAL_ADVANTAGE: "Tax advantage (tax deferral)",
      BETTER_TREND_VIEW: "Better visibility of trends",
      MORE_TIME_FOR_ACCOUNTING: "More time for accounting setup",
      LONG_EXERCISE_RECOMMENDATION:
        "Given your start date, a long financial year could be more advantageous for tax purposes.",
      LONG_PERIOD_INFO:
        "Your first financial year will be long (> 12 months), which can be advantageous for tax purposes.",

      // Closing date choice
      CHOOSE_CLOSING_DATE: "Choose closing date",
      RECOMMENDED_DATE_LABEL: "Recommended date",
      OTHER_CLOSING_DATE_LABEL: "Other closing date",

      // Specific dates
      DECEMBER_31: "December 31st",
      MARCH_31: "March 31st",
      JUNE_30: "June 30th",
      SEPT_30: "September 30th",
      DEC_31: "December 31st",
      ALIGNED_FISCAL_YEAR: "Aligned with calendar year",

      // Recommended option
      RECOMMENDED_OPTION: "✨ Recommended option",
      ALIGNED_ANNUAL_CALENDAR: "Alignment with calendar year",
      SIMPLIFIED_FISCAL_DECLARATIONS: "Simplified tax declarations",
      SYNCHRONIZE_PARTNERS: "Synchronization with your partners",
      CLEAR_PERFORMANCE_VIEW: "Clear view of annual performance",

      // Custom date warnings
      CUSTOM_DATE_WARNING: "Important points for a different closing date",
      MORE_COMPLEX_ADMIN: "More complex administrative management",
      FISCAL_YEAR_MISMATCH: "Mismatch with fiscal year",
      POSSIBLE_EXTRA_COSTS: "Possible additional accounting costs",

      // First accounting period
      FIRST_ACCOUNTING_PERIOD: "First accounting period",
      START_DATE_FROM_STEP_2: "Start date defined in step 2:",
      MODIFY_DATE: "Modify",
      ACTIVITY_START_DATE: "Activity start date:",
      FIRST_PERIOD_DURATION: "First period duration: {{months}} months",
      LONG_PERIOD_WARNING:
        "⚠️ This duration is longer than 12 months. A long first period can be fiscally advantageous.",

      // ========================
      // 7_ComplimentaryServices
      // ========================
      // Client profile
      CLIENT_PROFILE: "Client profile",
      STANDARD_CLIENT: "Standard Client",
      SERVICES_RECOMMENDATION:
        "Services adapted to your profile and activity are offered below.",

      // Banking services
      BUSINESS_BANK_ACCOUNT: "Business Bank Account Opening",
      BANK_ACCOUNT_EXPLANATION:
        "A dedicated account makes treasury management easier. We offer advantageous deals with our partners.",
      ALREADY_HAVE_SERVICE: "I already have an account",
      ALREADY_HAVE_BANK_ACCOUNT:
        "You have indicated that you already have a business bank account. If you would like to see our offers anyway, uncheck the box above.",

      // Shine
      SHINE_DESC:
        "The ideal neobank for freelancers and small businesses. 100% online business account.",
      SHINE_ADVANTAGE_1: "Quick and free account opening",
      SHINE_ADVANTAGE_2: "Share capital deposit in a few clicks",
      SHINE_ADVANTAGE_3: "Included invoicing and accounting tools",
      SHINE_INFO_NO_PHYSICAL: "No physical branch",

      // Qonto
      QONTO_DESC: "The all-in-one solution to manage your company's finances.",
      QONTO_ADVANTAGE_1: "Account with French or German IBAN",
      QONTO_ADVANTAGE_2: "Secure virtual and physical cards",
      QONTO_ADVANTAGE_3: "Multi-user management and access rights",
      QONTO_INFO_PRICING: "Pricing adapted to company growth",

      // No bank account
      NO_BANK_ACCOUNT_NOW: "No account for now",
      NO_BANK_ACCOUNT_DESC: "You can always open a business account later.",

      // Accounting services
      ACCOUNTING_SUPPORT: "Accounting Support",
      ACCOUNTING_SUPPORT_DESC:
        "Choose expert support to focus on your core business.",
      ALREADY_HAVE_ACCOUNTING: "I already have an accountant",
      ALREADY_HAVE_ACCOUNTING_SERVICE:
        "You have indicated that you already have an accountant. If you would like to see our offers anyway, uncheck the box above.",

      // Place des Experts
      PLACE_DES_EXPERTS: "Place des Experts",
      PLACE_EXPERT_ADV_1: "Online bookkeeping",
      PLACE_EXPERT_ADV_2: "Social and tax declarations",
      PLACE_EXPERT_ADV_3: "Dashboards and monitoring",
      PLACE_EXPERT_INFO: "Not suitable for complex activities",
      FROM_89_EUROS_MONTH: "Starting from €89/month excl. tax",

      // CaptainCompta
      CAPTAIN_COMPTA_ADV_1: "Complete accounting management",
      CAPTAIN_COMPTA_ADV_2: "Tax advice and optimization",
      CAPTAIN_COMPTA_ADV_3: "Tax audit assistance",
      CAPTAIN_COMPTA_INFO: "Pricing suitable for small structures",
      FROM_149_EUROS_MONTH: "Starting from €149/month excl. tax",

      // Ca Compte Pour Moi
      CACOMPTE_ADV_1: "Unlimited advice from a dedicated expert",
      CACOMPTE_ADV_2: "Fully managed accounting and taxation",
      CACOMPTE_ADV_3: "Activity forecast and development plan",
      CACOMPTE_INFO_PREMIUM: "Premium solution with higher cost",
      FROM_249_EUROS_MONTH: "Starting from €249/month excl. tax",

      // No accounting support
      NO_ACCOUNTING_SUPPORT: "No support for now",

      // Insurance services
      INSURANCE_SUPPORT: "Professional Insurance",
      ALREADY_HAVE_INSURANCE: "I already have insurance",
      INSURANCE_RECOMMENDATION:
        "For your activity, professional liability insurance is strongly recommended.",
      INSURANCE_SUPPORT_DESC:
        "Insurance adapted to your activity protects you against professional risks.",
      INSURANCE_CONTACT_INFO:
        "A specialized advisor will contact you to offer insurance adapted to your activity and specific needs.",
      ALREADY_HAVE_INSURANCE_SERVICE:
        "You have indicated that you already have professional insurance. If you would like more information anyway, uncheck the box above.",

      // ========================
      // 8_FinalReview
      // ========================
      COMPANY_RECAP: "Company Summary",

      // Recap sections
      BASIC_INFO_SECTION: "Basic Information",
      COMPANY_TYPE_LABEL: "Company type",
      NUMBER_OF_ASSOCIATES_LABEL: "Number of partners",
      MAIN_ACTIVITY_LABEL: "Main activity",
      ACTIVITY_CATEGORY_LABEL: "Activity category",

      COMPANY_IDENTITY_SECTION: "Company Identity",
      DENOMINATION_LABEL: "Company name",
      ACRONYM_LABEL: "Acronym",
      SHOP_SIGN_LABEL: "Shop sign",
      SOCIAL_PURPOSE_LABEL: "Social purpose",
      START_DATE_LABEL: "Start date",
      DURATION_LABEL: "Duration",

      CAPITAL_ASSOCIES_SECTION: "Capital and Partners",
      SOCIAL_CAPITAL_LABEL: "Share capital",
      ASSOCIATES_LABEL: "Partners:",
      FULL_NAME_LABEL: "Full name",
      ROLE_LABEL: "Role",
      SHARES_LABEL: "Shares",

      HEADQUARTERS_SECTION: "Headquarters",
      DOMICILIATION_TYPE_LABEL: "Domiciliation type",
      KOULIER_DOMICILIATION: "Koulier Domiciliation",
      LOCAL_COMMERCIAL: "Commercial premises",
      LEADER_HOME: "Director's home",
      ADDRESS_COMPLEMENT_LABEL: "Address complement",
      POSTAL_CODE_LABEL: "Postal code",

      ACCOUNTING_INFO_SECTION: "Accounting Information",
      CLOSING_DATE_LABEL: "Closing date",
      FIRST_EXERCISE_LABEL: "First financial year",

      COMPLIMENTARY_SERVICES_LABEL: "Complementary Services",
      BANKING_SERVICE_LABEL: "Banking service",
      ACCOUNTING_SERVICE_LABEL: "Accounting service",

      // ========================
      // 9_FinalGenerationDocs
      // ========================
      FINAL_GENERATION_DOCS_TITLE: "Generate Common Documents",
      IMPORTANT_INFO: "Important information:",
      VERIFY_BEFORE_SIGNATURE: "Carefully check all documents before signing",
      LEGAL_DOCS:
        "These documents have legal value and will be filed with the registry",

      GENERATING_STATUTS: "Generating statutes...",
      GENERATE_STATUTS: "Generate Statutes",
      GENERATING: "Generating...",
      GENERATE_ALL: "Generate All Documents",
      DOWNLOAD_STATUTS: "Download Statutes",
      DOWNLOAD_M0: "Download M0",
      DOWNLOAD_DNC: "Download DNC",
      DOWNLOAD_RBE: "Download RBE",
      GENERATE_STATUTS_BTN: "Generate Statutes",

      // Errors and messages
      COMPANY_NAME_REQUIRED: "Company name is required",
      COMPANY_TYPE_REQUIRED: "Company type is required",
      ADDRESS_TO_COMPLETE: "Address to be completed",
      DEFAULT_PURPOSE: "Business consulting and services",

      // ========================
      // 10_DocumentUpload
      // ========================
      DOCUMENT_UPLOAD: "Document Upload",
      DOCUMENT_REQUIREMENTS: "Document requirements:",
      CLEAR_SCAN: "Clear and readable scan",
      FILE_FORMATS: "Accepted formats: PDF, JPG, PNG",
      FILE_SIZE: "Maximum size per file: 5 MB",
      VALID_DOCUMENTS: "Documents must be valid and not expired",

      // Document types
      IDENTITY_PROOF: "Identity document",
      IDENTITY_DESCRIPTION: "Valid ID card or passport",
      ADDRESS_PROOF: "Proof of address",
      ADDRESS_DESCRIPTION: "Less than 3 months old (utility bill, internet...)",
      BANK_DETAILS: "Bank details",
      BANK_DESCRIPTION: "Bank account statement in the company's name",
      CAPITAL_DEPOSIT: "Capital deposit certificate",
      CAPITAL_DESCRIPTION: "Document provided by your bank",

      CLICK_OR_DROP: "Click or drag and drop a file",
      SUPPORTED_FORMATS: "PDF, JPG or PNG (max 5 MB)",
      UPLOAD_ALL_DOCUMENTS:
        "Please upload all required documents before continuing.",

      // ========================
      // 11_ElectronicSignature
      // ========================
      ELECTRONIC_SIGNATURE: "Electronic Signature",
      LEGAL_VALUE:
        "Electronic signature has the same legal value as a handwritten signature",
      VERIFY_INFO: "Carefully check all information before signing",
      ALL_PARTNERS:
        "All partners will need to electronically sign the documents",

      GENERATE_STATUTS: "Generate Statutes",
      SEND_TO_YOUSIGN: "Send for signature via Yousign",
      SENDING: "Sending...",
      SENT_TO_YOUSIGN: "Sent for signature",
      DOCUMENTS_SENT: "Documents sent",
      CHECK_EMAIL: "Check your email to complete the signature process.",
      GENERATE_FIRST:
        "Please generate the statutes first before proceeding to signature",

      // Errors and messages
      PLEASE_GENERATE_PDF_FIRST: "Please generate the PDF first.",
      PLEASE_SEND_TO_YOUSIGN:
        "Please send the documents to Yousign before continuing.",
      PDF_GENERATION_ERROR:
        "An error occurred while generating the PDF. Please try again.",
      YOUSIGN_ERROR:
        "An error occurred while sending to Yousign. Please try again.",
      DOC_SENT_TO_YOUSIGN:
        "The documents have been sent to Yousign for signature.",

      // ========================
      // 12_ExpertConsultation
      // ========================
      EXPERT_CONSULTATION_TITLE: "Consultation with an expert",
      BENEFITS_TITLE: "Benefits of consultation:",
      BENEFIT_1: "Verification of your legal and tax choices",
      BENEFIT_2: "Answers to your specific questions",
      BENEFIT_3: "Personalized advice for your activity",
      BENEFIT_4: "Free consultation without commitment",

      // Meeting choice
      WANTS_MEETING_YES: "I would like a meeting",
      MEETING_DESCRIPTION: "An expert will guide you through your choices",
      WANTS_MEETING_NO: "I'll continue without a meeting",
      NO_MEETING_DESCRIPTION: "I'm confident in my choices",

      // Meeting details
      MEETING_DETAILS: "Meeting details",
      MEETING_TYPE: "Meeting type",
      VIDEO_CALL: "Video call",
      PHONE_CALL: "Phone call",
      MEETING_DATE: "Date",
      MEETING_TIME: "Time",
      CHOOSE_TIMESLOT: "Choose a time slot",

      // ========================
      // 13_ApplicationStatusTracking
      // ========================
      DOSSIER_STATUS_TITLE: "Suivi de votre dossier",
      PUBLICATION_JAL_LABEL: "Publication Journal d'annonces légales",
      GREFFE_DEPOSIT_LABEL: "Dépôt au greffe",
      INPI_VALIDATION_LABEL: "Validation INPI",
      INSEE_VALIDATION_LABEL: "Validation INSEE",
      NEXT_STEPS_LABEL: "... etc.",
    },
  },
};
