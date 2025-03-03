/*************************************************************************
 * src/documents/generateCommonDocs.js
 *
 * Exemple d'implémentation pour générer les 4 documents communs :
 *  1) Statuts
 *  2) Formulaire M0 (simplifié)
 *  3) Déclaration de non-condamnation (DNC)
 *  4) Registre des bénéficiaires effectifs (RBE)
 *
 * Utilise pdfMake pour créer des PDF en base64.
 *************************************************************************/

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs;

/*************************************************************************
 * createPdfBuffer
 * Convertit le docDefinition pdfMake en base64 (ou en Blob si nécessaire).
 *************************************************************************/
async function createPdfBuffer(docDefinition) {
  return new Promise((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBase64((data) => {
      if (!data) reject(new Error("Erreur PDFMake"));
      resolve(data); // base64
    });
  });
}

/*************************************************************************
 * generateStatutsPdfDefinition
 * Implémente un docDefinition minimal pour les statuts
 *************************************************************************/
function generateStatutsPdfDefinition(companyData) {
  const {
    companyName = "Ma Société",
    companyType = "SAS",
    headquartersAddress = "Adresse non renseignée",
    capitalAmount = 1,
    socialPurpose = "Objet social par défaut",
    city = "Paris",
  } = companyData;

  return {
    content: [
      { text: `STATUTS DE LA SOCIÉTÉ ${companyName}`, style: "header" },
      { text: `Forme juridique : ${companyType}`, style: "body" },
      { text: `Siège social : ${headquartersAddress}`, style: "body" },
      { text: `Capital social : ${capitalAmount} €`, style: "body" },
      { text: `Objet social : ${socialPurpose}`, style: "body" },
      {
        text: "Durée : 99 ans à compter de l’immatriculation.",
        style: "body",
      },
      {
        text: "\nFait à " + city + ", le " + new Date().toLocaleDateString(),
        style: "signature",
        alignment: "right",
      },
      {
        text: "Signature : ___________________",
        style: "signature",
        alignment: "right",
      },
    ],
    styles: {
      header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
      body: { fontSize: 12, margin: [0, 0, 0, 8] },
      signature: { fontSize: 12, margin: [0, 40, 0, 0] },
    },
  };
}

/*************************************************************************
 * generateM0
 * Version simplifiée du formulaire M0
 *************************************************************************/
function generateM0(companyData) {
  const {
    companyName = "Ma Société",
    companyType = "SAS",
    headquartersAddress = "Adresse non renseignée",
    representativeName = "Jean Dupont",
  } = companyData;

  return {
    content: [
      { text: "FORMULAIRE M0 (SIMPLIFIÉ)", style: "header" },
      { text: `Dénomination : ${companyName}`, style: "body" },
      { text: `Forme juridique : ${companyType}`, style: "body" },
      { text: `Adresse du siège : ${headquartersAddress}`, style: "body" },
      { text: `Représentant légal : ${representativeName}`, style: "body" },
      {
        text: "\nFait le : " + new Date().toLocaleDateString(),
        style: "signature",
        alignment: "right",
      },
      {
        text: `Signature : ${representativeName}`,
        style: "signature",
        alignment: "right",
      },
    ],
    styles: {
      header: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
      body: { fontSize: 12, margin: [0, 0, 0, 5] },
      signature: { fontSize: 12, margin: [0, 30, 0, 0] },
    },
  };
}

/*************************************************************************
 * generateDNC
 * Déclaration de non-condamnation
 *************************************************************************/
function generateDNC(companyData) {
  const {
    representativeName = "Jean Dupont",
    representativeBirthdate = "01/01/1980",
    representativeAddress = "10 avenue X, 75000 Paris",
  } = companyData;

  return {
    content: [
      { text: "DÉCLARATION DE NON-CONDAMNATION", style: "header" },
      {
        text:
          `Je soussigné(e), ${representativeName}, né(e) le ${representativeBirthdate}, ` +
          `demeurant au ${representativeAddress}, déclare sur l'honneur ` +
          "n'avoir fait l’objet d’aucune condamnation pénale ni sanction civile ou administrative " +
          "m’interdisant d’exercer ou de gérer une entreprise.",
        style: "body",
      },
      {
        text: "\nFait le : " + new Date().toLocaleDateString(),
        style: "signature",
        alignment: "right",
      },
      {
        text: "Signature : ___________________",
        style: "signature",
        alignment: "right",
      },
    ],
    styles: {
      header: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
      body: { fontSize: 12, margin: [0, 0, 0, 10] },
      signature: { fontSize: 12, margin: [0, 40, 0, 0] },
    },
  };
}

/*************************************************************************
 * generateRBE
 * Registre des Bénéficiaires Effectifs
 *************************************************************************/
function generateRBE(companyData) {
  const {
    companyName = "Ma Société",
    companyType = "SAS",
    headquartersAddress = "Adresse non renseignée",
    beneficialOwners = [],
    city = "Paris",
  } = companyData;

  const content = [
    {
      text: "DÉCLARATION RELATIVE AU BÉNÉFICIAIRE EFFECTIF (RBE)",
      style: "header",
    },
    {
      text:
        `Dénomination : ${companyName}\n` +
        `Forme : ${companyType}\n` +
        `Siège : ${headquartersAddress}\n`,
      style: "body",
    },
    {
      text: "Liste des bénéficiaires effectifs :",
      style: "body",
    },
  ];

  if (!beneficialOwners.length) {
    content.push({
      text: "Aucun bénéficiaire effectif identifié ou associé unique = le dirigeant est BE à 100%.",
      style: "listItem",
    });
  } else {
    beneficialOwners.forEach((bo, idx) => {
      content.push({
        text:
          `- Bénéficiaire n°${idx + 1}: ${bo.name}, né(e) le ${
            bo.birthdate
          }, ` +
          `domicilié(e) au ${bo.address}, détenant ${bo.percentage}% du capital.`,
        style: "listItem",
      });
    });
  }

  content.push({
    text: "\nFait le : " + new Date().toLocaleDateString() + ", à " + city,
    style: "signature",
    alignment: "right",
  });

  content.push({
    text: "Signature du représentant légal : ___________________",
    style: "signature",
    alignment: "right",
  });

  return {
    content,
    styles: {
      header: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
      body: { fontSize: 12, margin: [0, 0, 0, 10] },
      listItem: { fontSize: 12, margin: [5, 0, 0, 5] },
      signature: { fontSize: 12, margin: [0, 40, 0, 0] },
    },
  };
}

/*************************************************************************
 * generateAllCommonDocs
 * Appelle les 4 fonctions et renvoie un objet { statuts, m0, dnc, rbe }
 *************************************************************************/
export async function generateAllCommonDocs(companyData) {
  // 1) Statuts
  const statutsDef = generateStatutsPdfDefinition(companyData);
  const statutsPdf = await createPdfBuffer(statutsDef);

  // 2) M0
  const m0Def = generateM0(companyData);
  const m0Pdf = await createPdfBuffer(m0Def);

  // 3) DNC
  const dncDef = generateDNC(companyData);
  const dncPdf = await createPdfBuffer(dncDef);

  // 4) RBE
  const rbeDef = generateRBE(companyData);
  const rbePdf = await createPdfBuffer(rbeDef);

  return {
    statuts: statutsPdf, // base64
    m0: m0Pdf, // base64
    dnc: dncPdf, // base64
    rbe: rbePdf, // base64
  };
}
