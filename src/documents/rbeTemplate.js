// src/documents/rbeTemplate.js

export function generateRBE(companyData) {
  // Suppose we have an array of { name, birthdate, address, percentage }
  // to list all beneficial owners
  const content = [
    {
      text: "Déclaration relative au bénéficiaire effectif (RBE)",
      style: "header"
    },
    {
      text: `Dénomination : ${companyData.companyName}\nForme : ${companyData.companyType}\nSiège : ${companyData.headquartersAddress}`,
      style: "body"
    },
    { text: "Liste des bénéficiaires effectifs :", style: "body" }
  ];

  companyData.beneficialOwners.forEach((bo, idx) => {
    content.push({
      text: `Bénéficiaire n°${idx+1} : ${bo.name}, né(e) le ${bo.birthdate}, demeurant au ${bo.address}, détenant ${bo.percentage}% du capital.`,
      style: "listItem"
    });
  });

  content.push({
    text: "Fait à ..., le ...",
    style: "signature",
    alignment: "right"
  });

  return {
    content,
    styles: {
      header: { fontSize: 14, bold: true, margin: [0,0,0,10] },
      body: { fontSize: 12, margin: [0,0,0,10] },
      listItem: { fontSize: 12, margin: [10,0,0,10] },
      signature: { fontSize: 12, margin: [0,50,0,0] }
    }
  };
}