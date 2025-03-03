// src/components/AlertesSeuils.jsx

import React, { useState, useEffect } from 'react';
import { useCompany } from '../CompanyContext';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { AlertTriangle, Check, ChevronDown, ChevronUp, Info, DollarSign, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { getThresholds } from '../data/seuilsReglementaires';

const AlertesSeuils = () => {
  const { state } = useCompany();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [thresholds, setThresholds] = useState([]);
  const [companySituation, setCompanySituation] = useState({
    turnover: 0,
    vatRegime: '',
    companyType: '',
    socialRegime: '',
    activity: '',
    hasEmployees: false
  });

  // Récupérer et mettre à jour les informations importantes de l'entreprise
  useEffect(() => {
    setCompanySituation({
      turnover: parseFloat(state.step6?.turnoverEstimate) || 0,
      vatRegime: state.step6?.vatRegime || 'franchise',
      companyType: state.step2?.companyType || 'SAS',
      socialRegime: state.step6?.socialRegime || 'TNS',
      activity: state.step2?.activity || '',
      // À adapter selon le contexte de votre application
      hasEmployees: false
    });
  }, [state.step6?.turnoverEstimate, state.step6?.vatRegime, state.step2?.companyType, state.step6?.socialRegime, state.step2?.activity]);

  // Récupérer les seuils applicables à l'entreprise
  useEffect(() => {
    const applicableThresholds = getThresholds(companySituation);
    
    // Trier les seuils par priorité
    applicableThresholds.sort((a, b) => {
      // Les seuils imminents d'abord
      if (a.isImminent && !b.isImminent) return -1;
      if (!a.isImminent && b.isImminent) return 1;
      
      // Sinon par ordre croissant de valeur
      return a.value - b.value;
    });
    
    setThresholds(applicableThresholds);
  }, [companySituation]);

  // Formater la valeur d'un seuil
  const formatThresholdValue = (value, unit) => {
    switch (unit) {
      case 'percentage':
        return `${value}%`;
      case 'employees':
        return value === 1 
          ? `${value} ${t('EMPLOYEE', 'salarié')}`
          : `${value} ${t('EMPLOYEES', 'salariés')}`;
      case 'euros':
      default:
        return `${value.toLocaleString()} €`;
    }
  };

  // Déterminer le statut d'un seuil
  const getThresholdStatus = (threshold) => {
    if (threshold.isImminent) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        className: 'bg-amber-50 border-amber-200'
      };
    }
    
    if (threshold.value < companySituation.turnover) {
      return {
        icon: <Check className="h-5 w-5 text-green-500" />,
        className: 'bg-green-50 border-green-200'
      };
    }
    
    return {
      icon: <Info className="h-5 w-5 text-blue-500" />,
      className: 'bg-blue-50 border-blue-200'
    };
  };

  // Calculer le pourcentage jusqu'au prochain seuil
  const calculatePercentageToNextThreshold = (threshold) => {
    const turnover = companySituation.turnover;
    if (turnover >= threshold.value) return 100;
    
    // Trouver le seuil précédent
    const lowerThresholds = thresholds.filter(t => t.value < threshold.value && t.unit === 'euros');
    const previousThreshold = lowerThresholds.length > 0 
      ? Math.max(...lowerThresholds.map(t => t.value))
      : 0;
    
    // Calculer le pourcentage
    const range = threshold.value - previousThreshold;
    const progress = turnover - previousThreshold;
    
    return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
  };

  return (
    <Card className="mb-8 border-amber-200">
      <CardHeader className="bg-amber-50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
            <CardTitle className="text-lg text-amber-800">
              {t('THRESHOLD_ALERTS', 'Alertes seuils réglementaires')}
            </CardTitle>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-amber-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-amber-600" />
          )}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-4">
          {/* Situation actuelle de l'entreprise */}
          <div className="p-4 bg-white rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-violet-600 mr-2" />
              <h3 className="font-medium text-violet-800">
                {t('CURRENT_SITUATION', 'Situation actuelle')}
              </h3>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-500">{t('ANNUAL_TURNOVER', "Chiffre d'affaires annuel")}</div>
                  <div className="font-medium">{companySituation.turnover.toLocaleString()} €</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">{t('COMPANY_TYPE', "Type d'entreprise")}</div>
                <div className="font-medium">{companySituation.companyType}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">{t('VAT_REGIME', "Régime de TVA")}</div>
                <div className="font-medium capitalize">
                  {companySituation.vatRegime === 'franchise' 
                    ? t('VAT_FRANCHISE', 'Franchise en base')
                    : companySituation.vatRegime}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">{t('SOCIAL_REGIME', "Régime social")}</div>
                <div className="font-medium">{companySituation.socialRegime}</div>
              </div>
            </div>
          </div>
          
          {/* Message d'information sur les seuils */}
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertDescription className="text-blue-700">
              {t('THRESHOLDS_INFO', 'Les seuils réglementaires sont des niveaux de chiffre d\'affaires ou d\'effectifs qui déclenchent des obligations spécifiques pour votre entreprise.')}
            </AlertDescription>
          </Alert>
          
          {/* Liste des seuils */}
          {thresholds.length > 0 ? (
            <div className="space-y-4">
              {thresholds.map((threshold, index) => {
                const status = getThresholdStatus(threshold);
                const percentageToThreshold = threshold.unit === 'euros' 
                  ? calculatePercentageToNextThreshold(threshold)
                  : null;
                
                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${status.className}`}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">{status.icon}</div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            {threshold.isImminent && (
                              <span className="text-amber-600 mr-2">
                                {t('APPROACHING', 'Seuil imminent')}:
                              </span>
                            )}
                            {formatThresholdValue(threshold.value, threshold.unit)}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {threshold.category}
                          </span>
                        </div>
                        
                        <p className="text-sm mt-1">{threshold.description}</p>
                        
                        {threshold.unit === 'euros' && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{t('YOUR_TURNOVER', 'Votre CA')}: {companySituation.turnover.toLocaleString()} €</span>
                              <span>{formatThresholdValue(threshold.value, threshold.unit)}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div 
                                className={`h-full rounded-full ${threshold.isImminent ? 'bg-amber-500' : 'bg-blue-500'}`}
                                style={{ width: `${percentageToThreshold}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {threshold.impacts && threshold.impacts.length > 0 && (
                          <div className="mt-3">
                            <details className="text-sm">
                              <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                                {t('SHOW_IMPACTS', 'Voir les impacts')}
                              </summary>
                              <ul className="mt-2 pl-5 list-disc text-gray-600 space-y-1">
                                {threshold.impacts.map((impact, i) => (
                                  <li key={i}>{impact}</li>
                                ))}
                              </ul>
                            </details>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-4 text-gray-500">
              {t('NO_THRESHOLDS', 'Aucun seuil applicable trouvé pour votre situation.')}
            </div>
          )}
          
          {/* Lien d'information supplémentaire */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <a 
              href="https://www.economie.gouv.fr/entreprises/seuils-entreprises" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              {t('LEARN_MORE_THRESHOLDS', 'En savoir plus sur les seuils d\'effectifs et de chiffre d\'affaires')}
            </a>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AlertesSeuils;