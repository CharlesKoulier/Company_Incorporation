// components/ui/alert/index.jsx

import React from "react";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none mx-2";

    const variants = {
      default:
        "bg-gray-900 text-gray-50 shadow-sm hover:bg-gray-800 hover:shadow-md hover:translate-y-[-1px] active:translate-y-[1px]",
      destructive:
        "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-md hover:translate-y-[-1px] active:translate-y-[1px]",
      outline:
        "border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:translate-y-[-1px] active:translate-y-[1px]",
      secondary:
        "bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200 hover:shadow-md hover:translate-y-[-1px] active:translate-y-[1px]",
      ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      link: "text-gray-700 underline-offset-4 hover:text-gray-900 hover:underline",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5 text-sm",
      sm: "h-9 px-4 py-2 text-sm",
      lg: "h-12 px-8 py-3 text-base",
      icon: "h-11 w-11",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };