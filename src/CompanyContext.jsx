import React, { createContext, useContext, useReducer, useEffect } from "react";

// Création du contexte
const CompanyContext = createContext();

// État initial
const initialState = {
  currentStep: 0,
  step0: {},
  step1: {
    preQualification: {},
  },
  step2: {
    numberOfPartners: "",
    companyType: "",
    activity: "",
    activityCategory: "",
  },
  step3: {
    companyName: "",
    socialPurpose: "",
    duration: "99",
    startDate: "",
    acronym: "",
    shopSign: "",
  },
  step4: {
    capitalAmount: "",
    partners: [],
  },
  step5: {
    headquartersType: "",
    address: "",
    addressComplement: "",
    postalCode: "",
    city: "",
    domiciliationContract: null,
    ownerAuthorization: null,
  },
  step6: {
    turnoverEstimate: "",
    taxRegime: "",
    vatRegime: "",
    vatPeriodicity: "",
    socialRegime: "",
    hasConfirmedChoices: false,
    recommendations: null,
  },
  step7: {},
  step8: {},
  step9: {},
  step10: {},
  step11: {},
  step12: {},
  step13: {},
  step14: {},
  userPreferences: {
    showAssistant: true,
    showComplexity: true,
    showSimulations: true,
    showChecklist: true,
    showThresholds: true,
  },
};

// Actions du reducer
const ACTIONS = {
  LOAD_SAVED_DATA: "LOAD_SAVED_DATA",
  UPDATE_STEP: "UPDATE_STEP",
  SET_CURRENT_STEP: "SET_CURRENT_STEP",
  RESET_WIZARD: "RESET_WIZARD", // Nouvelle action pour réinitialiser
  UPDATE_USER_PREFERENCES: "UPDATE_USER_PREFERENCES",
};

// Reducer pour gérer les mises à jour d'état
function companyReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_SAVED_DATA:
      return { ...action.payload };

    case ACTIONS.UPDATE_STEP:
      return {
        ...state,
        [`step${action.stepNumber}`]: {
          ...state[`step${action.stepNumber}`],
          ...action.payload,
        },
      };

    case ACTIONS.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };

    case ACTIONS.RESET_WIZARD:
      // Réinitialise l'état complet à sa valeur initiale
      return { ...initialState };

    case ACTIONS.UPDATE_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}

// Provider Component
export function CompanyProvider({ children }) {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  // Vérifier si nous avons un paramètre d'URL pour réinitialiser
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "true") {
      resetWizard();
      // Supprimer le paramètre d'URL pour éviter de réinitialiser à chaque rechargement
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Chargement des données depuis localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("companyRegistrationData");
      if (savedData) {
        const parsed = JSON.parse(savedData);

        // S'assurer que nous démarrons toujours à l'étape 0 lors du premier chargement
        const startFromHome = !localStorage.getItem("wizardInitialized");

        if (startFromHome) {
          // Lors de la première visite, réinitialiser l'étape courante mais garder les données
          localStorage.setItem("wizardInitialized", "true");
          dispatch({
            type: ACTIONS.LOAD_SAVED_DATA,
            payload: { ...parsed, currentStep: 0 },
          });
        } else {
          // Chargement normal lors des visites suivantes
          dispatch({ type: ACTIONS.LOAD_SAVED_DATA, payload: parsed });
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  }, []);

  // Sauvegarde des données dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem("companyRegistrationData", JSON.stringify(state));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données :", error);
    }
  }, [state]);

  // Actions disponibles pour les composants
  const updateStep = (stepNumber, payload) => {
    console.log("Updating step", stepNumber, "with payload:", payload);
    dispatch({ type: ACTIONS.UPDATE_STEP, stepNumber, payload });
  };

  const setCurrentStep = (step) => {
    console.log("Setting current step to:", step);
    dispatch({ type: ACTIONS.SET_CURRENT_STEP, payload: step });
  };

  // Fonction de réinitialisation du Wizard
  const resetWizard = () => {
    console.log("Resetting wizard to initial state");
    // Effacer le localStorage
    localStorage.removeItem("companyRegistrationData");
    localStorage.removeItem("wizardInitialized");
    // Réinitialiser l'état
    dispatch({ type: ACTIONS.RESET_WIZARD });
  };

  const updateUserPreferences = (preferences) => {
    dispatch({ type: ACTIONS.UPDATE_USER_PREFERENCES, payload: preferences });
  };

  // Valeur du contexte
  const value = {
    state,
    updateStep,
    setCurrentStep,
    resetWizard,
    updateUserPreferences,
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within CompanyProvider");
  }
  return context;
}