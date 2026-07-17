"use client";

import * as React from "react";
import { cn } from "@app/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Generate dynamic IDs for proper accessibility mapping
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-xs font-semibold tracking-wide uppercase transition-colors select-none",
              error ? "text-error" : "text-on-surface/80",
              disabled && "opacity-50",
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "group relative flex h-10 w-full items-center rounded border bg-surface-container-low transition-all duration-200 shadow-sm",
            error
              ? "border-error focus-within:border-error focus-within:ring-2 focus-within:ring-error/20"
              : "border-outline-variant hover:border-outline focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
            disabled && "cursor-not-allowed bg-slate-100/50 opacity-60",
          )}
        >
          {/* Left Icon: Centered explicitly inside a fixed structural square */}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(
              "h-full w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/60 disabled:cursor-not-allowed",
              leftIcon ? "pl-1" : "pl-3.5",
              rightIcon ? "pr-1" : "pr-3.5",
              className,
            )}
            {...props}
          />

          {/* Right Icon: Centered explicitly inside a fixed structural square */}
        </div>

        {/* Message Footers */}
        {error ? (
          <p
            id={errorId}
            className="text-xs font-medium text-error leading-normal animate-in fade-in-50 duration-150"
          >
            {error}
          </p>
        ) : (
          hint && (
            <p
              id={hintId}
              className="text-xs text-on-surface-variant/80 leading-normal"
            >
              {hint}
            </p>
          )
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
