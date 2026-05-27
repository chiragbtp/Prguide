import Link from "next/link";

import { ArrowRightIcon } from "@/app/_components/icons";
import { SeverityBadge, StatusBadge } from "@/app/_components/review-badges";
import {
  feedbackCards,
  getDashboardSummary,
  getSeverityCounts,
  reviews,
} from "@/app/_lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const summary = getDashboardSummary();

export default function DashboardPage() {
  console.log("Dashboard summary:", summary);
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <Badge variant="outline" className="w-fit">
              Team Overview
            </Badge>
            <CardTitle className="mt-3 text-2xl sm:text-3xl">
              Pull request signal across your engineering surface
            </CardTitle>
            <CardDescription className="max-w-2xl text-base">
              ReviewPilot triages changes across repositories, highlights risky
              diffs, and gives reviewers the shortest path to a confident merge.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <MetricCard
              label="Active reviews"
              value={String(summary.totalReviews)}
              detail="Tracked in this workspace"
            />
            <MetricCard
              label="Need attention"
              value={String(summary.needsAttention)}
              detail="Flagged by AI for human review"
            />
            <MetricCard
              label="Critical findings"
              value={String(summary.criticalFindings)}
              detail="Merge blockers across the queue"
            />
            <MetricCard
              label="AI confidence"
              value={`${summary.avgAiScore}%`}
              detail="Average reviewer confidence"
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {feedbackCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="pb-3">
                <CardDescription>{card.title}</CardDescription>
                <CardTitle className="text-2xl">{card.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-400">{card.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.5fr_0.8fr]">
        <Card>
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <CardTitle>Recent PR Reviews</CardTitle>
              <CardDescription>
                Live queue ordered by last reviewed activity and AI risk signal.
              </CardDescription>
            </div>
            <Badge variant="outline">{summary.avgMergeReadiness}% merge readiness</Badge>
          </CardHeader>
          <CardContent className="px-0 pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Pull request</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>AI score</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="pr-6 text-right">Open</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => {
                    const counts = getSeverityCounts(review);

                    return (
                      <TableRow key={review.id}>
                        <TableCell className="pl-6">
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-100">
                              #{review.number} {review.title}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                              <span>{review.repository}</span>
                              <span className="text-slate-700">/</span>
                              <span>{review.author}</span>
                              <span className="font-mono text-xs">{review.branch}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={review.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {counts.critical > 0 ? (
                              <Badge variant="danger">{counts.critical} critical</Badge>
                            ) : null}
                            {counts.high > 0 ? (
                              <Badge variant="warning">{counts.high} high</Badge>
                            ) : null}
                            {counts.medium > 0 ? (
                              <Badge variant="info">{counts.medium} medium</Badge>
                            ) : null}
                            {counts.low > 0 ? (
                              <Badge variant="outline">{counts.low} low</Badge>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3 text-sm">
                              <span className="font-semibold text-slate-200">
                                {review.aiScore}%
                              </span>
                              <span className="text-slate-500">
                                {review.mergeReadiness}% ready
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-white/5">
                              <div
                                className="h-2 rounded-full bg-sky-400"
                                style={{ width: `${review.aiScore}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-400">
                          {review.updatedAt}
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <Link
                            className={buttonVariants({
                              variant: "ghost",
                              size: "sm",
                              className: "text-slate-100",
                            })}
                            href={`/reviews/${review.id}`}
                          >
                            Details
                            <ArrowRightIcon className="size-4" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Priority Hotspots</CardTitle>
              <CardDescription>
                Files where AI keeps surfacing repeated review friction.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  file: "src/lib/webhooks/retry-queue.ts",
                  severity: "critical" as const,
                  note: "Duplicate mutation risk on replayed events.",
                },
                {
                  file: "src/app/api/github/cache.ts",
                  severity: "high" as const,
                  note: "Repo-scoped invalidation collapsed into a global prefix.",
                },
                {
                  file: "src/components/timeline.tsx",
                  severity: "medium" as const,
                  note: "Reduced-motion path still mounts animation work.",
                },
              ].map((hotspot) => (
                <div
                  key={hotspot.file}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm text-slate-200">{hotspot.file}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {hotspot.note}
                      </p>
                    </div>
                    <SeverityBadge severity={hotspot.severity} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reviewer Snapshot</CardTitle>
              <CardDescription>
                Suggested next actions for the on-call reviewer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Resolve the webhook idempotency blocker before merging queue infrastructure changes.",
                "Ask the design-system owner for a reduced-motion follow-up on the timeline PR.",
                "Merge the sandbox startup hardening after the log label cleanup is noted.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}
