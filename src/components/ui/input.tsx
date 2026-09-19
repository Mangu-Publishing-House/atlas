import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-sm border border-border-strong bg-elevated px-3 text-sm text-fg placeholder:text-muted outline-none transition-colors duration-150 focus:ring-2 focus:ring-accent/40",
        className,
      )}
      {...props}
    />
  );
}
