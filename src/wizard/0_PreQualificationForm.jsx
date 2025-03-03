import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Check,
  ArrowRight,
  Building2,
  UserPlus,
  Calculator,
  AlertTriangle,
  ThumbsDown,
  ThumbsUp,
  Info,
  Shield,
  Scale,
} from "lucide-react";
import { useCompany } from "../CompanyContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import activitiesData from "../data/activities.json";
import PatrimoineProtectionHelp from "../components/PatrimoineProtectionHelp";
import {
  getFilteredActivities,
  isActivitySuitableForKoulier,
} from "../utils/scoringSystem";

// Composant interne pour la confirmation des recommandations
const RecommendationsConfirmation = ({
  recommendations,
  onAccept,
  onDecline,
  t,
}) => {
  // Regrouper les bénéfices par catégories
  const categorizesBenefits = (benefits) => {
    const categories = {
      economique: [],
      juridique: [],
      fiscal: [],
      social: [],
      administratif: [],
      autres: [],
    };

    if (!benefits || !benefits.length) return categories;

    benefits.forEach((benefit) => {
      if (
        benefit.toLowerCase().includes("fiscal") ||
        benefit.toLowerCase().includes("impôt")
      ) {
        categories.fiscal.push(benefit);
      } else if (
        benefit.toLowerCase().includes("social") ||
        benefit.toLowerCase().includes("charges")
      ) {
        categories.social.push(benefit);
      } else if (
        benefit.toLowerCase().includes("responsabilité") ||
        benefit.toLowerCase().includes("protection") ||
        benefit.toLowerCase().includes("patrimoine")
      ) {
        categories.juridique.push(benefit);
      } else if (
        benefit.toLowerCase().includes("financ") ||
        benefit.toLowerCase().includes("invest") ||
        benefit.toLowerCase().includes("banque") ||
        benefit.toLowerCase().includes("économ")
      ) {
        categories.economique.push(benefit);
      } else if (
        benefit.toLowerCase().includes("gestion") ||
        benefit.toLowerCase().includes("démarche") ||
        benefit.toLowerCase().includes("administrat")
      ) {
        categories.administratif.push(benefit);
      } else {
        categories.autres.push(benefit);
      }
    });

    // Filtrer les catégories vides
    return Object.fromEntries(
      Object.entries(categories).filter(([_, arr]) => arr.length > 0)
    );
  };

  const categorizedBenefits = categorizesBenefits(recommendations.key_benefits);

  // Sections principales
  const sections = [
    {
      title: t("BASIC_INFO_SECTION"),
      icon: <Info className="h-5 w-5" />,
      items: [
        { label: t("LEGAL_STRUCTURE"), value: recommendations.companyForm },
        { label: t("PARTNERS_LABEL"), value: recommendations.partners },
        { label: t("ACTIVITY_LABEL"), value: recommendations.activity },
      ],
    },
    {
      title: t("HEADQUARTERS_SECTION"),
      icon: <Building2 className="h-5 w-5" />,
      content: {
        main: recommendations.domiciliation.recommended,
        details: recommendations.domiciliation.reasons,
      },
    },
    {
      title: t("FISCAL_SOCIAL_SECTION"),
      icon: <Calculator className="h-5 w-5" />,
      items: [
        { label: t("FISCAL_REGIME"), value: recommendations.fiscal.regime },
        { label: t("TVA_REGIME"), value: recommendations.fiscal.tva },
        {
          label: t("PATRIMOINE_PROTECTION"),
          value: recommendations.patrimoineProtection || t("NOT_SELECTED"),
        },
      ],
    },
  ];

  const additionalServices = recommendations.additional.map((service) => ({
    title: service.title,
    description: service.description,
  }));

  return (
    <div className="w-full space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <AlertTriangle className="h-5 w-5 text-blue-500" />
        <AlertDescription className="text-blue-700">
          {t("PLEASE_CONFIRM_RECOMMENDATIONS")}
        </AlertDescription>
      </Alert>

      {Object.keys(categorizedBenefits).length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Scale className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg text-green-800">
              {t("BENEFITS_FOR_YOUR_SITUATION")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(categorizedBenefits).map(([category, benefits]) => (
              <div key={category} className="mb-4">
                <h4 className="text-md font-semibold text-green-700 capitalize mb-2">
                  {t(`CATEGORY_${category.toUpperCase()}`, category)}
                </h4>
                <ul className="list-disc pl-5 text-green-700 space-y-2">
                  {benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {sections.map((section, index) => (
        <Card key={index} className="bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
            {section.icon}
            <CardTitle className="text-lg">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {section.items ? (
              <div className="space-y-2">
                {section.items.map(
                  (item, i) =>
                    item.value && (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{item.label}:</span>
                        <span>{item.value}</span>
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="font-medium">{section.content.main}</div>
                <ul className="list-disc pl-5 space-y-1">
                  {section.content.details.map((detail, i) => (
                    <li key={i} className="text-gray-600">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {additionalServices.length > 0 && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">
              {t("ADDITIONAL_SERVICES")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {additionalServices.map((service, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{service.title}</div>
                  <div className="text-sm text-gray-600">
                    {service.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center gap-4 pt-6">
        <Button
          onClick={onDecline}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ThumbsDown className="w-4 h-4" />
          {t("MODIFY")}
        </Button>
        <Button
          onClick={onAccept}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <ThumbsUp className="w-4 h-4" />
          {t("START_COMPANY_CREATION")}
        </Button>
      </div>

      <p className="text-sm text-center text-gray-500">
        {t("CHECK_BEFORE_CONTINUING")}
      </p>
    </div>
  );
};

const FORM_STEPS = {
  QUESTIONNAIRE: "questionnaire",
  CONFIRMATION: "confirmation",
};

// Composant principal PreQualificationForm
const PreQualificationForm = () => {
  const { t } = useTranslation();
  const { updateStep, setCurrentStep } = useCompany();

  const [formStep, setFormStep] = useState(FORM_STEPS.QUESTIONNAIRE);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState({});
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showActivitiesList, setShowActivitiesList] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [showPatrimoineHelp, setShowPatrimoineHelp] = useState(null);

  useEffect(() => {
    // Lorsque creationMode change, réinitialiser exactPartners si nécessaire
    if (answers.creationMode === "alone") {
      setAnswers((prev) => ({ ...prev, exactPartners: "1" }));
    }
  }, [answers.creationMode]);

  const questionGroups = [
    {
      title: t("PREQUAL_PROFILE_TITLE"),
      icon: <UserPlus className="w-6 h-6" />,
      questions: [
        {
          id: "entrepreneurStatus",
          text: t("QUESTION_ENTREPRENEUR_STATUS"),
          type: "radio",
          options: [
            { value: "first_time", label: t("OPTION_FIRST_TIME") },
            { value: "already", label: t("OPTION_ALREADY") },
          ],
        },
        {
          id: "creationMode",
          text: t("QUESTION_CREATION_MODE"),
          type: "radio",
          options: [
            { value: "alone", label: t("OPTION_ALONE") },
            { value: "multiple", label: t("OPTION_MULTIPLE") },
          ],
        },
        {
          id: "exactPartners",
          text: t("QUESTION_EXACT_PARTNERS_NUMBERS", "Nombre exact d'associés"),
          type: "select",
          options: Array.from({ length: 99 }, (_, i) => ({
            value: String(i + 1),
            label: String(i + 1),
          })),
          condition: (answers) => answers.creationMode === "multiple",
        },
        {
          id: "currentSituation",
          text: t("QUESTION_CURRENT_SITUATION"),
          type: "select",
          options: [
            { value: "employed", label: t("OPTION_EMPLOYED") },
            { value: "unemployed", label: t("OPTION_UNEMPLOYED") },
            { value: "student", label: t("OPTION_STUDENT") },
            { value: "retired", label: t("OPTION_RETIRED") },
          ],
        },
        {
          id: "patrimoineProtection",
          text: t(
            "QUESTION_PATRIMOINE_PROTECTION",
            "Protection de votre patrimoine personnel"
          ),
          type: "radio",
          options: [
            {
              value: "high",
              label: t(
                "OPTION_PATRIMOINE_HIGH",
                "Protection maximale (recommandé)"
              ),
            },
            {
              value: "medium",
              label: t("OPTION_PATRIMOINE_MEDIUM", "Protection moyenne"),
            },
            {
              value: "low",
              label: t("OPTION_PATRIMOINE_LOW", "Protection minimale"),
            },
          ],
          help: true,
        },
      ],
    },
    {
      title: t("PREQUAL_PROJECT_TITLE"),
      icon: <Building2 className="w-6 h-6" />,
      questions: [
        {
          id: "activityType",
          text: t("QUESTION_ACTIVITY_TYPE"),
          type: "select",
          options: [
            { value: "SERVICE", label: t("OPTION_SERVICES") },
            { value: "COMMERCE", label: t("OPTION_COMMERCE") },
            { value: "ARTISANAT", label: t("OPTION_ARTISANAT") },
            { value: "PROFESSION_LIBERALE", label: t("OPTION_LIBERAL") },
          ],
        },
        {
          id: "mainActivity",
          text: t("QUESTION_MAIN_ACTIVITY"),
          type: "autocomplete",
        },
        {
          id: "startDate",
          text: t("QUESTION_START_DATE"),
          type: "radio",
          options: [
            { value: "immediate", label: t("OPTION_ASAP") },
            { value: "3months", label: t("OPTION_IN_3_MONTHS") },
            { value: "6months", label: t("OPTION_IN_6_MONTHS") },
          ],
        },
      ],
    },
    {
      title: t("PREQUAL_FINANCIAL_TITLE"),
      icon: <Calculator className="w-6 h-6" />,
      questions: [
        {
          id: "projectedRevenue",
          text: t("QUESTION_PROJECTED_REVENUE"),
          type: "input", // Changé de "radio" à "input"
          placeholder: "Ex: 50000",
        },
        {
          id: "initialInvestment",
          text: t("QUESTION_INITIAL_INVESTMENT"),
          type: "input", // Changé de "radio" à "input"
          placeholder: "Ex: 10000",
        },
        {
          id: "fundingSource",
          text: t("QUESTION_FUNDING_SOURCE"),
          type: "radio",
          options: [
            { value: "personal", label: t("OPTION_PERSONAL_FUNDS") },
            { value: "bank", label: t("OPTION_BANK_LOAN") },
            { value: "investors", label: t("OPTION_INVESTORS") },
          ],
        },
        {
          id: "employeeHiring",
          text: t("QUESTION_EMPLOYEE_HIRING", "Prévoyez-vous des embauches ?"),
          type: "radio",
          options: [
            {
              value: "immediate",
              label: t("OPTION_HIRE_IMMEDIATE", "Embauche immédiate"),
            },
            {
              value: "future",
              label: t("OPTION_HIRE_FUTURE", "Embauche future"),
            },
            {
              value: "none",
              label: t("OPTION_HIRE_NONE", "Pas d'embauche prévue"),
            },
          ],
        },
      ],
    },
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    // Si la question concerne la protection du patrimoine, on affiche l'aide correspondante
    if (questionId === "patrimoineProtection") {
      setShowPatrimoineHelp(value);
    }

    // Si la question est le type d'activité principale, on réinitialise l'activité sélectionnée
    if (questionId === "activityType") {
      setAnswers((prev) => ({ ...prev, mainActivity: "" }));
      setFilteredActivities([]);
    }
  };

  const handleActivitySearch = (searchText) => {
    handleAnswer("mainActivity", searchText);

    // Filtrer les activités à partir du fichier d'activités en fonction du type d'activité principale
    let filtered = activitiesData;

    if (answers.activityType) {
      filtered = getFilteredActivities(activitiesData, answers.activityType);
    }

    // Appliquer le filtre de recherche
    filtered = filtered
      .filter((activity) =>
        activity.display.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(0, 8); // Limiter à 8 suggestions

    setFilteredActivities(filtered);
    setShowActivitiesList(searchText.length > 0 && filtered.length > 0);
  };

  const getRecommendedCompanyForm = () => {
    // Protection du patrimoine est un facteur important
    const patrimoineProtection = answers.patrimoineProtection || "medium";
    const isAlone = answers.creationMode === "alone";
    const projectedRevenue = parseInt(answers.projectedRevenue) || 0;
    const hasEmployees =
      answers.employeeHiring === "immediate" ||
      answers.employeeHiring === "future";

    // Déterminer le type de société
    if (isAlone) {
      // Pour entrepreneur seul
      if (patrimoineProtection === "high") {
        return "SASU"; // Meilleure protection du patrimoine
      } else if (projectedRevenue > 85000 || hasEmployees) {
        return "SASU"; // Meilleur pour des revenus élevés ou avec employés
      } else {
        return "EURL"; // Option standard pour entrepreneur seul
      }
    } else {
      // Pour plusieurs associés
      if (
        patrimoineProtection === "high" ||
        projectedRevenue > 85000 ||
        hasEmployees
      ) {
        return "SAS"; // Meilleure structure pour associés multiples et protection
      } else {
        return "SARL"; // Option standard pour plusieurs associés
      }
    }
  };

  const getPatrimoineProtectionExplanation = (companyForm) => {
    switch (companyForm) {
      case "SASU":
      case "SAS":
        return t("PATRIMOINE_PROTECTION_HIGH", "Protection juridique élevée");
      case "EURL":
      case "SARL":
        return t(
          "PATRIMOINE_PROTECTION_STANDARD",
          "Protection juridique standard"
        );
      default:
        return t(
          "PATRIMOINE_PROTECTION_LIMITED",
          "Protection juridique limitée"
        );
    }
  };

  const generateKeyBenefits = (recommendations) => {
    const benefits = [];
    const companyForm = recommendations.companyForm;
    const patrimoineProtection = answers.patrimoineProtection;
    const projectedRevenue = parseInt(answers.projectedRevenue) || 0;
    const fundingSource = answers.fundingSource;
    const hasEmployees = answers.employeeHiring !== "none";

    // Avantages juridiques
    if (companyForm === "SASU" || companyForm === "SAS") {
      benefits.push(
        t(
          "BENEFIT_LIABILITY_PROTECTION",
          "Responsabilité limitée aux apports, protection maximale du patrimoine personnel"
        )
      );
      benefits.push(
        t(
          "BENEFIT_FLEXIBLE_STATUTES",
          "Grande flexibilité statutaire adaptée à votre situation"
        )
      );
    } else if (companyForm === "EURL" || companyForm === "SARL") {
      benefits.push(
        t("BENEFIT_LIMITED_LIABILITY", "Responsabilité limitée aux apports")
      );
      benefits.push(
        t("BENEFIT_SIMPLICITY", "Structure juridique simple et bien connue")
      );
    }

    // Avantages fiscaux
    if (recommendations.fiscal.regime === "IS") {
      if (projectedRevenue > 85000) {
        benefits.push(
          t(
            "BENEFIT_IS_HIGH_REVENUE",
            "Impôt sur les Sociétés avantageux pour des revenus élevés"
          )
        );
      }
      benefits.push(
        t(
          "BENEFIT_IS_REINVESTMENT",
          "Possibilité de réinvestir les bénéfices avec une fiscalité avantageuse"
        )
      );
    } else {
      benefits.push(
        t(
          "BENEFIT_IR_SIMPLICITY",
          "Impôt sur le Revenu pour une simplicité de gestion fiscale"
        )
      );
      if (projectedRevenue < 35000) {
        benefits.push(
          t(
            "BENEFIT_IR_STARTUP",
            "Idéal pour les débuts d'activité à faible chiffre d'affaires"
          )
        );
      }
    }

    // Avantages sociaux
    if (companyForm === "SASU" || companyForm === "SAS") {
      benefits.push(
        t(
          "BENEFIT_SOCIAL_ASSIMILE",
          "Régime social assimilé-salarié avec meilleure protection sociale"
        )
      );
    } else {
      benefits.push(
        t(
          "BENEFIT_SOCIAL_TNS",
          "Régime TNS avec des charges sociales plus légères"
        )
      );
    }

    // Avantages économiques
    if (fundingSource === "investors") {
      benefits.push(
        t(
          "BENEFIT_INVESTORS_STRUCTURE",
          "Structure attractive pour les investisseurs"
        )
      );
    } else if (fundingSource === "bank") {
      benefits.push(
        t(
          "BENEFIT_CREDIBILITY",
          "Structure offrant une bonne crédibilité auprès des banques"
        )
      );
    }

    if (hasEmployees) {
      benefits.push(
        t(
          "BENEFIT_HIRING_FRAMEWORK",
          "Cadre adapté pour l'embauche de salariés"
        )
      );
    }

    return benefits;
  };

  const generateRecommendations = () => {
    // Déterminer le nombre d'associés précis
    const partners =
      answers.creationMode === "alone" ? "1" : answers.exactPartners || "2";

    // Déterminer la forme juridique recommandée
    const companyForm = getRecommendedCompanyForm();

    // Trouver l'activité détaillée si sélectionnée dans la liste
    let activityDetail = "";
    let selectedActivity = null;

    if (answers.mainActivity) {
      selectedActivity = activitiesData.find(
        (act) => act.display === answers.mainActivity
      );

      if (selectedActivity) {
        activityDetail = selectedActivity.detail;
      }
    }

    // Déterminer si l'activité est adaptée à une domiciliation Koulier
    const suitableForKoulier = selectedActivity
      ? isActivitySuitableForKoulier(selectedActivity)
      : true;

    // Construire les recommandations
    const recs = {
      companyForm: companyForm,
      partners: partners,
      activity: answers.mainActivity,
      activityDetail: activityDetail,
      domiciliation: {
        recommended: suitableForKoulier ? "Koulier" : "Local professionnel",
        reasons: suitableForKoulier
          ? [
              t(
                "KOULIER_REASON_1",
                "Adresse prestigieuse au cœur du 8ème arrondissement de Paris"
              ),
              t("KOULIER_REASON_2", "Service de gestion du courrier inclus"),
              t("KOULIER_REASON_3", "Processus d'immatriculation simplifié"),
              t(
                "KOULIER_REASON_4",
                "Flexibilité pour changer d'adresse facilement"
              ),
              t(
                "KOULIER_REASON_5",
                "Coût compétitif à partir de 20€ HT par mois"
              ),
              t(
                "KOULIER_REASON_6",
                "Accompagnement personnalisé et support client réactif"
              ),
            ]
          : [
              t(
                "LOCAL_REASON_1",
                "Votre activité nécessite généralement un local professionnel"
              ),
              t("LOCAL_REASON_2", "Meilleure visibilité pour votre clientèle"),
              t("LOCAL_REASON_3", "Espace adapté à votre type d'activité"),
              t(
                "LOCAL_REASON_4",
                "Possibilité de recevoir clients et fournisseurs"
              ),
            ],
      },
      fiscal: {
        regime:
          parseInt(answers.projectedRevenue) > 85000 ||
          companyForm === "SASU" ||
          companyForm === "SAS"
            ? "IS"
            : "IR",
        tva: parseInt(answers.projectedRevenue) < 35000 ? "franchise" : "réel",
      },
      patrimoineProtection: getPatrimoineProtectionExplanation(companyForm),
      additional: [],
    };

    // Générer les avantages clés de cette recommandation
    recs.key_benefits = generateKeyBenefits(recs);

    // Ajouter des services additionnels selon le profil
    if (answers.currentSituation === "unemployed") {
      recs.additional.push({
        title: t("ACRE_HELP", "Aide ACRE"),
        description: t(
          "ACRE_DESCRIPTION",
          "Exonération partielle de charges sociales"
        ),
      });
    }

    if (parseInt(answers.projectedRevenue) > 35000) {
      recs.additional.push({
        title: t("ACCOUNTING_SERVICE", "Service comptable"),
        description: t(
          "ACCOUNTING_DESCRIPTION",
          "Recommandé pour votre niveau d'activité"
        ),
      });
    }

    if (answers.fundingSource === "bank") {
      recs.additional.push({
        title: t("BANK_ACCOUNT", "Compte professionnel"),
        description: t(
          "BANK_DESCRIPTION",
          "Nécessaire pour votre prêt bancaire"
        ),
      });
    }

    if (answers.employeeHiring === "immediate") {
      recs.additional.push({
        title: t("PAYROLL_SERVICE", "Service de paie"),
        description: t("PAYROLL_DESCRIPTION", "Gérez vos salariés sereinement"),
      });
    }

    // Protection juridique pour entrepreneur à risque élevé
    if (answers.patrimoineProtection === "high") {
      recs.additional.push({
        title: t("LEGAL_PROTECTION", "Protection juridique"),
        description: t(
          "LEGAL_PROTECTION_DESCRIPTION",
          "Assurance adaptée à votre niveau de protection souhaité"
        ),
      });
    }

    return recs;
  };

  const handleFinish = () => {
    const recs = generateRecommendations();
    setRecommendations(recs);
    setFormStep(FORM_STEPS.CONFIRMATION);
    setProgress(100);
  };

  const handleAcceptRecommendations = () => {
    // Préparation de la date de début basée sur les réponses
    const calculateStartDate = () => {
      const today = new Date();

      if (answers.startDate === "immediate") {
        return today.toISOString().split("T")[0];
      } else {
        const daysToAdd = answers.startDate === "3months" ? 90 : 180;
        const futureDate = new Date(
          today.getTime() + daysToAdd * 24 * 60 * 60 * 1000
        );
        return futureDate.toISOString().split("T")[0];
      }
    };

    // Détermination du nombre de partenaires et du type de société approprié
    const getCompanyTypeDetails = () => {
      // Utiliser le nombre exact d'associés si disponible
      const partners =
        answers.creationMode === "alone" ? "1" : answers.exactPartners || "2";

      return {
        partners: partners,
        type: recommendations.companyForm,
      };
    };

    // Détermination de la catégorie d'activité basée sur l'activité principale
    const determineActivityCategory = (activity) => {
      // Vérifier d'abord si cette activité existe dans la liste officielle
      const foundActivity = activitiesData.find(
        (act) => act.display === activity
      );

      if (foundActivity) {
        return foundActivity.classification;
      }

      // Par défaut, basé sur le choix de l'utilisateur à l'étape de préqualification
      return answers.activityType || "SERVICE";
    };

    // Génération d'un objet social basé sur l'activité
    const generateSocialPurpose = (activity, activityDetail) => {
      // Si on a le détail de l'activité, l'utiliser
      if (activityDetail) {
        return `Objet principal : ${activityDetail}

Autres activités : Toutes activités connexes ou complémentaires pouvant se rattacher directement ou indirectement à l'objet social.
Import, export, achat, vente, distribution de tous produits non réglementés liés à l'activité principale.
Conseil, formation et assistance dans les domaines liés à l'objet social.
Et plus généralement, toutes opérations industrielles, commerciales, financières, mobilières ou immobilières, se rapportant directement ou indirectement à l'objet social.`;
      }

      // Sinon, utiliser l'activité simple
      if (!activity) return "";

      return `Objet principal : ${activity}

Autres activités : Toutes activités connexes ou complémentaires pouvant se rattacher directement ou indirectement à l'objet social.
Import, export, achat, vente, distribution de tous produits non réglementés liés à l'activité principale.
Conseil, formation et assistance dans les domaines liés à l'objet social.
Et plus généralement, toutes opérations industrielles, commerciales, financières, mobilières ou immobilières, se rapportant directement ou indirectement à l'objet social.`;
    };

    // Détermination de la domiciliation recommandée
    const getDomiciliationType = () => {
      // Si une recommandation de domiciliation existe, l'utiliser
      if (
        recommendations.domiciliation &&
        recommendations.domiciliation.recommended
      ) {
        const recommendedDomiciliation =
          recommendations.domiciliation.recommended.toLowerCase();

        if (recommendedDomiciliation.includes("koulier")) {
          return "koulier";
        } else if (
          recommendedDomiciliation.includes("commercial") ||
          recommendedDomiciliation.includes("professionnel")
        ) {
          return "commercial";
        } else if (
          recommendedDomiciliation.includes("personnel") ||
          recommendedDomiciliation.includes("dirigeant") ||
          recommendedDomiciliation.includes("domicile")
        ) {
          return "personal";
        }
      }

      // Par défaut, recommander Koulier
      return "koulier";
    };

    // Création d'un partenaire basique
    const createBasicPartner = (isFirstPartner, companyType) => {
      // Détermination du rôle par défaut en fonction du type de société
      let defaultRole = "associe"; // Associé par défaut

      if (isFirstPartner) {
        if (["EURL", "SARL"].includes(companyType)) {
          defaultRole = "gerant";
        } else if (["SASU", "SAS"].includes(companyType)) {
          defaultRole = "president";
        }
      }

      return {
        firstName: "",
        lastName: "",
        birthDate: "",
        birthPlace: "",
        nationality: "Française",
        capitalContribution: "",
        contributionType: "numeraire",
        role: defaultRole,
        sharePercentage: "",
      };
    };

    // Détermination du montant du capital en fonction du type de société
    const getMinimumCapital = (companyType) => {
      if (companyType === "SA") return 37000;
      return 1; // Montant minimal pour autres types
    };

    // Estimation du capital basée sur l'investissement initial
    const estimateCapital = (companyType) => {
      // Conversion de la plage d'investissement en valeur numérique
      let estimatedCapital = parseInt(answers.initialInvestment) || 1000;

      const minCapital = getMinimumCapital(companyType);

      // Assurer que le capital est au moins le minimum requis
      return Math.max(estimatedCapital, minCapital);
    };

    // Fonction pour convertir la chaîne de chiffre d'affaires en nombre
    function parseTurnoverToNumber(turnoverValue) {
      const turnover = parseInt(turnoverValue);
      return isNaN(turnover) ? 50000 : turnover;
    }

    // Préparer les variables nécessaires pour l'objet updates
    const startDate = calculateStartDate();
    const companyTypeDetails = getCompanyTypeDetails();
    const activityCategory = determineActivityCategory(answers.mainActivity);
    const domiciliationType = getDomiciliationType();
    const capitalAmount = estimateCapital(companyTypeDetails.type);
    const numericTurnover = parseTurnoverToNumber(answers.projectedRevenue);

    // Créer les partenaires avec le bon type de société
    const partners = Array(parseInt(companyTypeDetails.partners))
      .fill(null)
      .map((_, index) =>
        createBasicPartner(index === 0, companyTypeDetails.type)
      );

    // Mise à jour du contexte avec toutes les étapes pré-remplies
    const updates = {
      // Étape 1 : CompanyBasicInfo
      step2: {
        partners: companyTypeDetails.partners,
        type: companyTypeDetails.type,
        activity: answers.mainActivity,
        category: activityCategory,
      },

      // Étape 2 : CompanyNamingAndSocialPurpose
      step3: {
        companyName: "", // À saisir par l'utilisateur
        socialPurpose: generateSocialPurpose(
          answers.mainActivity,
          recommendations.activityDetail
        ),
        duration: "99", // Durée standard
        startDate: startDate,
        acronym: "",
        shopSign: "",
      },

      // Étape 3 : CapitalContributionAndPartners
      step4: {
        capitalAmount: capitalAmount.toString(),
        partners: partners,
      },

      // Étape 4 : CompanyHeadquartersAndDomiciliation
      step5: {
        headquartersType: domiciliationType,
        address: domiciliationType === "koulier" ? "44 rue Pasquier" : "",
        addressComplement: "",
        postalCode: domiciliationType === "koulier" ? "75008" : "",
        city: domiciliationType === "koulier" ? "Paris" : "",
        domiciliationContract: null,
        ownerAuthorization: null,
      },

      // Étape 5 : FiscalAndSocialRegime
      step6: {
        turnoverEstimate: numericTurnover.toString(),
        taxRegime: recommendations.fiscal.regime,
        vatRegime: recommendations.fiscal.tva,
        vatPeriodicity: "monthly", // Périodicité par défaut
        socialRegime:
          companyTypeDetails.type === "SASU" ||
          companyTypeDetails.type === "SAS"
            ? "assimile"
            : "TNS",
        hasConfirmedChoices: true,
        recommendations: {
          taxRegime: {
            regime: recommendations.fiscal.regime,
            explanation: "Régime préqualifié selon votre profil",
          },
          vatRegime: {
            regime: recommendations.fiscal.tva,
            periodicity: "monthly",
            explanation:
              "Régime TVA préqualifié selon votre chiffre d'affaires prévisionnel",
          },
          socialRegime: {
            regime:
              companyTypeDetails.type === "SASU" ||
              companyTypeDetails.type === "SAS"
                ? "assimile"
                : "TNS",
            explanation: "Régime social adapté à votre forme juridique",
          },
          summary: {
            message: `Recommandations basées sur votre CA prévisionnel et votre activité de type ${activityCategory.toLowerCase()}.`,
          },
        },
      },

      // Étape 6 : ClosingDateAndInitialExercise
      step7: {
        closingMonth: "12",
        closingDay: "31",
        startDate: startDate,
      },

      // Étape 7 : Services complémentaires
      step8: {
        complementaryServices: {
          bankAccount: recommendations.additional.some(
            (s) => s.title === t("BANK_ACCOUNT")
          )
            ? "shine"
            : "",
          accounting: recommendations.additional.some(
            (s) => s.title === t("ACCOUNTING_SERVICE")
          )
            ? "placedesexperts"
            : "",
        },
      },
    };

    // Mise à jour du contexte avec toutes les étapes pré-remplies
    Object.entries(updates).forEach(([step, data]) => {
      updateStep(parseInt(step.replace("step", "")), data);
    });

    // Passage à l'étape suivante (step2 = CompanyBasicInfo)
    setCurrentStep(2);
  };

  const handleDeclineRecommendations = () => {
    // Si l'utilisateur refuse les recommandations, on passe simplement à l'étape suivante
    // sans pré-remplir les formulaires
    setCurrentStep(2);
  };

  const renderQuestion = (question) => {
    // Si la question a une condition et que la condition n'est pas remplie, ne pas afficher la question
    if (question.condition && !question.condition(answers)) {
      return null;
    }

    switch (question.type) {
      case "radio":
        return (
          <div className="space-y-3">
            {question.options.map((option, optIdx) => (
              <div
                key={optIdx}
                className={
                  "flex items-center p-4 rounded-lg border-2 transition-all duration-200 " +
                  (answers[question.id] === option.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200 hover:bg-gray-50")
                }
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={() => handleAnswer(question.id, option.value)}
                  className="h-5 w-5 text-blue-600"
                />
                <label className="ml-3 flex-grow cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
            {question.help && showPatrimoineHelp && (
              <PatrimoineProtectionHelp level={showPatrimoineHelp} />
            )}
          </div>
        );

      case "select":
        return (
          <select
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">{t("SELECT_OPTION")}</option>
            {question.options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "input":
        return (
          <Input
            type="number"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-3"
          />
        );

      case "autocomplete":
        return (
          <div className="relative">
            <Input
              type="text"
              value={answers[question.id] || ""}
              onChange={(e) => handleActivitySearch(e.target.value)}
              placeholder={t("ACTIVITY_PLACEHOLDER")}
              className="w-full p-3 border rounded-lg"
            />
            {showActivitiesList && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredActivities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="p-3 hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      handleAnswer(question.id, activity.display);
                      setShowActivitiesList(false);
                    }}
                  >
                    <div className="font-medium">{activity.display}</div>
                    <div className="text-xs text-gray-500">
                      {activity.category}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderCurrentStep = () => {
    switch (formStep) {
      case FORM_STEPS.QUESTIONNAIRE:
        return (
          <>
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {questionGroups[currentGroup].icon}
                </div>
                <h2 className="text-2xl font-bold">
                  {questionGroups[currentGroup].title}
                </h2>
              </div>

              <div className="space-y-8">
                {questionGroups[currentGroup].questions
                  .map((question, idx) => (
                    <div key={idx} className="space-y-4">
                      {renderQuestion(question) && (
                        <label className="block text-lg font-medium">
                          {question.text}
                        </label>
                      )}
                      {renderQuestion(question)}
                    </div>
                  ))
                  .filter(Boolean)}
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
              <div className="flex space-x-4">
                <Button
                  onClick={() => setCurrentGroup((prev) => prev - 1)}
                  variant="outline"
                  disabled={currentGroup === 0}
                >
                  {t("PREVIOUS")}
                </Button>
                <Button onClick={() => setAnswers({})} variant="outline">
                  {t("RESET")}
                </Button>
              </div>
              <Button
                onClick={() => {
                  if (currentGroup < questionGroups.length - 1) {
                    setCurrentGroup((prev) => prev + 1);
                    setProgress(
                      (currentGroup + 2) * (100 / questionGroups.length)
                    );
                  } else {
                    handleFinish();
                  }
                }}
                className="bg-blue-600 text-white"
              >
                {currentGroup === questionGroups.length - 1 ? (
                  t("FINISH")
                ) : (
                  <>
                    {t("NEXT")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        );

      case FORM_STEPS.CONFIRMATION:
        return (
          <RecommendationsConfirmation
            recommendations={recommendations}
            onAccept={handleAcceptRecommendations}
            onDecline={handleDeclineRecommendations}
            t={t}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {t("PREQUAL_FORM_TITLE")}
        </CardTitle>
        <div className="space-y-3">
          <Progress value={progress} className="h-3 rounded-full bg-gray-100" />
          <p className="text-sm text-gray-600 text-center">
            {Math.round(progress)}% {t("COMPLETED")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <LanguageSwitcher />
        {renderCurrentStep()}
      </CardContent>
    </Card>
  );
};

export default PreQualificationForm;
