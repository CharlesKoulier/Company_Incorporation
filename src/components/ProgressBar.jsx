// components/ProgressBar.jsx
import React from 'react';
import { useCompany } from '../CompanyContext';
import { Progress } from './ui/progress';
import { useTranslation } from 'react-i18next';

const ProgressBar = () => {
  const { state } = useCompany();
  const { t } = useTranslation();
  
  // Définition des étapes et de leur poids dans la progression
  const steps = [
    { id: 1, label: t('PREQUALIFICATION'), weight: 1 },
    { id: 2, label: t('COMPANY_BASIC_INFO'), weight: 1 },
    { id: 3, label: t('COMPANY_NAMING'), weight: 1 },
    { id: 4, label: t('CAPITAL_PARTNERS'), weight: 1 },
    { id: 5, label: t('HEADQUARTERS'), weight: 1 },
    { id: 6, label: t('FISCAL_SOCIAL'), weight: 1 },
    { id: 7, label: t('CLOSING_DATE'), weight: 1 },
    { id: 8, label: t('COMPLIMENTARY_SERVICES'), weight: 1 },
    { id: 9, label: t('FINAL_REVIEW'), weight: 0.5 },
    { id: 10, label: t('DOCUMENTS_GENERATION'), weight: 0.5 },
    { id: 11, label: t('DOCUMENT_UPLOAD'), weight: 0.5 },
    { id: 12, label: t('EXPERT_CONSULTATION'), weight: 0.5 },
    { id: 13, label: t('APPLICATION_STATUS'), weight: 0.5 },
    { id: 14, label: t('FINAL_CONFIRMATION'), weight: 0.5 }
  ];
  
  // Calcul du pourcentage de progression
  const calculateProgress = () => {
    const currentStep = state.currentStep;
    
    if (currentStep === 0) return 0; // Étape d'entrée
    
    // Somme totale des poids
    const totalWeight = steps.reduce((acc, step) => acc + step.weight, 0);
    
    // Somme des poids jusqu'à l'étape actuelle
    const completedWeight = steps
      .filter(step => step.id < currentStep)
      .reduce((acc, step) => acc + step.weight, 0);
    
    // Calcul du pourcentage
    return Math.round((completedWeight / totalWeight) * 100);
  };
  
  // Ne pas afficher la barre à l'étape 0 (page d'accueil)
  if (state.currentStep === 0) return null;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>{t('PROGRESS', 'Progression')}</span>
        <span>{calculateProgress()}%</span>
      </div>
      <Progress value={calculateProgress()} />
    </div>
  );
};

export default ProgressBar;