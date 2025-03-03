// src/components/ChecklistResume.jsx

import React, { useState, useEffect } from 'react';
import { useCompany } from '../CompanyContext';
import { useTranslation } from 'react-i18next';
import { 
  CheckCircle, CheckSquare, Clock, Calendar, AlertCircle, 
  ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';
import { getChecklistItems } from '../data/checklistData';

/**
 * Composant ChecklistResume
 * Version résumée de la ChecklistDemarrage pour l'étape de revue finale
 */
const ChecklistResume = () => {
  const { state } = useCompany();
  const { t } = useTranslation();
  const [completedItems, setCompletedItems] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const [priorityTasks, setPriorityTasks] = useState([]);

  useEffect(() => {
    // Récupérer les items en fonction du profil de l'entreprise
    const items = getChecklistItems({
      companyType: state.step2?.companyType || 'SAS',
      activity: state.step2?.activity || '',
      headquartersType: state.step5?.headquartersType || 'koulier',
      hasEmployees: false // Par défaut, à adapter selon votre contexte
    });
    
    setChecklistItems(items);
    
    // Récupérer les éléments déjà complétés s'ils existent dans le stockage local
    const savedCompletedItems = localStorage.getItem('checklistCompletedItems');
    if (savedCompletedItems) {
      setCompletedItems(JSON.parse(savedCompletedItems));
    }

    // Identifier les tâches prioritaires (immediate et first-week)
    const urgentTasks = items.flatMap(category => 
      category.items.filter(item => 
        item.timeframe === 'immediate' || item.timeframe === 'first-week'
      )
    ).slice(0, 5); // Limiter à 5 tâches prioritaires
    
    setPriorityTasks(urgentTasks);
  }, [state.step2?.companyType, state.step2?.activity, state.step5?.headquartersType]);

  useEffect(() => {
    // Calculer la progression
    if (checklistItems.length > 0) {
      const allTasks = checklistItems.flatMap(category => category.items);
      const completedCount = allTasks.filter(item => completedItems[item.id]).length;
      const progressPercentage = Math.round((completedCount / allTasks.length) * 100);
      setProgress(progressPercentage);
    }
  }, [checklistItems, completedItems]);

  // Obtenir l'icône pour l'échéance
  const getTimeframeIcon = (timeframe) => {
    switch (timeframe) {
      case 'immediate':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'first-week':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'first-month':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  // Obtenir le texte pour l'échéance
  const getTimeframeText = (timeframe) => {
    switch (timeframe) {
      case 'immediate':
        return <span className="text-red-600">{t('IMMEDIATE', 'Immédiat')}</span>;
      case 'first-week':
        return <span className="text-amber-600">{t('FIRST_WEEK', 'Première semaine')}</span>;
      case 'first-month':
        return <span className="text-blue-600">{t('FIRST_MONTH', 'Premier mois')}</span>;
      case 'three-months':
        return <span className="text-gray-600">{t('THREE_MONTHS', 'Trois mois')}</span>;
      default:
        return <span className="text-gray-600">{t('LATER', 'Plus tard')}</span>;
    }
  };

  // Version résumée de la checklist
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center">
          <CheckSquare className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-medium text-green-800">
            {t('STARTUP_CHECKLIST', 'Check-list de démarrage')}
          </h3>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-green-700 mr-2">{progress}% {t('COMPLETED', 'complété')}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4 text-green-600" /> : <ChevronDown className="h-4 w-4 text-green-600" />}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
        <div 
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Section résumée - toujours visible */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-green-800 mb-2">
          {t('PRIORITY_TASKS', 'Tâches prioritaires')}:
        </h4>
        <ul className="space-y-2">
          {priorityTasks.map((task) => (
            <li key={task.id} className="flex items-start">
              {completedItems[task.id] ? (
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                getTimeframeIcon(task.timeframe)
              )}
              <span className={`text-sm ${completedItems[task.id] ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section détaillée - visible seulement si expanded */}
      {isExpanded && (
        <div className="mt-4 border-t border-green-200 pt-4">
          {checklistItems.map((category) => (
            <div key={category.id} className="mb-4">
              <h4 className="font-medium text-green-700 mb-2">{category.title}</h4>
              <ul className="space-y-2">
                {category.items.slice(0, 3).map((item) => (
                  <li key={item.id} className="flex items-start">
                    {completedItems[item.id] ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    ) : (
                      getTimeframeIcon(item.timeframe)
                    )}
                    <div>
                      <span className={`text-sm ${completedItems[item.id] ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                        {item.title}
                      </span>
                      <div className="text-xs text-gray-500">
                        {getTimeframeText(item.timeframe)}
                      </div>
                    </div>
                  </li>
                ))}
                {category.items.length > 3 && (
                  <li className="text-xs text-green-600">
                    + {category.items.length - 3} autres tâches
                  </li>
                )}
              </ul>
            </div>
          ))}
          
          <div className="mt-4 text-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.print();
              }}
              className="text-sm text-green-600 hover:text-green-800 inline-flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              {t('DOWNLOAD_CHECKLIST', 'Télécharger ma check-list complète')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistResume;