// documents/statutsTemplate.js

/**
 * Générateur de statuts d'entreprise
 * Génère un document de statuts juridiques basé sur les informations saisies
 * aux étapes précédentes du parcours de création d'entreprise.
 */

/**
 * Génère la définition PDF des statuts pour pdfMake
 * @param {Object} data - Données minimales nécessaires
 * @returns {Object} - Définition du document pour pdfMake
 */
export const generateStatutsPdfDefinition = (data) => {
  // Validation des données essentielles
  if (!data) {
    throw new Error("Aucune donnée fournie pour la génération des statuts");
  }

  // Extraction et normalisation des données d'entreprise
  const normalizedData = extractCompanyData(data);

  // Génération du contenu des statuts en fonction du type d'entreprise
  let statutsContent;
  try {
    switch (normalizedData.companyType) {
      case "SASU":
        statutsContent = generateSasuStatuts(normalizedData);
        break;
      case "SARL":
        statutsContent = generateSarlStatuts(normalizedData);
        break;
      case "EURL":
        statutsContent = generateEurlStatuts(normalizedData);
        break;
      case "SAS":
      default:
        statutsContent = generateSasStatuts(normalizedData);
        break;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la génération du contenu des statuts:",
      error
    );
    throw new Error(
      "Erreur lors de la génération du contenu des statuts: " + error.message
    );
  }

  // Structure du document pour pdfMake
  try {
    return {
      pageSize: "A4",
      pageMargins: [40, 60, 40, 60],
      content: [
        { text: normalizedData.companyName.toUpperCase(), style: "header" },
        { text: `STATUTS ${normalizedData.companyType}`, style: "subheader" },
        {
          text: `Capital social: ${normalizedData.capitalAmount} euros`,
          style: "subheader",
        },
        {
          text: `Siège social: ${normalizedData.headquartersAddress}`,
          style: "address",
        },
        { text: "\n\n" },
        { text: statutsContent, style: "content" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 5],
        },
        address: {
          fontSize: 12,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        content: {
          fontSize: 10,
          alignment: "justify",
          lineHeight: 1.5,
        },
      },
      defaultStyle: {
        font: "Roboto",
      },
    };
  } catch (error) {
    console.error("Erreur lors de la création de la définition PDF:", error);
    throw new Error(
      "Erreur lors de la création de la définition PDF: " + error.message
    );
  }
};

/**
 * Génère les statuts de l'entreprise en format PDF (sous forme de base64)
 * @param {Object} companyData - Données collectées durant les étapes 0-6
 * @returns {Promise<string>} Document PDF encodé en base64
 */
export const generateStatuts = async (companyData) => {
  try {
    // En réalité, cette fonction appellerait un service de génération PDF
    // Ici, nous simulons cette génération avec un template de statuts
    const statutsTemplate = generateStatutsTemplate(companyData);

    // Simule une conversion en PDF base64
    // Dans une implémentation réelle, on utiliserait une lib pour générer le PDF
    const base64Statuts = await mockGeneratePDF(statutsTemplate);

    return base64Statuts;
  } catch (error) {
    console.error("Erreur lors de la génération des statuts:", error);
    throw error;
  }
};

/**
 * Génère le contenu des statuts en fonction du type d'entreprise et des données saisies
 * @param {Object} companyData - Données de l'entreprise
 * @returns {string} Contenu textuel des statuts
 */
const generateStatutsTemplate = (companyData) => {
  const {
    companyName,
    companyType,
    companyActivity,
    socialPurpose,
    capitalAmount,
    partners,
    startDate,
    duration,
    headquartersAddress,
    closingDate,
    fiscalRegime,
  } = extractCompanyData(companyData);

  // Sélectionner le template de statuts en fonction du type d'entreprise
  switch (companyType) {
    case "SASU":
      return generateSasuStatuts(companyData);
    case "SAS":
      return generateSasStatuts(companyData);
    case "SARL":
      return generateSarlStatuts(companyData);
    case "EURL":
      return generateEurlStatuts(companyData);
    default:
      return generateSasStatuts(companyData); // Par défaut, utiliser SAS
  }
};

/**
 * Extrait et normalise les données d'entreprise à partir de l'état global
 * @param {Object} companyData - État global ou objet agrégé des données d'entreprise
 * @returns {Object} Données normalisées pour génération des statuts
 */
const extractCompanyData = (companyData) => {
  let data = {};

  // Permet de gérer les différentes structures possibles
  if (companyData.state) {
    // Si companyData contient l'état global
    const { state } = companyData;

    data = {
      companyName:
        state.step2?.companyName || state.step3?.companyName || "Ma Société",
      companyType: state.step2?.type || state.step2?.companyType || "SAS",
      companyActivity: state.step2?.activity || "Activité non spécifiée",
      socialPurpose: state.step3?.socialPurpose || "Objet social par défaut",
      capitalAmount: parseInt(state.step4?.capitalAmount, 10) || 1000,
      partners: state.step4?.partners || [],
      startDate:
        state.step3?.startDate || new Date().toISOString().split("T")[0],
      duration: state.step3?.duration || "99",
      headquartersAddress: getFormattedAddress(state.step5),
      closingDate: getClosingDate(state.step7),
      fiscalRegime: state.step6?.taxRegime || "IS",
    };
  } else {
    // Si companyData est déjà un objet formatté
    data = {
      companyName: companyData.companyName || "Ma Société",
      companyType: companyData.companyType || companyData.type || "SAS",
      companyActivity: companyData.companyActivity || "Activité non spécifiée",
      socialPurpose: companyData.socialPurpose || "Objet social par défaut",
      capitalAmount: parseInt(companyData.capitalAmount, 10) || 1000,
      partners: companyData.partners || [],
      startDate:
        companyData.startDate || new Date().toISOString().split("T")[0],
      duration: companyData.duration || "99",
      headquartersAddress:
        companyData.headquartersAddress || "Adresse non spécifiée",
      closingDate: companyData.closingDate || "31 décembre",
      fiscalRegime: companyData.fiscalRegime || "IS",
    };
  }

  // Validation des données essentielles
  if (!data.companyName) {
    throw new Error("Le nom de l'entreprise est requis");
  }

  if (!data.companyType) {
    throw new Error("Le type d'entreprise est requis");
  }

  return data;
};

