import { Badge } from "@/components/ui/badge";

export type ReviewStatus = "approved" | "watching" | "action-required";
export type IssueSeverity = "critical" | "high" | "medium" | "low";

export function StatusBadge({ status }: { status: ReviewStatus }) {
  const config = {
    approved: { label: "Approved", variant: "success" as const },
    watching: { label: "Watching", variant: "info" as const },
    "action-required": {
      label: "Action Required",
      variant: "warning" as const,
    },
  };

  return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
}

export function SeverityBadge({ severity }: { severity: IssueSeverity }) {
  const config = {
    critical: { label: "Critical", variant: "danger" as const },
    high: { label: "High", variant: "warning" as const },
    medium: { label: "Medium", variant: "info" as const },
    low: { label: "Low", variant: "outline" as const },
  };

  return <Badge variant={config[severity].variant}>{config[severity].label}</Badge>;
}
