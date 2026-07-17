import * as React from "react";
import { cn } from "./utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Added 'shadow-subtle' (the token we just created) for depth
        // Added smooth transition states for interactive layouts
        "bg-card text-card-foreground flex flex-col gap-5 rounded-xl border border-slate-200/60 shadow-subtle transition-all duration-200 ease-in-out hover:border-slate-300/80",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Cleaned up spacing slightly for better structural distribution
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-[[data-slot=card-action]]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        // Upgraded semantic tag to h3, added weight, subtle tracking, and color definition
        "text-base font-semibold tracking-tight text-slate-900 leading-none",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        // Set explicit small text size and high readability text color token
        "text-xs text-slate-500 font-medium tracking-wide leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        // Ensures utility components inside action slots match layout height rules seamlessly
        "col-start-2 row-span-2 row-start-1 self-center justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        // Configured default text size guidelines for arbitrary content blocks
        "px-6 text-sm text-slate-700 leading-normal [&:last-child]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        // Added flex wrap and dynamic item centering to prevent mobile buttons from smashing together
        "flex flex-wrap items-center gap-2 px-6 pb-6 [.border-t]:pt-6",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
