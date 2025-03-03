// src/index.js

import React from "react";
import { createRoot } from "react-dom/client";
import "./i18n"; // Charger la config i18n
import App from "./App";
import { CompanyProvider } from "./CompanyContext";
import { BrandProvider } from "./brand/BrandContext";
import { defaultBrandConfig } from "./brandConfig";
import "./styles.css"; // suppose qu'il existe

// import posthog from 'posthog-js';
// posthog.init('PH_PROJECT_API_KEY', {...});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrandProvider config={defaultBrandConfig}>
    <CompanyProvider>
      <App />
    </CompanyProvider>
  </BrandProvider>
);