/**
 * Génère une adresse formatée à partir des données de l'étape 5
 * @param {Object} step5 - Données de l'étape 5 (siège social)
 * @returns {string} Adresse formatée
 */
const getFormattedAddress = (step5) => {
  if (!step5) return "Adresse non spécifiée";

  if (step5.headquartersType === "koulier") {
    return "44 rue Pasquier, 75008 Paris";
  }

  const address = step5.address || "";
  const addressComplement = step5.addressComplement
    ? `${step5.addressComplement}, `
    : "";
  const postalCode = step5.postalCode || "";
  const city = step5.city || "";

  return `${address}, ${addressComplement}${postalCode} ${city}`
    .replace(", ,", ",")
    .trim();
};

/**
 * Génère une date de clôture formatée à partir des données de l'étape 7
 * @param {Object} step7 - Données de l'étape 7 (date de clôture)
 * @returns {string} Date de clôture formatée
 */
const getClosingDate = (step7) => {
  if (!step7) return "31 décembre";

  const day = step7.closingDay || "31";
  const month = step7.closingMonth || "12";

  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const monthName = monthNames[parseInt(month, 10) - 1];

  return `${day} ${monthName}`;
};

/**
 * Formate la liste des associés pour les statuts
 * @param {Array} partners - Liste des associés
 * @returns {string} Liste formatée des associés
 */
const formatPartnersList = (partners) => {
  if (!partners || partners.length === 0) {
    return "Liste des associés non définie";
  }

  return partners
    .map((partner, index) => {
      const fullName = `${partner.firstName || "Prénom"} ${
        partner.lastName || "Nom"
      }`;
      const role = partner.role || "associé";
      const shares = partner.sharePercentage || "0";

      return `${
        index + 1
      }. ${fullName}, agissant en qualité de ${role}, détenant ${shares}% des parts sociales`;
    })
    .join("\n");
};

/**
 * Génère le template de statuts pour une SASU
 * @param {Object} companyData - Données de l'entreprise
 * @returns {string} Contenu des statuts SASU
 */
