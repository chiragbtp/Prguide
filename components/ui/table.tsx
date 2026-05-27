import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Table({ className, ...props }: ComponentProps<"table">) {
  return <table className={cn("w-full caption-bottom text-sm", className)} {...props} />;
}

export function TableHeader({
  className,
  ...props
}: ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b [&_tr]:border-white/10", className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0 [&_tr]:border-b [&_tr]:border-white/5", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-white/[0.035] data-[state=selected]:bg-white/[0.045]",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle text-xs font-semibold uppercase tracking-[0.18em] text-slate-500",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("px-4 py-4 align-middle", className)} {...props} />;
}
