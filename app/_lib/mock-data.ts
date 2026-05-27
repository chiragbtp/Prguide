import type {
  IssueSeverity,
  ReviewStatus,
} from "@/app/_components/review-badges";

export type ReviewIssue = {
  id: string;
  severity: IssueSeverity;
  title: string;
  file: string;
  line: number;
  summary: string;
};

export type TouchedFile = {
  path: string;
  changeType: "modified" | "added" | "removed";
  notes: string;
};

export type AIReviewComment = {
  id: string;
  severity: IssueSeverity;
  file: string;
  line: number;
  title: string;
  comment: string;
};

export type SuggestionCard = {
  id: string;
  title: string;
  summary: string;
  action: string;
};

export type PullRequestReview = {
  id: string;
  number: number;
  repository: string;
  title: string;
  author: string;
  branch: string;
  status: ReviewStatus;
  updatedAt: string;
  aiScore: number;
  mergeReadiness: number;
  changedFiles: number;
  comments: number;
  summary: string;
  recommendation: string;
  issues: ReviewIssue[];
  aiComments: AIReviewComment[];
  suggestions: SuggestionCard[];
  strengths: string[];
  concerns: string[];
  checklist: string[];
  touchedFiles: TouchedFile[];
  metrics: {
    security: number;
    maintainability: number;
    testCoverage: number;
    performance: number;
  };
};

