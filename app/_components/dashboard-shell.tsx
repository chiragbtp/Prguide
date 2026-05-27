import Link from "next/link";
import type { ReactNode } from "react";

import {
  ActivityIcon,
  BellIcon,
  BranchIcon,
  SearchIcon,
  SparklesIcon,
} from "@/app/_components/icons";
import { SidebarNav } from "@/app/_components/sidebar-nav";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(47,129,247,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.12),_transparent_22%),linear-gradient(180deg,_rgba(13,17,23,0.97),_rgba(13,17,23,1))]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-[#0d1117]/90 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-r lg:border-b-0">
          <div className="flex h-full flex-col gap-8 p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/10 text-sky-300">
                  <SparklesIcon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">ReviewPilot</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    AI PR Review
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">acme/platform-web</p>
                    <p className="mt-1 font-mono text-xs text-slate-500">
                      main / 47 active reviews
                    </p>
                  </div>
                  <Badge variant="outline">Live</Badge>
                </div>
              </div>
            </div>

            <SidebarNav />

            <div className="mt-auto hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:block">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                <ActivityIcon className="size-4 text-emerald-300" />
                Automation Health
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
                    <span>AI coverage</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-2 w-[92%] rounded-full bg-emerald-400" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
                    <span>Risk drift</span>
                    <span>Low</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-2 w-[24%] rounded-full bg-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0d1117]/80 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Review Command Center
                </p>
                <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                  GitHub-style signal for every pull request
                </h1>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative min-w-0 sm:w-72">
                  <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    aria-label="Search pull requests"
                    className="pl-9"
                    placeholder="Search PRs, files, findings..."
                  />
                </div>
                <button
                  aria-label="Notifications"
                  className={buttonVariants({ variant: "secondary", size: "icon" })}
                >
                  <BellIcon className="size-4" />
                </button>
                <Link
                  className={buttonVariants({ variant: "default" })}
                  href="/reviews/rvw-1024"
                >
                  <BranchIcon className="size-4" />
                  Open flagged review
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
