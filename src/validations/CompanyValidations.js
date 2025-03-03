import { useTranslation } from "react-i18next";

// Comme c'est un simple fichier JS, on n'a pas de composant React. 
// Donc on ne peut pas utiliser useTranslation directement. 
// On pourrait importer i18n et faire i18n.t("CLE")... 
// Mais tu ne l'as pas spécifié, je laisse tel quel si tu préfères.

export function validateBirthDate(birthDate, isEmancipated) {
  // on imagine un import i18n from '../i18n'; ...
  const bd = new Date(birthDate);
  if (isNaN(bd.getTime())) {
    return "Date de naissance invalide. Besoin d'aide ?"; 
    // i18n.t("BIRTHDATE_INVALID", "Date de naissance invalide. Besoin d'aide ?")
  }
  // ...
}