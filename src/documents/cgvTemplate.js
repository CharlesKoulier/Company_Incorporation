// src/documents/cgvTemplate.js

export function generateCGV(companyData) {
  // Suppose the user is selling goods or services, we produce standard CGV
  const content = [
    {
      text: "Conditions Générales de Vente (CGV)",
      style: "header"
    },
    {
      text: `Société : ${companyData.companyName}, ${companyData.companyType}, siège social : ${companyData.headquartersAddress}.`,
      style: "body"
    },
    {
      text: "Article 1 - Champ d'application",
      style: "articleTitle"
    },
    {
      text: "Les présentes CGV ont pour objet de définir les conditions ...",
      style: "articleContent"
    },
    // Article 2 - Prix, ...
    // Article 3 - Paiement, ...
    // etc.
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