export const reviews: PullRequestReview[] = [
  {
    id: "rvw-1024",
    number: 1842,
    repository: "acme/platform-web",
    title: "Refactor webhook retries and cache invalidation path",
    author: "Avery Chen",
    branch: "feat/retry-cache-rework",
    status: "action-required",
    updatedAt: "8 minutes ago",
    aiScore: 74,
    mergeReadiness: 58,
    changedFiles: 17,
    comments: 9,
    summary:
      "Retry behavior is more resilient, but the cache reset path now risks duplicated writes after partial failures.",
    recommendation:
      "Block merge until the idempotency guard and missing regression test are restored.",
    issues: [
      {
        id: "iss-01",
        severity: "critical",
        title: "Idempotency key is skipped on retry replay",
        file: "src/lib/webhooks/retry-queue.ts",
        line: 118,
        summary:
          "A repeated webhook can replay the mutation path and persist duplicate state when the worker resumes after a timeout.",
      },
      {
        id: "iss-02",
        severity: "high",
        title: "Cache invalidation is broad and can flush unrelated repos",
        file: "src/app/api/github/cache.ts",
        line: 44,
        summary:
          "The new cache prefix now groups all repositories together, causing unnecessary refresh storms in active teams.",
      },
      {
        id: "iss-03",
        severity: "medium",
        title: "Regression coverage missing for partial backoff scenario",
        file: "tests/webhooks/retry-queue.test.ts",
        line: 1,
        summary:
          "Existing tests cover success and total failure, but not the recoverable timeout branch introduced here.",
      },
    ],
    aiComments: [
      {
        id: "cmt-01",
        severity: "critical",
        file: "src/lib/webhooks/retry-queue.ts",
        line: 118,
        title: "Retry replay can duplicate writes",
        comment:
          "The mutation path runs before the replay key is persisted, so a resumed worker can apply the same webhook twice after a timeout.",
      },
      {
        id: "cmt-02",
        severity: "high",
        file: "src/app/api/github/cache.ts",
        line: 44,
        title: "Invalidation scope is too broad",
        comment:
          "This cache prefix appears to fan out across repositories. A repo or PR scoped key would prevent unnecessary refresh storms.",
      },
      {
        id: "cmt-03",
        severity: "medium",
        file: "tests/webhooks/retry-queue.test.ts",
        line: 1,
        title: "Missing regression coverage",
        comment:
          "Add a case for timeout recovery followed by a successful replay so the retry semantics stay locked down in future refactors.",
      },
    ],
    suggestions: [
      {
        id: "sg-01",
        title: "Persist the idempotency key first",
        summary:
          "Move replay-key persistence ahead of the state mutation so retries become safe by default.",
        action:
          "Reorder the write path and guard duplicate webhook execution before side effects fire.",
      },
      {
        id: "sg-02",
        title: "Narrow cache invalidation",
        summary:
          "Use repository and pull request identifiers instead of the new shared prefix.",
        action:
          "Key invalidation by repo slug and PR number to avoid evicting unrelated review data.",
      },
      {
        id: "sg-03",
        title: "Add a targeted timeout test",
        summary:
          "Capture the partial failure branch introduced by the refactor so this bug does not regress.",
        action:
          "Add one deterministic retry test for timeout, resume, and single-write success.",
      },
    ],
    strengths: [
      "Retry orchestration is easier to follow after extracting the queue runner.",
      "Observability improves with clearer structured log payloads around webhook execution.",
    ],
    concerns: [
      "State mutations now happen before the replay key is persisted.",
      "The new invalidation helper changed scope without a feature flag or migration note.",
    ],
    checklist: [
      "Restore an idempotency guard before the mutation path runs.",
      "Add a regression test for a timeout followed by a successful replay.",
      "Narrow cache invalidation to repository and PR scope.",
    ],
    touchedFiles: [
      {
        path: "src/lib/webhooks/retry-queue.ts",
        changeType: "modified",
        notes: "New retry coordinator and replay semantics.",
      },
      {
        path: "src/app/api/github/cache.ts",
        changeType: "modified",
        notes: "Shared invalidation helper now keys by a wider prefix.",
      },
      {
        path: "tests/webhooks/retry-queue.test.ts",
        changeType: "modified",
        notes: "Updated fixtures, but timeout case is still absent.",
      },
    ],
    metrics: {
      security: 46,
      maintainability: 78,
      testCoverage: 61,
      performance: 68,
    },
  },
  {
    id: "rvw-1025",
    number: 1838,
    repository: "acme/design-system",
    title: "Ship compact timeline component for activity feeds",
    author: "Jordan Patel",
    branch: "feat/compact-timeline",
    status: "watching",
    updatedAt: "21 minutes ago",
    aiScore: 89,
    mergeReadiness: 84,
    changedFiles: 9,
    comments: 4,
    summary:
      "The component API is clean and accessible, with one medium concern around animation fallback on reduced motion.",
    recommendation:
      "Safe to merge after a quick pass on reduced-motion handling.",
    issues: [
      {
        id: "iss-04",
        severity: "medium",
        title: "Reduced motion branch still mounts animated timeline markers",
        file: "src/components/timeline.tsx",
        line: 71,
        summary:
          "Markers stop moving visually, but the animation loop still mounts and consumes work in assistive scenarios.",
      },
    ],
    aiComments: [
      {
        id: "cmt-04",
        severity: "medium",
        file: "src/components/timeline.tsx",
        line: 71,
        title: "Reduced-motion mode still mounts animation work",
        comment:
          "The visual motion is disabled, but the animated marker tree still mounts and does background work in reduced-motion scenarios.",
      },
      {
        id: "cmt-05",
        severity: "low",
        file: "src/styles/motion.css",
        line: 12,
        title: "Motion token cleanup is optional",
        comment:
          "The new keyframes are fine, but documenting their intended use would make future feed variants easier to maintain.",
      },
    ],
    suggestions: [
      {
        id: "sg-04",
        title: "Skip the animated branch entirely",
        summary:
          "Prefer a static marker tree when reduced motion is enabled.",
        action:
          "Gate the animated markup behind the motion preference instead of only changing CSS behavior.",
      },
      {
        id: "sg-05",
        title: "Add a dense-feed story",
        summary:
          "The component would benefit from a high-content example before release.",
        action:
          "Cover long activity labels and stacked timestamps in Storybook.",
      },
    ],
    strengths: [
      "Token usage matches the existing design system contract.",
      "Keyboard focus order and aria labels are well handled.",
    ],
    concerns: [
      "Reduced-motion fallback should skip the animated branch entirely.",
    ],
    checklist: [
      "Gate the marker animation tree behind the reduced-motion setting.",
      "Add a quick story for dense feed content.",
    ],
    touchedFiles: [
      {
        path: "src/components/timeline.tsx",
        changeType: "added",
        notes: "New compact timeline component and slot API.",
      },
      {
        path: "src/styles/motion.css",
        changeType: "modified",
        notes: "Adds timeline keyframes and motion tokens.",
      },
    ],
    metrics: {
      security: 92,
      maintainability: 88,
      testCoverage: 77,
      performance: 82,
    },
  },
  {
    id: "rvw-1026",
    number: 1831,
    repository: "acme/worker-runtime",
    title: "Harden sandbox startup for ephemeral review jobs",
    author: "Sam Rivera",
    branch: "fix/sandbox-startup-race",
    status: "approved",
    updatedAt: "1 hour ago",
    aiScore: 96,
    mergeReadiness: 97,
    changedFiles: 6,
    comments: 2,
    summary:
      "The startup race is resolved cleanly and the fallback path is safer than the previous implementation.",
    recommendation: "Approved for merge.",
    issues: [
      {
        id: "iss-05",
        severity: "low",
        title: "Log line still references legacy queue name",
        file: "src/runtime/bootstrap.ts",
        line: 219,
        summary:
          "Cosmetic mismatch only, but updating it will help on-call debugging stay consistent.",
      },
    ],
    aiComments: [
      {
        id: "cmt-06",
        severity: "low",
        file: "src/runtime/bootstrap.ts",
        line: 219,
        title: "Legacy queue label remains in logs",
        comment:
          "Behavior looks correct, but the old queue name still appears in one log line and could slow down on-call debugging.",
      },
    ],
    suggestions: [
      {
        id: "sg-06",
        title: "Rename the log label",
        summary:
          "A small follow-up keeps operational language aligned with the new startup path.",
        action:
          "Update the final bootstrap log message to the new queue name before or after merge.",
      },
    ],
    strengths: [
      "Failure handling is explicit and easier to reason about during cold starts.",
      "Tests capture the original race and the corrected behavior.",
    ],
    concerns: [],
    checklist: ["Rename the legacy queue log label in follow-up cleanup."],
    touchedFiles: [
      {
        path: "src/runtime/bootstrap.ts",
        changeType: "modified",
        notes: "Adds guarded startup path and clearer failure branches.",
      },
      {
        path: "tests/runtime/bootstrap.test.ts",
        changeType: "modified",
        notes: "Covers concurrent startup timing with deterministic clocks.",
      },
    ],
    metrics: {
      security: 95,
      maintainability: 91,
      testCoverage: 93,
      performance: 90,
    },
  },
];

