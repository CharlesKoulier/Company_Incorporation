// src/data/partners.js

export const partnersList = [
  {
    id: "captainCompta",
    name: "CaptainCompta",
    advantages: [
      "1 mois offert",
      "Spécialiste TPE & auto-entrepreneurs",
      "Interface simple et rapide",
    ],
    disadvantages: ["Moins adapté aux grosses structures"],
    recommendedFor: {
      companyTypes: ["micro-entreprise", "SAS", "SARL"],
      minCA: 0,
      maxCA: 100000,
    },
  },
  {
    id: "placeDesExperts",
    name: "Place des Experts",
    advantages: ["99 € / an", "Mise à disposition sur la plateforme Koulier"],
    disadvantages: ["Options payantes si CA élevé"],
    recommendedFor: {
      companyTypes: ["SAS", "SARL", "SA"],
      minCA: 30000,
      maxCA: 999999999,
    },
  },
  {
    id: "caComptePourMoi",
    name: "Ça Compte Pour Moi",
    advantages: ["Réduction de 10%", "Comptabilité en ligne"],
    disadvantages: [],
    recommendedFor: {
      companyTypes: ["SAS", "SARL", "micro-entreprise"],
      minCA: 0,
      maxCA: 300000,
    },
  },
  // ...
];