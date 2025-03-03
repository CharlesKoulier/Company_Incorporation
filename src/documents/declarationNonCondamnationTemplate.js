// src/documents/declarationNonCondamnationTemplate.js

export function generateDNC(companyData) {
  // Suppose we have the future CEO's name, birthdate, address, etc.
  return {
    content: [
      {
        text: "Déclaration de non-condamnation",
        style: "header"
      },
      {
        text: `Je soussigné(e), ${companyData.representativeName} né(e) le ${companyData.representativeBirthdate}, demeurant au ${companyData.representativeAddress}, déclare sur l'honneur :`,
        style: "body"
      },
      {
        ul: [
          "N'avoir fait l'objet d'aucune condamnation pénale ou sanction civile ou administrative m'interdisant de diriger, gérer, administrer ou contrôler une personne morale.",
          "Ne pas être actuellement en état de faillite personnelle.",
          // etc
        ],
        style: "body"
      },
      {
        text: "Fait à ..., le ...",
        style: "signature",
        alignment: "right"
      }
    ],
    styles: {
      header: { fontSize: 14, bold: true, margin: [0,0,0,10] },
      body: { fontSize: 12, margin: [0,0,0,10] },
      signature: { fontSize: 12, margin: [0,50,0,0] }
    }
  };
}