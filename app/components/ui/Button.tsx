"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@app/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded",
    "font-medium",
    "transition-all duration-200",
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-primary",
    "focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "select-none",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:brightness-110 shadow-sm",

        secondary: "bg-secondary text-on-secondary hover:brightness-105",

        outline:
          "border border-outline bg-transparent text-on-surface hover:bg-surface-container",

        ghost: "bg-transparent text-on-surface hover:bg-surface-container",

        destructive: "bg-error text-on-error hover:brightness-110",

        success:
          "bg-secondary-container text-on-secondary-container hover:brightness-95",

        link: "rounded-none p-0 h-auto underline-offset-4 hover:underline text-primary shadow-none",
      },

      size: {
        xs: "h-8 px-3 text-xs",

        sm: "h-9 px-4 text-sm",

        md: "h-11 px-5 text-sm",

        lg: "h-12 px-6 text-base",

        xl: "h-14 px-8 text-lg",

        icon: "h-11 w-11",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      leftIcon,
      rightIcon,
      children,
      fullWidth,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
          }),
          className,
        )}
        {...props}
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : leftIcon}

        {children}

        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
