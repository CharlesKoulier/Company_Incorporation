// src/components/ui/card.jsx

import React from "react";

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`border-b pb-2 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  step,
  totalSteps,
  className = "",
  ...props
}) => {
  return (
    <h2 className={`text-2xl font-bold ${className}`} {...props}>
      {children}
      {step !== undefined && totalSteps !== undefined && (
        <span className="text-base font-normal text-gray-500 ml-2">
          - Étape {step}/{totalSteps}
        </span>
      )}
    </h2>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};