const generateSasuStatuts = (companyData) => {
  const data = extractCompanyData(companyData);
  const president =
    data.partners.find((p) => p.role === "president") || data.partners[0] || {};

  return `
STATUTS DE SOCIÉTÉ PAR ACTIONS SIMPLIFIÉE UNIPERSONNELLE

${data.companyName}
Société par actions simplifiée unipersonnelle au capital de ${
    data.capitalAmount
  } euros
Siège social : ${data.headquartersAddress}

STATUTS CONSTITUTIFS EN DATE DU ${new Date(data.startDate).toLocaleDateString(
    "fr-FR"
  )}

Le soussigné :
${president.firstName || "Prénom"} ${president.lastName || "Nom"}, né(e) le ${
    president.birthDate || "01/01/1970"
  } à ${president.birthPlace || "Lieu de naissance"}, demeurant ${
    president.address || "Adresse non spécifiée"
  }, de nationalité ${president.nationality || "Française"}.

A établi ainsi qu'il suit les statuts d'une Société par actions simplifiée unipersonnelle qu'il a décidé de constituer.

TITRE I - FORME - OBJET - DENOMINATION - SIEGE - DUREE

ARTICLE 1 - FORME
Il est formé par le propriétaire des actions ci-après créées une Société par actions simplifiée unipersonnelle qui sera régie par les lois en vigueur, notamment par les dispositions du Code de commerce, et par les présents statuts.
La Société ne peut faire publiquement appel à l'épargne.
Elle fonctionne indifféremment sous la même forme avec un ou plusieurs associés.

ARTICLE 2 - OBJET
La Société a pour objet, tant en France qu'à l'étranger :
${data.socialPurpose}

ARTICLE 3 - DENOMINATION
La dénomination sociale est : ${data.companyName}
Dans tous les actes et documents émanant de la Société et destinés aux tiers, la dénomination sera précédée ou suivie immédiatement des mots "Société par actions simplifiée unipersonnelle" ou des initiales "S.A.S.U." et de l'énonciation du montant du capital social.

ARTICLE 4 - SIEGE SOCIAL
Le siège social est fixé à : ${data.headquartersAddress}
Il peut être transféré en tout autre endroit du même département ou d'un département limitrophe par décision du Président, et en tout autre lieu par décision collective extraordinaire des associés.

ARTICLE 5 - DUREE
La durée de la Société est fixée à ${
    data.duration
  } années à compter de la date de son immatriculation au Registre du Commerce et des Sociétés, sauf les cas de dissolution anticipée ou de prorogation.

TITRE II - APPORTS - CAPITAL SOCIAL

ARTICLE 6 - APPORTS
L'associé unique apporte à la Société la somme en numéraire de ${
    data.capitalAmount
  } euros.
Cette somme a été déposée au crédit d'un compte ouvert au nom de la Société en formation, ainsi qu'il résulte d'un certificat établi par la banque dépositaire des fonds.

ARTICLE 7 - CAPITAL SOCIAL
Le capital social est fixé à la somme de ${data.capitalAmount} euros.
Il est divisé en ${
    data.capitalAmount
  } actions de 1 euro chacune, entièrement libérées et de même catégorie.

ARTICLE 8 - MODIFICATIONS DU CAPITAL
Le capital social peut être augmenté, réduit ou amorti conformément aux lois et règlements en vigueur, par décision de l'associé unique.

TITRE III - ACTIONS

ARTICLE 9 - DROITS ET OBLIGATIONS ATTACHÉS AUX ACTIONS
Chaque action donne droit, dans les bénéfices et l'actif social, à une part proportionnelle à la quotité du capital qu'elle représente.
L'associé unique ne supporte les pertes qu'à concurrence de ses apports.
L'associé unique est tenu de libérer les actions souscrites dans les conditions légales.

ARTICLE 10 - INDIVISIBILITÉ DES ACTIONS
Les actions sont indivisibles à l'égard de la Société.

TITRE IV - ADMINISTRATION ET DIRECTION DE LA SOCIÉTÉ

ARTICLE 11 - PRESIDENT
La Société est représentée, dirigée et administrée par un Président, personne physique ou morale, associé ou non de la Société.
Le Président est nommé par l'associé unique qui fixe la durée de son mandat, sa rémunération et, le cas échéant, les limitations de ses pouvoirs.
Le premier Président de la Société est ${president.firstName || ""} ${
    president.lastName || ""
  }, né(e) le ${president.birthDate || "01/01/1970"} à ${
    president.birthPlace || ""
  }, demeurant ${president.address || ""}, de nationalité ${
    president.nationality || "Française"
  }.

ARTICLE 12 - POUVOIRS DU PRÉSIDENT
Le Président représente la Société à l'égard des tiers.
Il est investi des pouvoirs les plus étendus pour agir en toutes circonstances au nom de la Société dans la limite de l'objet social.

TITRE V - CONVENTIONS RÉGLEMENTÉES - COMMISSAIRES AUX COMPTES

ARTICLE 13 - CONVENTIONS RÉGLEMENTÉES
Le Président doit aviser le Commissaire aux comptes, s'il en existe un, des conventions intervenues directement ou par personne interposée entre la Société et lui-même.
Le Commissaire aux comptes présente à l'associé unique un rapport sur la conclusion et l'exécution des conventions conclues avec l'associé unique ou le Président.
L'associé unique statue sur ce rapport lors de la décision statuant sur les comptes de l'exercice écoulé.

ARTICLE 14 - COMMISSAIRES AUX COMPTES
La nomination d'un Commissaire aux comptes titulaire et d'un Commissaire aux comptes suppléant est facultative tant que la Société ne dépasse pas les seuils fixés par la loi et les règlements.

TITRE VI - DÉCISIONS DE L'ASSOCIÉ UNIQUE

ARTICLE 15 - DÉCISIONS DE L'ASSOCIÉ UNIQUE
L'associé unique est seul compétent pour prendre les décisions suivantes :
- Approbation des comptes annuels et affectation des résultats,
- Nomination et révocation du Président,
- Nomination des Commissaires aux comptes,
- Augmentation, réduction et amortissement du capital social,
- Fusion, scission et apport partiel d'actif,
- Transformation en une société d'une autre forme,
- Dissolution de la Société,
- Agrément des cessions d'actions,
- Extension ou modification de l'objet social,
- Création d'actions de préférence,
- Modification des clauses statutaires.

TITRE VII - EXERCICE SOCIAL - COMPTES ANNUELS - AFFECTATION DES RÉSULTATS

ARTICLE 16 - EXERCICE SOCIAL
L'exercice social commence le ${
    data.startDate
      ? new Date(data.startDate)
          .toLocaleDateString("fr-FR")
          .split("/")
          .reverse()
          .join("-")
      : "01/01"
  } et se termine le ${data.closingDate}.

ARTICLE 17 - COMPTES ANNUELS
Le Président tient une comptabilité régulière des opérations sociales et établit les comptes annuels conformément aux lois et usages du commerce.

ARTICLE 18 - AFFECTATION DES RÉSULTATS
Après approbation des comptes et constatation de l'existence d'un bénéfice distribuable, l'associé unique décide de son affectation.
L'associé unique peut décider la distribution de sommes prélevées sur les réserves dont il a la disposition, en indiquant expressément les postes de réserves sur lesquels les prélèvements sont effectués.

TITRE VIII - DISSOLUTION - LIQUIDATION

ARTICLE 19 - DISSOLUTION - LIQUIDATION
La Société est dissoute à l'arrivée du terme statutaire, sauf prorogation régulière, ou par décision de l'associé unique.
La dissolution de la Société peut également être prononcée dans les conditions du droit commun applicables aux sociétés par actions simplifiées unipersonnelles.
La liquidation de la Société dissoute intervient dans les conditions fixées par les dispositions légales.
Le boni de liquidation est attribué à l'associé unique.

TITRE IX - CONTESTATIONS

ARTICLE 20 - CONTESTATIONS
Toutes les contestations relatives aux affaires sociales survenant pendant la durée de la Société ou au cours de sa liquidation, soit entre les associés, soit entre un associé et la Société, seront soumises à la juridiction des tribunaux compétents.

TITRE X - PERSONNALITÉ MORALE - FORMALITÉS DE PUBLICITÉ - POUVOIRS

ARTICLE 21 - PERSONNALITÉ MORALE
La Société jouit de la personnalité morale à dater de son immatriculation au Registre du Commerce et des Sociétés.

ARTICLE 22 - FORMALITÉS DE PUBLICITÉ - POUVOIRS
Tous pouvoirs sont donnés au porteur d'un original, d'une copie ou d'un extrait des présentes pour effectuer toutes formalités légales de dépôt et de publicité et généralement, faire le nécessaire.

Fait à ${
    data.headquartersAddress.split(",").pop().trim() || "Paris"
  }, le ${new Date().toLocaleDateString("fr-FR")}

Signature du Président :
${president.firstName || ""} ${president.lastName || ""}
`;
};

/**
 * Génère le template de statuts pour une SAS
 * @param {Object} companyData - Données de l'entreprise
 * @returns {string} Contenu des statuts SAS
 */
