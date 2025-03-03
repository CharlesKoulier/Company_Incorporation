// src/components/SimulateurCharges.jsx

import React, { useState, useEffect } from 'react';
import { useCompany } from '../CompanyContext';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { AlertTriangle, Info, Calculator, DollarSign, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { calculateTaxes, calculateSocialCharges, getLegalResponsibilities } from '../helpers/simulationEngine';

const SimulateurCharges = () => {
  const { state } = useCompany();
  const { t } = useTranslation();
  
  const [estimatedTurnover, setEstimatedTurnover] = useState(
    state.step6?.turnoverEstimate || '60000'
  );
  const [expenses, setExpenses] = useState('20000');
  const [salary, setSalary] = useState('35000');
  const [showFullReport, setShowFullReport] = useState(false);
  const [simulation, setSimulation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Récupérer les infos essentielles depuis le contexte
  const companyType = state.step2?.companyType || 'SAS';
  const taxRegime = state.step6?.taxRegime || 'IS';
  const vatRegime = state.step6?.vatRegime || 'franchise';
  const socialRegime = state.step6?.socialRegime || 'TNS';
  
  useEffect(() => {
    calculateSimulation();
  }, [estimatedTurnover, expenses, salary, companyType, taxRegime, vatRegime, socialRegime]);

  const calculateSimulation = () => {
    // Convertir en nombres
    const turnover = parseFloat(estimatedTurnover) || 0;
    const expensesValue = parseFloat(expenses) || 0;
    const salaryValue = parseFloat(salary) || 0;
    
    // Calculer impôts et taxes
    const taxes = calculateTaxes({
      turnover,
      expenses: expensesValue,
      salary: salaryValue,
      companyType,
      taxRegime,
      vatRegime
    });
    
    // Calculer charges sociales
    const socialCharges = calculateSocialCharges({
      salary: salaryValue,
      companyType,
      socialRegime,
      taxRegime
    });
    
    // Calculer résultat net
    const netProfit = Math.max(0, turnover - expensesValue - taxes.totalTaxes - socialCharges.totalCharges);
    const netProfitAfterSalary = Math.max(0, netProfit - salaryValue);
    
    // Calculer les pourcentages
    const expensesPercentage = Math.round((expensesValue / turnover) * 100) || 0;
    const taxesPercentage = Math.round((taxes.totalTaxes / turnover) * 100) || 0;
    const socialChargesPercentage = Math.round((socialCharges.totalCharges / turnover) * 100) || 0;
    const salaryPercentage = Math.round((salaryValue / turnover) * 100) || 0;
    const netProfitPercentage = Math.round((netProfitAfterSalary / turnover) * 100) || 0;
    
    // Récupérer les responsabilités légales
    const legalResponsibilities = getLegalResponsibilities(companyType);
    
    setSimulation({
      turnover,
      expenses: expensesValue,
      expensesPercentage,
      taxes,
      taxesPercentage,
      socialCharges,
      socialChargesPercentage,
      salary: salaryValue,
      salaryPercentage,
      netProfit,
      netProfitAfterSalary,
      netProfitPercentage,
      legalResponsibilities
    });
  };

  const renderNetProfitBar = () => {
    if (!simulation) return null;
    
    const barItems = [
      { label: t('EXPENSES', 'Dépenses'), percentage: simulation.expensesPercentage, color: 'bg-blue-300' },
      { label: t('TAXES', 'Impôts'), percentage: simulation.taxesPercentage, color: 'bg-amber-400' },
      { label: t('SOCIAL_CHARGES', 'Charges sociales'), percentage: simulation.socialChargesPercentage, color: 'bg-red-400' },
      { label: t('SALARY', 'Rémunération'), percentage: simulation.salaryPercentage, color: 'bg-green-400' },
      { label: t('NET_PROFIT', 'Résultat Net'), percentage: simulation.netProfitPercentage, color: 'bg-violet-500' }
    ];

    return (
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2">{t('TURNOVER_DISTRIBUTION', "Répartition du chiffre d'affaires")}</h4>
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden flex">
          {barItems.map((item, index) => (
            <div 
              key={index} 
              className={`${item.color} h-full`} 
              style={{ width: `${item.percentage}%` }}
              title={`${item.label}: ${item.percentage}%`}
            ></div>
          ))}
        </div>
        <div className="flex text-xs mt-1 justify-between">
          {barItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-2 h-2 ${item.color} rounded-full mr-1`}></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="mb-8 border-violet-200">
      <CardHeader className="bg-violet-50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calculator className="h-5 w-5 text-violet-600 mr-2" />
            <CardTitle className="text-lg text-violet-800">
              {t('TAX_SOCIAL_SIMULATION', 'Simulation fiscale et sociale')}
            </CardTitle>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-violet-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-violet-600" />
          )}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('ANNUAL_TURNOVER', 'Chiffre d\'affaires annuel HT')}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={estimatedTurnover}
                      onChange={(e) => setEstimatedTurnover(e.target.value)}
                      className="w-full p-2 border rounded-l-md"
                      min="0"
                    />
                    <span className="px-3 py-2 bg-gray-100 border-y border-r rounded-r-md">€</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('ANNUAL_EXPENSES', 'Dépenses professionnelles annuelles')}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={expenses}
                      onChange={(e) => setExpenses(e.target.value)}
                      className="w-full p-2 border rounded-l-md"
                      min="0"
                    />
                    <span className="px-3 py-2 bg-gray-100 border-y border-r rounded-r-md">€</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('ANNUAL_SALARY', 'Rémunération annuelle souhaitée')}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="w-full p-2 border rounded-l-md"
                      min="0"
                    />
                    <span className="px-3 py-2 bg-gray-100 border-y border-r rounded-r-md">€</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              {simulation && (
                <div>
                  <h3 className="font-medium text-lg mb-4 text-gray-800">
                    {t('SIMULATION_RESULTS', 'Résultats de la simulation')}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">{t('SOCIAL_CHARGES', 'Charges sociales')}:</span>
                      <span className="font-medium">{simulation.socialCharges.totalCharges.toLocaleString()} €</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">{t('TAXES', 'Impôts et taxes')}:</span>
                      <span className="font-medium">{simulation.taxes.totalTaxes.toLocaleString()} €</span>
                    </div>
                    
                    <div className="flex justify-between text-violet-700">
                      <span className="font-medium">{t('NET_PROFIT_AFTER_SALARY', 'Résultat net après rémunération')}:</span>
                      <span className="font-medium">{simulation.netProfitAfterSalary.toLocaleString()} €</span>
                    </div>
                  </div>
                  
                  {renderNetProfitBar()}
                  
                  <div className="mt-4">
                    <button
                      onClick={() => setShowFullReport(!showFullReport)}
                      className="text-sm text-violet-600 hover:text-violet-800 flex items-center"
                    >
                      {showFullReport ? (
                        <>
                          {t('SHOW_LESS', 'Voir moins')}
                          <ChevronUp className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          {t('SHOW_DETAILED_REPORT', 'Voir le rapport détaillé')}
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Rapport détaillé */}
          {showFullReport && simulation && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium text-lg mb-4">
                {t('DETAILED_REPORT', 'Rapport détaillé')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Charges sociales */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium flex items-center text-blue-800 mb-3">
                    <UserCheck className="h-5 w-5 mr-2" />
                    {t('SOCIAL_CHARGES_DETAIL', 'Détail des charges sociales')}
                  </h4>
                  
                  <ul className="space-y-2 text-sm">
                    {Object.entries(simulation.socialCharges.details).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span>{t(key, key)}</span>
                        <span className="font-medium">{value.toLocaleString()} €</span>
                      </li>
                    ))}
                    <li className="flex justify-between font-medium border-t border-blue-200 pt-2 mt-2">
                      <span>{t('TOTAL', 'Total')}</span>
                      <span>{simulation.socialCharges.totalCharges.toLocaleString()} €</span>
                    </li>
                  </ul>
                </div>
                
                {/* Impôts et taxes */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="font-medium flex items-center text-amber-800 mb-3">
                    <DollarSign className="h-5 w-5 mr-2" />
                    {t('TAX_DETAIL', 'Détail des impôts et taxes')}
                  </h4>
                  
                  <ul className="space-y-2 text-sm">
                    {Object.entries(simulation.taxes.details).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span>{t(key, key)}</span>
                        <span className="font-medium">{value.toLocaleString()} €</span>
                      </li>
                    ))}
                    <li className="flex justify-between font-medium border-t border-amber-200 pt-2 mt-2">
                      <span>{t('TOTAL', 'Total')}</span>
                      <span>{simulation.taxes.totalTaxes.toLocaleString()} €</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Responsabilités légales */}
              <div className="mt-6 bg-violet-50 rounded-lg p-4">
                <h4 className="font-medium flex items-center text-violet-800 mb-3">
                  <Info className="h-5 w-5 mr-2" />
                  {t('LEGAL_RESPONSIBILITIES', 'Responsabilités légales')}
                </h4>
                
                <ul className="space-y-2 text-sm">
                  {simulation.legalResponsibilities.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default SimulateurCharges;