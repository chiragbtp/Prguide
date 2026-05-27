import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "border-white/10 bg-white/5 text-slate-200",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  danger: "border-rose-500/20 bg-rose-500/10 text-rose-300",
  info: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  outline: "border-white/10 bg-transparent text-slate-300",
} as const;

type BadgeProps = ComponentProps<"span"> & {
  variant?: keyof typeof badgeVariants;
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
