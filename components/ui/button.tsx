import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariantsMap = {
  default:
    "border border-sky-500/30 bg-sky-500 text-slate-950 shadow-[0_0_0_1px_rgba(56,139,253,0.08)] hover:bg-sky-400",
  secondary:
    "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
  ghost: "border border-transparent bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
  outline:
    "border border-white/10 bg-transparent text-slate-100 hover:bg-white/5",
} as const;

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 py-2 text-sm",
  lg: "h-11 px-5 py-2.5",
  icon: "size-10",
} as const;

type ButtonVariant = keyof typeof buttonVariantsMap;
type ButtonSize = keyof typeof buttonSizes;

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 disabled:pointer-events-none disabled:opacity-50",
    buttonVariantsMap[variant],
    buttonSizes[size],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      type={type}
      {...props}
    />
  );
}
