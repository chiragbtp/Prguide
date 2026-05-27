"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  GitPullRequestIcon,
  LayoutDashboardIcon,
  ShieldAlertIcon,
} from "@/app/_components/icons";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Overview and AI signal",
    icon: LayoutDashboardIcon,
    match: (pathname: string) => pathname === "/dashboard",
  },
  {
    href: "/reviews/rvw-1024",
    label: "Review Queue",
    description: "Drill into flagged pull requests",
    icon: GitPullRequestIcon,
    match: (pathname: string) => pathname.startsWith("/reviews/"),
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-3 overflow-x-auto lg:flex-col">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.match(pathname);

        return (
          <Link
            key={item.href}
            className={cn(
              "group min-w-60 rounded-2xl border p-4 transition-colors lg:min-w-0",
              active
                ? "border-sky-500/30 bg-sky-500/10"
                : "border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.045]",
            )}
            href={item.href}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 inline-flex size-9 items-center justify-center rounded-xl border",
                  active
                    ? "border-sky-400/30 bg-sky-400/10 text-sky-300"
                    : "border-white/10 bg-white/5 text-slate-400 group-hover:text-slate-200",
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="space-y-1">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    active ? "text-white" : "text-slate-200",
                  )}
                >
                  {item.label}
                </p>
                <p className="text-xs leading-5 text-slate-500">{item.description}</p>
              </div>
            </div>
          </Link>
        );
      })}

      <div className="hidden rounded-2xl border border-rose-500/15 bg-rose-500/5 p-4 lg:block">
        <div className="flex items-center gap-2 text-sm font-semibold text-rose-200">
          <ShieldAlertIcon className="size-4" />
          Blockers Detected
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          3 high-priority findings need a human response before merge.
        </p>
      </div>
    </nav>
  );
}
