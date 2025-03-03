// src/documents/formulaireM0Template.js

export function generateM0(companyData) {
  return {
    content: [
      { text: "Formulaire M0 (SAS) - CERFA 13959*08 reconstitué", style: "header" },
      { text: `Dénomination : ${companyData.companyName}`, style: "body" },
      { text: `Adresse du siège : ${companyData.headquartersAddress}`, style: "body" },
      { text: `Forme juridique : ${companyData.companyType}`, style: "body" },
      // etc. On reproduit toutes les rubriques du M0
      { text: "Liste des documents annexés : Statuts, DNC, etc.", style: "body" }
    ],
    styles: {
      header: { fontSize: 14, bold: true, margin: [0,0,0,10] },
      body: { fontSize: 12, margin: [0,0,0,10] }
    }
  };
}