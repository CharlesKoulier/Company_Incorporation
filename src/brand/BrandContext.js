// src/brand/BrandContext.js

import React, { createContext, useContext } from "react";

/**
 * BRAND CONTEXT
 * 
 * On conserve intégralement le code.
 */

const BrandContext = createContext(null);

export function BrandProvider({ config, children }) {
  return (
    <BrandContext.Provider value={config}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrandConfig() {
  return useContext(BrandContext);
}