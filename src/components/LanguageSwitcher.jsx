// src/components/LanguageSwitcher.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Composant LanguageSwitcher
 * Permet de changer la langue via i18next.
 * Conserve tout, pas de suppression.
 */

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
    // On pourrait gérer la classe .rtl si e.target.value === 'ar' 
    // document.body.classList.toggle('rtl', e.target.value === 'ar');
  };

  return (
    <div className="mb-4 flex items-center">
      <label htmlFor="language-select" className="mr-2 font-medium">
        {t('CHOOSE_LANGUAGE', 'Choisissez votre langue')}:
      </label>
      <select
        id="language-select"
        onChange={handleChange}
        value={i18n.language}
        className="p-1 border rounded"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ar">العربية</option>
        {/* etc. */}
      </select>
    </div>
  );
};

export default LanguageSwitcher;