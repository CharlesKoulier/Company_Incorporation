// src/components/ui/index.jsx

import React from "react";

// Card Components
export const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-xl border bg-white text-gray-950 shadow ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({
  className = "",
  children,
  step,
  totalSteps,
  ...props
}) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
    {step !== undefined && totalSteps !== undefined && (
      <span className="text-base font-normal text-gray-500 ml-2">
        - Étape {step}/{totalSteps}
      </span>
    )}
  </h3>
);

export const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Input Component
export const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 ${className}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

// Button Component
export const Button = React.forwardRef(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-violet-600 text-white hover:bg-violet-700",
      outline: "border border-violet-200 hover:bg-violet-50",
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// Label Component
export const Label = ({ className = "", children, ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
);

// Alert Components
export const Alert = ({ className = "", children, ...props }) => (
  <div
    role="alert"
    className={`relative rounded-lg border p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const AlertDescription = ({ className = "", children, ...props }) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
    {children}
  </div>
);

// Progress Component
export const Progress = ({ value, className = "", ...props }) => (
  <div
    className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-violet-600 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
);

// Select Components
export const Select = React.forwardRef(
  ({ children, value, onChange, className = "", ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="relative" ref={ref} {...props}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { value, onChange, isOpen, setIsOpen })
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export const SelectTrigger = ({
  children,
  isOpen,
  setIsOpen,
  className = "",
  ...props
}) => (
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 ${className}`}
    {...props}
  >
    {children}
    <span className="ml-2">▼</span>
  </button>
);

export const SelectContent = ({ children, isOpen, className = "", ...props }) =>
  isOpen ? (
    <div
      className={`absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border bg-white shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  ) : null;

export const SelectItem = ({
  children,
  value,
  onChange,
  setIsOpen,
  className = "",
  ...props
}) => (
  <div
    className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 ${className}`}
    onClick={() => {
      onChange(value);
      setIsOpen(false);
    }}
    {...props}
  >
    {children}
  </div>
);

// Radio Group Components
export const RadioGroup = ({ className = "", children, ...props }) => (
  <div className={`grid gap-2 ${className}`} role="radiogroup" {...props}>
    {children}
  </div>
);

export const RadioGroupItem = ({ className = "", children, ...props }) => (
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      className={`h-4 w-4 rounded-full border-gray-300 text-violet-600 focus:ring-violet-600 ${className}`}
      {...props}
    />
    {children}
  </div>
);

// Dialog Components
export const AlertDialog = ({ open, children, ...props }) =>
  open ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      {...props}
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  ) : null;

export const AlertDialogContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const AlertDialogHeader = ({ className = "", children, ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const AlertDialogFooter = ({ className = "", children, ...props }) => (
  <div className={`mt-6 flex justify-end space-x-2 ${className}`} {...props}>
    {children}
  </div>
);

export const AlertDialogTitle = ({ className = "", children, ...props }) => (
  <h2 className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </h2>
);

export const AlertDialogDescription = ({
  className = "",
  children,
  ...props
}) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

export const AlertDialogAction = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const AlertDialogCancel = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded bg-gray-100 px=4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);