const generateSasStatuts = (companyData) => {
  const data = extractCompanyData(companyData);
  const president =
    data.partners.find((p) => p.role === "president") || data.partners[0] || {};

  return `
STATUTS DE SOCIÉTÉ PAR ACTIONS SIMPLIFIÉE

${data.companyName}
Société par actions simplifiée au capital de ${data.capitalAmount} euros
Siège social : ${data.headquartersAddress}

STATUTS CONSTITUTIFS EN DATE DU ${new Date(data.startDate).toLocaleDateString(
    "fr-FR"
  )}

Les soussignés :
${formatPartnersList(data.partners)}

Ont établi ainsi qu'il suit les statuts d'une Société par actions simplifiée qu'ils ont décidé de constituer.

TITRE I - FORME - OBJET - DENOMINATION - SIEGE - DUREE

ARTICLE 1 - FORME
Il est formé entre les propriétaires des actions ci-après créées et de celles qui pourraient l'être ultérieurement une Société par actions simplifiée qui sera régie par les lois en vigueur, notamment par les dispositions du Code de commerce, et par les présents statuts.
La Société ne peut faire publiquement appel à l'épargne.

ARTICLE 2 - OBJET
La Société a pour objet, tant en France qu'à l'étranger :
${data.socialPurpose}

ARTICLE 3 - DENOMINATION
La dénomination sociale est : ${data.companyName}
Dans tous les actes et documents émanant de la Société et destinés aux tiers, la dénomination sera précédée ou suivie immédiatement des mots "Société par actions simplifiée" ou des initiales "S.A.S." et de l'énonciation du montant du capital social.

ARTICLE 4 - SIEGE SOCIAL
Le siège social est fixé à : ${data.headquartersAddress}
Il peut être transféré en tout autre endroit du même département ou d'un département limitrophe par décision du Président, et en tout autre lieu par décision collective extraordinaire des associés.

ARTICLE 5 - DUREE
La durée de la Société est fixée à ${
    data.duration
  } années à compter de la date de son immatriculation au Registre du Commerce et des Sociétés, sauf les cas de dissolution anticipée ou de prorogation.

TITRE II - APPORTS - CAPITAL SOCIAL

ARTICLE 6 - APPORTS
Les associés apportent à la Société la somme en numéraire de ${
    data.capitalAmount
  } euros.
Cette somme a été déposée au crédit d'un compte ouvert au nom de la Société en formation, ainsi qu'il résulte d'un certificat établi par la banque dépositaire des fonds.

ARTICLE 7 - CAPITAL SOCIAL
Le capital social est fixé à la somme de ${data.capitalAmount} euros.
Il est divisé en ${
    data.capitalAmount
  } actions de 1 euro chacune, entièrement libérées et de même catégorie.

ARTICLE 8 - MODIFICATIONS DU CAPITAL
Le capital social peut être augmenté, réduit ou amorti conformément aux lois et règlements en vigueur, par décision collective des associés.

TITRE III - ACTIONS

ARTICLE 9 - DROITS ET OBLIGATIONS ATTACHÉS AUX ACTIONS
Chaque action donne droit, dans les bénéfices et l'actif social, à une part proportionnelle à la quotité du capital qu'elle représente.
Les associés ne supportent les pertes qu'à concurrence de leurs apports.
Les associés sont tenus de libérer les actions souscrites dans les conditions légales.

ARTICLE 10 - INDIVISIBILITÉ DES ACTIONS
Les actions sont indivisibles à l'égard de la Société.

ARTICLE 11 - CESSION ET TRANSMISSION DES ACTIONS
Les actions sont librement négociables.
La cession des actions s'opère par un ordre de mouvement signé par le cédant et par le cessionnaire.

TITRE IV - ADMINISTRATION ET DIRECTION DE LA SOCIÉTÉ

ARTICLE 12 - PRESIDENT
La Société est représentée, dirigée et administrée par un Président, personne physique ou morale, associé ou non de la Société.
Le Président est nommé par décision collective des associés qui fixe la durée de son mandat, sa rémunération et, le cas échéant, les limitations de ses pouvoirs.
Le premier Président de la Société est ${president.firstName || ""} ${
    president.lastName || ""
  }, né(e) le ${president.birthDate || "01/01/1970"} à ${
    president.birthPlace || ""
  }, demeurant ${president.address || ""}, de nationalité ${
    president.nationality || "Française"
  }.

ARTICLE 13 - POUVOIRS DU PRÉSIDENT
Le Président représente la Société à l'égard des tiers.
Il est investi des pouvoirs les plus étendus pour agir en toutes circonstances au nom de la Société dans la limite de l'objet social.

TITRE V - CONVENTIONS RÉGLEMENTÉES - COMMISSAIRES AUX COMPTES

ARTICLE 14 - CONVENTIONS RÉGLEMENTÉES
Le Président doit aviser les Commissaires aux comptes, s'il en existe, des conventions intervenues directement ou par personne interposée entre la Société et lui-même ou l'un des dirigeants.
Les Commissaires aux comptes présentent aux associés un rapport sur la conclusion et l'exécution des conventions conclues avec les associés ou les dirigeants.
Les associés statuent sur ce rapport lors de la décision collective statuant sur les comptes de l'exercice écoulé.

ARTICLE 15 - COMMISSAIRES AUX COMPTES
La nomination d'un Commissaire aux comptes titulaire et d'un Commissaire aux comptes suppléant est facultative tant que la Société ne dépasse pas les seuils fixés par la loi et les règlements.

TITRE VI - DÉCISIONS COLLECTIVES DES ASSOCIÉS

ARTICLE 16 - DÉCISIONS COLLECTIVES DES ASSOCIÉS
Les décisions collectives des associés sont prises, au choix du Président, soit en assemblée générale, soit par consultation par correspondance, soit par téléconférence téléphonique ou audiovisuelle.
Elles peuvent s'exprimer aussi par une décision unanime des associés prise par un acte sous seing privé.
Sous réserve des dispositions légales ou statutaires imposant l'unanimité ou des conditions de majorité particulières, les décisions collectives sont prises à la majorité des voix des associés disposant du droit de vote, présents ou représentés.

TITRE VII - EXERCICE SOCIAL - COMPTES ANNUELS - AFFECTATION DES RÉSULTATS

ARTICLE 17 - EXERCICE SOCIAL
L'exercice social commence le ${
    data.startDate
      ? new Date(data.startDate)
          .toLocaleDateString("fr-FR")
          .split("/")
          .reverse()
          .join("-")
      : "01/01"
  } et se termine le ${data.closingDate}.

ARTICLE 18 - COMPTES ANNUELS
Le Président tient une comptabilité régulière des opérations sociales et établit les comptes annuels conformément aux lois et usages du commerce.

ARTICLE 19 - AFFECTATION DES RÉSULTATS
Après approbation des comptes et constatation de l'existence d'un bénéfice distribuable, les associés décident de son affectation.
Les associés peuvent décider la distribution de sommes prélevées sur les réserves dont ils ont la disposition, en indiquant expressément les postes de réserves sur lesquels les prélèvements sont effectués.

TITRE VIII - DISSOLUTION - LIQUIDATION

ARTICLE 20 - DISSOLUTION - LIQUIDATION
La Société est dissoute à l'arrivée du terme statutaire, sauf prorogation régulière, ou par décision collective des associés.
La dissolution de la Société peut également être prononcée dans les conditions du droit commun applicables aux sociétés par actions simplifiées.
La liquidation de la Société dissoute intervient dans les conditions fixées par les dispositions légales.
Le boni de liquidation est attribué aux associés proportionnellement au nombre de leurs actions.

TITRE IX - CONTESTATIONS

ARTICLE 21 - CONTESTATIONS
Toutes les contestations relatives aux affaires sociales survenant pendant la durée de la Société ou au cours de sa liquidation, soit entre les associés, soit entre un associé et la Société, seront soumises à la juridiction des tribunaux compétents.

TITRE X - PERSONNALITÉ MORALE - FORMALITÉS DE PUBLICITÉ - POUVOIRS

ARTICLE 22 - PERSONNALITÉ MORALE
La Société jouit de la personnalité morale à dater de son immatriculation au Registre du Commerce et des Sociétés.

ARTICLE 23 - FORMALITÉS DE PUBLICITÉ - POUVOIRS
Tous pouvoirs sont donnés au porteur d'un original, d'une copie ou d'un extrait des présentes pour effectuer toutes formalités légales de dépôt et de publicité et généralement, faire le nécessaire.

Fait à ${
    data.headquartersAddress.split(",").pop().trim() || "Paris"
  }, le ${new Date().toLocaleDateString("fr-FR")}

Signatures des associés :
${data.partners
  .map((p) => `${p.firstName || ""} ${p.lastName || ""}`)
  .join("\n")}
`;
};

