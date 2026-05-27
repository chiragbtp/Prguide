import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowRightIcon,
  ChevronRightIcon,
  GitPullRequestIcon,
  SparklesIcon,
} from "@/app/_components/icons";
import { SeverityBadge, StatusBadge } from "@/app/_components/review-badges";
import { getReviewById } from "@/app/_lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ReviewDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = getReviewById(id);

  if (!review) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(22,27,34,0.98),rgba(13,17,23,0.92)),radial-gradient(circle_at_top_right,rgba(47,129,247,0.24),transparent_36%)] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Link className="hover:text-slate-300" href="/dashboard">
                Dashboard
              </Link>
              <ChevronRightIcon className="size-4" />
              <span>Review Details</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <GitPullRequestIcon className="size-3.5" />
                PR #{review.number}
              </Badge>
              <Badge variant="outline">{review.repository}</Badge>
              <StatusBadge status={review.status} />
            </div>

            <div className="space-y-3">
              <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {review.title}
              </h2>
              <p className="max-w-3xl text-base leading-7 text-slate-400">
                {review.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-slate-500">
              <span>{review.author}</span>
              <span>/</span>
              <span className="font-mono">{review.branch}</span>
              <span>/</span>
              <span>{review.updatedAt}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              className={buttonVariants({ variant: "default" })}
              href="#ai-review-comments"
            >
              <SparklesIcon className="size-4" />
              Jump to AI review
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/dashboard"
            >
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <HeroStat
            label="Repository"
            value={review.repository}
            detail="Source of the active pull request under review."
            mono
          />
          <HeroStat
            label="Changed files"
            value={String(review.changedFiles)}
            detail="Files touched across implementation, tests, and support code."
          />
          <HeroStat
            label="AI confidence"
            value={`${review.aiScore}%`}
            detail="Confidence in the current automated recommendation."
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricPanel
          label="Merge readiness"
          value={`${review.mergeReadiness}%`}
          detail="Estimated readiness after resolving the flagged issues."
        />
        <MetricPanel
          label="AI comments"
          value={String(review.aiComments.length)}
          detail="Inline findings highlighted by the automated review."
        />
        <MetricPanel
          label="Suggestions"
          value={String(review.suggestions.length)}
          detail="Concrete follow-up actions recommended for the author."
        />
        <MetricPanel
          label="Severity findings"
          value={String(review.issues.length)}
          detail="Tracked issues currently attached to this review."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card id="ai-review-comments">
          <CardHeader>
            <Badge variant="outline" className="w-fit">
              AI Review Comments
            </Badge>
            <CardTitle className="mt-3">Automated feedback on the current diff</CardTitle>
            <CardDescription>
              Developer-focused comments with file references, severity labels,
              and the reasoning behind each finding.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {review.aiComments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-semibold text-slate-100">
                        {comment.title}
                      </p>
                      <SeverityBadge severity={comment.severity} />
                    </div>
                    <p className="font-mono text-xs text-slate-500">
                      {comment.file}:{comment.line}
                    </p>
                    <p className="text-sm leading-7 text-slate-300">
                      {comment.comment}
                    </p>
                  </div>
                  <Badge variant="outline">AI reviewer</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="outline" className="w-fit">
              Suggestion Cards
            </Badge>
            <CardTitle className="mt-3">{review.recommendation}</CardTitle>
            <CardDescription>
              Action-oriented fixes the author can apply before the next review pass.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {review.suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="rounded-2xl border border-sky-500/15 bg-sky-500/[0.06] p-4"
              >
                <p className="text-sm font-semibold text-slate-100">
                  {suggestion.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {suggestion.summary}
                </p>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Suggested action
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {suggestion.action}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <Badge variant="outline" className="w-fit">
              Changed Files
            </Badge>
            <CardTitle className="mt-3">Files touched by this pull request</CardTitle>
            <CardDescription>
              High-signal changed files with notes about where the review effort should focus.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {review.touchedFiles.map((file) => (
              <div
                key={file.path}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-sm text-slate-200">{file.path}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {file.notes}
                    </p>
                  </div>
                  <Badge variant="outline">{file.changeType}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Severity Labels</CardTitle>
              <CardDescription>
                Current issue set grouped by impact on safety, quality, and merge risk.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {review.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-100">
                        {issue.title}
                      </p>
                      <p className="font-mono text-xs text-slate-500">
                        {issue.file}:{issue.line}
                      </p>
                    </div>
                    <SeverityBadge severity={issue.severity} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reviewer Notes</CardTitle>
              <CardDescription>
                Quick merge guidance distilled from the current automated pass.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {review.checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <ArrowRightIcon className="mt-1 size-4 shrink-0 text-sky-300" />
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function HeroStat({
  label,
  value,
  detail,
  mono = false,
}: {
  label: string;
  value: string;
  detail: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p
        className={`mt-3 text-2xl font-semibold text-white ${
          mono ? "font-mono text-lg sm:text-xl" : "tracking-tight"
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}

function MetricPanel({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate-400">{detail}</p>
      </CardContent>
    </Card>
  );
}
