import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "glow";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer rounded-xl";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
      md: "px-5 py-2.5 text-sm font-medium gap-2",
      lg: "px-7 py-3.5 text-base font-semibold gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:brightness-110 border border-amber-400/30",
      secondary:
        "bg-slate-800/90 text-slate-100 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 shadow-sm backdrop-blur-md",
      gold:
        "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-semibold shadow-md shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] border border-amber-300/40",
      glow:
        "relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:scale-[1.02] transition-all",
      outline:
        "border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 backdrop-blur-sm",
      ghost:
        "text-slate-300 hover:text-white hover:bg-slate-800/60",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