/**
 * Génère le template de statuts pour une SARL
 * @param {Object} companyData - Données de l'entreprise
 * @returns {string} Contenu des statuts SARL
 */
const generateSarlStatuts = (companyData) => {
  const data = extractCompanyData(companyData);
  const gerant =
    data.partners.find((p) => p.role === "gerant") || data.partners[0] || {};

  return `
STATUTS DE SOCIÉTÉ À RESPONSABILITÉ LIMITÉE

${data.companyName}
Société à responsabilité limitée au capital de ${data.capitalAmount} euros
Siège social : ${data.headquartersAddress}

STATUTS CONSTITUTIFS EN DATE DU ${new Date(data.startDate).toLocaleDateString(
    "fr-FR"
  )}

Les soussignés :
${formatPartnersList(data.partners)}

Ont établi ainsi qu'il suit les statuts d'une Société à responsabilité limitée qu'ils ont décidé de constituer.

TITRE I - FORME - OBJET - DENOMINATION - SIEGE - DUREE

ARTICLE 1 - FORME
Il est formé entre les propriétaires des parts ci-après créées et de celles qui pourraient l'être ultérieurement une Société à responsabilité limitée qui sera régie par les lois en vigueur, notamment par les dispositions du Code de commerce, et par les présents statuts.

ARTICLE 2 - OBJET
La Société a pour objet, tant en France qu'à l'étranger :
${data.socialPurpose}

ARTICLE 3 - DENOMINATION
La dénomination sociale est : ${data.companyName}
Dans tous les actes et documents émanant de la Société et destinés aux tiers, la dénomination sera précédée ou suivie immédiatement des mots "Société à responsabilité limitée" ou des initiales "S.A.R.L." et de l'énonciation du montant du capital social.

ARTICLE 4 - SIEGE SOCIAL
Le siège social est fixé à : ${data.headquartersAddress}
Il peut être transféré en tout autre endroit du même département ou d'un département limitrophe par décision de la gérance, et en tout autre lieu par décision extraordinaire des associés.

ARTICLE 5 - DUREE
La durée de la Société est fixée à ${
    data.duration
  } années à compter de la date de son immatriculation au Registre du Commerce et des Sociétés, sauf les cas de dissolution anticipée ou de prorogation.

TITRE II - APPORTS - CAPITAL SOCIAL

ARTICLE 6 - APPORTS
Les associés apportent à la Société la somme en numéraire de ${
    data.capitalAmount
  } euros.
Cette somme a été déposée au crédit d'un compte ouvert au nom de la Société en formation, ainsi qu'il résulte d'un certificat établi par la banque dépositaire des fonds.

ARTICLE 7 - CAPITAL SOCIAL
Le capital social est fixé à la somme de ${data.capitalAmount} euros.
Il est divisé en ${
    data.capitalAmount
  } parts sociales de 1 euro chacune, entièrement libérées et de même catégorie.

ARTICLE 8 - MODIFICATIONS DU CAPITAL
Le capital social peut être augmenté, réduit ou amorti conformément aux lois et règlements en vigueur, par décision collective des associés.

TITRE III - PARTS SOCIALES

ARTICLE 9 - DROITS ET OBLIGATIONS ATTACHÉS AUX PARTS SOCIALES
Chaque part sociale donne droit, dans les bénéfices et l'actif social, à une part proportionnelle à la quotité du capital qu'elle représente.
Les associés ne supportent les pertes qu'à concurrence de leurs apports.
Les associés sont tenus de libérer les parts sociales souscrites dans les conditions légales.

ARTICLE 10 - INDIVISIBILITÉ DES PARTS SOCIALES
Les parts sociales sont indivisibles à l'égard de la Société.

ARTICLE 11 - CESSION ET TRANSMISSION DES PARTS SOCIALES
Les cessions de parts sociales sont soumises à l'agrément de la majorité des associés représentant au moins la moitié des parts sociales.
La cession des parts sociales est constatée par un acte sous seing privé ou par acte notarié. La cession n'est opposable à la Société que si elle lui a été notifiée ou si elle a été acceptée par elle dans un acte notarié.

TITRE IV - GÉRANCE

ARTICLE 12 - GÉRANT
La Société est gérée par une ou plusieurs personnes physiques, associées ou non, nommées par décision des associés représentant plus de la moitié des parts sociales.
Le premier gérant de la Société est ${gerant.firstName || ""} ${
    gerant.lastName || ""
  }, né(e) le ${gerant.birthDate || "01/01/1970"} à ${
    gerant.birthPlace || ""
  }, demeurant ${gerant.address || ""}, de nationalité ${
    gerant.nationality || "Française"
  }.

ARTICLE 13 - POUVOIRS DU GÉRANT
Dans les rapports avec les tiers, le gérant est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la Société, dans la limite de l'objet social.
Dans les rapports entre associés, le gérant peut faire tous actes de gestion dans l'intérêt de la Société.

TITRE V - CONVENTIONS RÉGLEMENTÉES - COMMISSAIRES AUX COMPTES

ARTICLE 14 - CONVENTIONS RÉGLEMENTÉES
Le gérant doit aviser le Commissaire aux comptes, s'il en existe un, des conventions intervenues directement ou par personne interposée entre la Société et lui-même ou l'un des associés.
Le Commissaire aux comptes présente aux associés un rapport sur la conclusion et l'exécution des conventions conclues avec les gérants ou les associés.
Les associés statuent sur ce rapport lors de l'assemblée générale annuelle statuant sur les comptes de l'exercice écoulé.

ARTICLE 15 - COMMISSAIRES AUX COMPTES
La nomination d'un Commissaire aux comptes titulaire et d'un Commissaire aux comptes suppléant est facultative tant que la Société ne dépasse pas les seuils fixés par la loi et les règlements.

TITRE VI - DÉCISIONS COLLECTIVES DES ASSOCIÉS

ARTICLE 16 - DÉCISIONS COLLECTIVES DES ASSOCIÉS
Les décisions collectives des associés sont prises, au choix de la gérance, soit en assemblée générale, soit par consultation par correspondance, soit par téléconférence téléphonique ou audiovisuelle.
Elles peuvent s'exprimer aussi par une décision unanime des associés prise par un acte sous seing privé.
Sous réserve des dispositions légales ou statutaires imposant l'unanimité ou des conditions de majorité particulières, les décisions collectives sont prises à la majorité des voix des associés disposant du droit de vote, présents ou représentés.

TITRE VII - EXERCICE SOCIAL - COMPTES ANNUELS - AFFECTATION DES RÉSULTATS

ARTICLE 17 - EXERCICE SOCIAL
L'exercice social commence le ${
    data.startDate
      ? new Date(data.startDate)
          .toLocaleDateString("fr-FR")
          .split("/")
          .reverse()
          .join("-")
      : "01/01"
  } et se termine le ${data.closingDate}.

ARTICLE 18 - COMPTES ANNUELS
Le gérant tient une comptabilité régulière des opérations sociales et établit les comptes annuels conformément aux lois et usages du commerce.

ARTICLE 19 - AFFECTATION DES RÉSULTATS
Après approbation des comptes et constatation de l'existence d'un bénéfice distribuable, les associés décident de son affectation.
Les associés peuvent décider la distribution de sommes prélevées sur les réserves dont ils ont la disposition, en indiquant expressément les postes de réserves sur lesquels les prélèvements sont effectués.

TITRE VIII - DISSOLUTION - LIQUIDATION

ARTICLE 20 - DISSOLUTION - LIQUIDATION
La Société est dissoute à l'arrivée du terme statutaire, sauf prorogation régulière, ou par décision collective des associés.
La dissolution de la Société peut également être prononcée dans les conditions du droit commun applicables aux sociétés à responsabilité limitée.
La liquidation de la Société dissoute intervient dans les conditions fixées par les dispositions légales.
Le boni de liquidation est attribué aux associés proportionnellement au nombre de leurs parts sociales.

TITRE IX - CONTESTATIONS

ARTICLE 21 - CONTESTATIONS
Toutes les contestations relatives aux affaires sociales survenant pendant la durée de la Société ou au cours de sa liquidation, soit entre les associés, soit entre un associé et la Société, seront soumises à la juridiction des tribunaux compétents.

TITRE X - PERSONNALITÉ MORALE - FORMALITÉS DE PUBLICITÉ - POUVOIRS

ARTICLE 22 - PERSONNALITÉ MORALE
La Société jouit de la personnalité morale à dater de son immatriculation au Registre du Commerce et des Sociétés.

ARTICLE 23 - FORMALITÉS DE PUBLICITÉ - POUVOIRS
Tous pouvoirs sont donnés au porteur d'un original, d'une copie ou d'un extrait des présentes pour effectuer toutes formalités légales de dépôt et de publicité et généralement, faire le nécessaire.

Fait à ${
    data.headquartersAddress.split(",").pop().trim() || "Paris"
  }, le ${new Date().toLocaleDateString("fr-FR")}

Signatures des associés :
${data.partners
  .map((p) => `${p.firstName || ""} ${p.lastName || ""}`)
  .join("\n")}
`;
};

/**
 * Génère le template de statuts pour une EURL
 * @param {Object} companyData - Données de l'entreprise
 * @returns {string} Contenu des statuts EURL
 */
const generateEurlStatuts = (companyData) => {
  const data = extractCompanyData(companyData);
  const gerant =
    data.partners.find((p) => p.role === "gerant") || data.partners[0] || {};

  return `
STATUTS DE SOCIÉTÉ À RESPONSABILITÉ LIMITÉE UNIPERSONNELLE

${data.companyName}
Société à responsabilité limitée unipersonnelle au capital de ${
    data.capitalAmount
  } euros
Siège social : ${data.headquartersAddress}

STATUTS CONSTITUTIFS EN DATE DU ${new Date(data.startDate).toLocaleDateString(
    "fr-FR"
  )}

Le soussigné :
${gerant.firstName || "Prénom"} ${gerant.lastName || "Nom"}, né(e) le ${
    gerant.birthDate || "01/01/1970"
  } à ${gerant.birthPlace || "Lieu de naissance"}, demeurant ${
    gerant.address || "Adresse non spécifiée"
  }, de nationalité ${gerant.nationality || "Française"}.

A établi ainsi qu'il suit les statuts d'une Société à responsabilité limitée unipersonnelle qu'il a décidé de constituer.

TITRE I - FORME - OBJET - DENOMINATION - SIEGE - DUREE

ARTICLE 1 - FORME
Il est formé par le propriétaire des parts ci-après créées une Société à responsabilité limitée unipersonnelle qui sera régie par les lois en vigueur, notamment par les dispositions du Code de commerce, et par les présents statuts.
La Société fonctionne indifféremment sous la même forme avec un ou plusieurs associés.

ARTICLE 2 - OBJET
La Société a pour objet, tant en France qu'à l'étranger :
${data.socialPurpose}

ARTICLE 3 - DENOMINATION
La dénomination sociale est : ${data.companyName}
Dans tous les actes et documents émanant de la Société et destinés aux tiers, la dénomination sera précédée ou suivie immédiatement des mots "Société à responsabilité limitée unipersonnelle" ou des initiales "E.U.R.L." et de l'énonciation du montant du capital social.

ARTICLE 4 - SIEGE SOCIAL
Le siège social est fixé à : ${data.headquartersAddress}
Il peut être transféré en tout autre endroit du même département ou d'un département limitrophe par décision de la gérance, et en tout autre lieu par décision extraordinaire de l'associé unique.

ARTICLE 5 - DUREE
La durée de la Société est fixée à ${
    data.duration
  } années à compter de la date de son immatriculation au Registre du Commerce et des Sociétés, sauf les cas de dissolution anticipée ou de prorogation.

TITRE II - APPORTS - CAPITAL SOCIAL

ARTICLE 6 - APPORTS
L'associé unique apporte à la Société la somme en numéraire de ${
    data.capitalAmount
  } euros.
Cette somme a été déposée au crédit d'un compte ouvert au nom de la Société en formation, ainsi qu'il résulte d'un certificat établi par la banque dépositaire des fonds.

ARTICLE 7 - CAPITAL SOCIAL
Le capital social est fixé à la somme de ${data.capitalAmount} euros.
Il est divisé en ${
    data.capitalAmount
  } parts sociales de 1 euro chacune, entièrement libérées et de même catégorie.

ARTICLE 8 - MODIFICATIONS DU CAPITAL
Le capital social peut être augmenté, réduit ou amorti conformément aux lois et règlements en vigueur, par décision de l'associé unique.

TITRE III - PARTS SOCIALES

ARTICLE 9 - DROITS ET OBLIGATIONS ATTACHÉS AUX PARTS SOCIALES
Chaque part sociale donne droit, dans les bénéfices et l'actif social, à une part proportionnelle à la quotité du capital qu'elle représente.
L'associé unique ne supporte les pertes qu'à concurrence de ses apports.
L'associé unique est tenu de libérer les parts sociales souscrites dans les conditions légales.

ARTICLE 10 - INDIVISIBILITÉ DES PARTS SOCIALES
Les parts sociales sont indivisibles à l'égard de la Société.

ARTICLE 11 - CESSION ET TRANSMISSION DES PARTS SOCIALES
En cas de pluralité d'associés, les parts sociales sont librement cessibles entre associés. Elles ne peuvent être cédées à des tiers qu'avec le consentement de la majorité des associés représentant au moins la moitié des parts sociales.
La cession des parts sociales est constatée par un acte sous seing privé ou par acte notarié. La cession n'est opposable à la Société que si elle lui a été notifiée ou si elle a été acceptée par elle dans un acte notarié.

TITRE IV - GÉRANCE

ARTICLE 12 - GÉRANT
La Société est gérée par une ou plusieurs personnes physiques, associées ou non, nommées par décision de l'associé unique.
Le premier gérant de la Société est ${gerant.firstName || ""} ${
    gerant.lastName || ""
  }, né(e) le ${gerant.birthDate || "01/01/1970"} à ${
    gerant.birthPlace || ""
  }, demeurant ${gerant.address || ""}, de nationalité ${
    gerant.nationality || "Française"
  }.

ARTICLE 13 - POUVOIRS DU GÉRANT
Dans les rapports avec les tiers, le gérant est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la Société, dans la limite de l'objet social.
Dans les rapports avec l'associé unique, le gérant peut faire tous actes de gestion dans l'intérêt de la Société.

TITRE V - CONVENTIONS RÉGLEMENTÉES - COMMISSAIRES AUX COMPTES

ARTICLE 14 - CONVENTIONS RÉGLEMENTÉES
Le gérant doit aviser le Commissaire aux comptes, s'il en existe un, des conventions intervenues directement ou par personne interposée entre la Société et lui-même ou l'associé unique.
Le Commissaire aux comptes présente à l'associé unique un rapport sur la conclusion et l'exécution des conventions conclues avec le gérant ou l'associé unique.
L'associé unique statue sur ce rapport lors de la décision statuant sur les comptes de l'exercice écoulé.

ARTICLE 15 - COMMISSAIRES AUX COMPTES
La nomination d'un Commissaire aux comptes titulaire et d'un Commissaire aux comptes suppléant est facultative tant que la Société ne dépasse pas les seuils fixés par la loi et les règlements.

TITRE VI - DÉCISIONS DE L'ASSOCIÉ UNIQUE

ARTICLE 16 - DÉCISIONS DE L'ASSOCIÉ UNIQUE
L'associé unique est seul compétent pour prendre les décisions suivantes :
- Approbation des comptes annuels et affectation des résultats,
- Nomination et révocation du gérant,
- Nomination des Commissaires aux comptes,
- Augmentation, réduction et amortissement du capital social,
- Fusion, scission et apport partiel d'actif,
- Transformation en une société d'une autre forme,
- Dissolution de la Société,
- Agrément des cessions de parts,
- Extension ou modification de l'objet social,
- Création de parts de préférence,
- Modification des clauses statutaires.

TITRE VII - EXERCICE SOCIAL - COMPTES ANNUELS - AFFECTATION DES RÉSULTATS

ARTICLE 17 - EXERCICE SOCIAL
L'exercice social commence le ${
    data.startDate
      ? new Date(data.startDate)
          .toLocaleDateString("fr-FR")
          .split("/")
          .reverse()
          .join("-")
      : "01/01"
  } et se termine le ${data.closingDate}.

ARTICLE 18 - COMPTES ANNUELS
Le gérant tient une comptabilité régulière des opérations sociales et établit les comptes annuels conformément aux lois et usages du commerce.

ARTICLE 19 - AFFECTATION DES RÉSULTATS
Après approbation des comptes et constatation de l'existence d'un bénéfice distribuable, l'associé unique décide de son affectation.
L'associé unique peut décider la distribution de sommes prélevées sur les réserves dont il a la disposition, en indiquant expressément les postes de réserves sur lesquels les prélèvements sont effectués.

TITRE VIII - DISSOLUTION - LIQUIDATION

ARTICLE 20 - DISSOLUTION - LIQUIDATION
La Société est dissoute à l'arrivée du terme statutaire, sauf prorogation régulière, ou par décision de l'associé unique.
La dissolution de la Société peut également être prononcée dans les conditions du droit commun applicables aux sociétés à responsabilité limitée unipersonnelles.
La liquidation de la Société dissoute intervient dans les conditions fixées par les dispositions légales.
Le boni de liquidation est attribué à l'associé unique.

TITRE IX - CONTESTATIONS

ARTICLE 21 - CONTESTATIONS
Toutes les contestations relatives aux affaires sociales survenant pendant la durée de la Société ou au cours de sa liquidation, soit entre les associés, soit entre un associé et la Société, seront soumises à la juridiction des tribunaux compétents.

TITRE X - PERSONNALITÉ MORALE - FORMALITÉS DE PUBLICITÉ - POUVOIRS

ARTICLE 22 - PERSONNALITÉ MORALE
La Société jouit de la personnalité morale à dater de son immatriculation au Registre du Commerce et des Sociétés.

ARTICLE 23 - FORMALITÉS DE PUBLICITÉ - POUVOIRS
Tous pouvoirs sont donnés au porteur d'un original, d'une copie ou d'un extrait des présentes pour effectuer toutes formalités légales de dépôt et de publicité et généralement, faire le nécessaire.

Fait à ${
    data.headquartersAddress.split(",").pop().trim() || "Paris"
  }, le ${new Date().toLocaleDateString("fr-FR")}

Signature de l'associé unique :
${gerant.firstName || ""} ${gerant.lastName || ""}
`;
};

