// src/documents/pacteAssociesTemplate.js

export function generatePacteAssocies(companyData) {
  // Suppose we have an array of associates, roles, shares, etc.
  // We'll produce a standard "pacte" structure
  const content = [
    {
      text: "Pacte d'Associés",
      style: "header"
    },
    {
      text: `Entre les soussignés, actionnaires/associés de la société ${companyData.companyName}, ci-après dénommés les "Associés".`,
      style: "body"
    },
    {
      text: "Article 1 - Objet",
      style: "articleTitle"
    },
    {
      text: "Le présent pacte a pour objet de définir les droits et obligations respectifs des Associés...",
      style: "articleContent"
    },
    {
      text: "Article 2 - Organisation et gouvernance",
      style: "articleTitle"
    },
    {
      text: "Déterminer les règles de direction, de vote, etc.",
      style: "articleContent"
    },
    // ... Ajoutez tous les articles du pacte
    {
      text: "Fait à ..., le ...",
      style: "signature",
      alignment: "right"
    }
  ];

  return {
    content,
    styles: {
      header: { fontSize: 16, bold: true, margin: [0,0,0,10] },
      body: { fontSize: 12, margin: [0,0,0,10] },
      articleTitle: { fontSize: 14, bold: true, margin: [0,10,0,5] },
      articleContent: { fontSize: 12, margin: [0,0,0,15] },
      signature: { fontSize: 12, margin: [0,50,0,0] }
    }
  };
}