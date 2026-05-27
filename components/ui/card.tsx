import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-[#161b22]/90 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.9)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-lg font-semibold tracking-tight text-slate-50", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p className={cn("text-sm leading-6 text-slate-400", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