export const feedbackCards = [
  {
    title: "Security posture",
    value: "1 blocker",
    detail: "The retry replay path is the only merge-stopping issue in the queue.",
  },
  {
    title: "Testing debt",
    value: "2 follow-ups",
    detail: "Coverage gaps cluster around timeout recovery and reduced-motion fallbacks.",
  },
  {
    title: "Merge readiness",
    value: "79%",
    detail: "Most active reviews are safe after targeted fixes instead of broad rewrites.",
  },
];

export function getReviewById(id: string) {
  return reviews.find((review) => review.id === id);
}

export function getSeverityCounts(review: PullRequestReview) {
  return review.issues.reduce(
    (counts, issue) => {
      counts[issue.severity] += 1;
      return counts;
    },
    {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
  );
}

export function getDashboardSummary() {
  const totals = reviews.reduce(
    (summary, review) => {
      summary.totalReviews += 1;
      summary.avgAiScore += review.aiScore;
      summary.avgMergeReadiness += review.mergeReadiness;

      if (review.status === "action-required") {
        summary.needsAttention += 1;
      }

      for (const issue of review.issues) {
        if (issue.severity === "critical") {
          summary.criticalFindings += 1;
        }
      }

      return summary;
    },
    {
      totalReviews: 0,
      avgAiScore: 0,
      avgMergeReadiness: 0,
      needsAttention: 0,
      criticalFindings: 0,
    },
  );

  return {
    totalReviews: totals.totalReviews,
    needsAttention: totals.needsAttention,
    criticalFindings: totals.criticalFindings,
    avgAiScore: Math.round(totals.avgAiScore / totals.totalReviews),
    avgMergeReadiness: Math.round(
      totals.avgMergeReadiness / totals.totalReviews,
    ),
  };
}
