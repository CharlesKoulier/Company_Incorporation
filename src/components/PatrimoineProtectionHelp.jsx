// components/PatrimoineProtectionHelp.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from './ui/alert';

const PatrimoineProtectionHelp = ({ level }) => {
  const { t } = useTranslation();
  
  const getHelpContent = () => {
    switch (level) {
      case 'high':
        return {
          title: t('OPTION_PATRIMOINE_HIGH', 'Protection maximale (recommandé)'),
          description: t('HELP_PATRIMOINE_HIGH', 
            "Cette option sépare totalement votre patrimoine personnel et professionnel. Recommandée pour les activités à risque ou fort investissement. Implique généralement une SAS ou SASU avec assurance RC Pro.")
        };
      case 'medium':
        return {
          title: t('OPTION_PATRIMOINE_MEDIUM', 'Protection moyenne'),
          description: t('HELP_PATRIMOINE_MEDIUM', 
            "Protection intermédiaire. Votre responsabilité peut être engagée dans certains cas spécifiques. Adapté aux activités à risque modéré. Implique généralement une SARL ou EURL.")
        };
      case 'low':
        return {
          title: t('OPTION_PATRIMOINE_LOW', 'Protection minimale'),
          description: t('HELP_PATRIMOINE_LOW', 
            "Protection limitée. Votre patrimoine personnel peut être engagé en cas de difficultés. Adapté uniquement aux activités à très faible risque. Correspond généralement au statut d'auto-entrepreneur.")
        };
      default:
        return null;
    }
  };
  
  const content = getHelpContent();
  
  if (!content) return null;
  
  return (
    <Alert className="mt-2 bg-blue-50 border-blue-200">
      <AlertDescription>
        <strong>{content.title}</strong>: {content.description}
      </AlertDescription>
    </Alert>
  );
};

export default PatrimoineProtectionHelp;