/**
 * Fonction de simulation pour générer un mock PDF base64
 * Dans un environnement réel, cette fonction serait remplacée par une
 * véritable génération de PDF avec une bibliothèque comme PDFKit ou jsPDF
 * @param {string} content - Contenu du document à convertir en PDF
 * @returns {Promise<string>} - Chaîne base64 simulant un PDF
 */
const mockGeneratePDF = async (content) => {
  // Simulation d'un délai de génération PDF
  await new Promise((resolve) => setTimeout(resolve, 500));

  // En réalité, ici on utiliserait une bibliothèque pour générer un vrai PDF
  // Pour simuler, on encode simplement le contenu en base64
  const encoder = new TextEncoder();
  const data = encoder.encode(content);

  // Conversion en base64
  let base64String = "";
  const bytes = new Uint8Array(data);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    base64String += String.fromCharCode(bytes[i]);
  }

  return btoa(base64String);
};

/**
 * Fonction pour générer tous les documents communs nécessaires
 * @param {Object} companyData - Données de l'entreprise
 * @returns {Promise<Object>} - Objet contenant tous les documents en base64
 */
export const generateAllCommonDocs = async (companyData) => {
  try {
    // Générer les statuts
    const statuts = await generateStatuts(companyData);

    // En réalité, ici on appellerait d'autres générateurs pour les autres documents
    // Pour cet exemple, on simule des documents vides
    const m0 = await mockGeneratePDF("Contenu du formulaire M0");
    const dnc = await mockGeneratePDF("Déclaration de non-condamnation");
    const rbe = await mockGeneratePDF("Registre des bénéficiaires effectifs");

    return {
      statuts,
      m0,
      dnc,
      rbe,
    };
  } catch (error) {
    console.error("Erreur lors de la génération des documents:", error);
    throw error;
  }
};
