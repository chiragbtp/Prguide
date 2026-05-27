import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    />
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 1.9 4.9L19 10l-5.1 2.1L12 17l-1.9-4.9L5 10l5.1-2.1Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </IconBase>
  );
}

export function LayoutDashboardIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1.5" />
      <rect width="11" height="7" x="10" y="3" rx="1.5" />
      <rect width="7" height="11" x="3" y="10" rx="1.5" />
      <rect width="11" height="11" x="10" y="10" rx="1.5" />
    </IconBase>
  );
}

export function GitPullRequestIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="6" r="2.25" />
      <circle cx="18" cy="18" r="2.25" />
      <path d="M6 8.25v9.5a2.5 2.5 0 0 0 2.5 2.5H15" />
      <path d="M18 15.75V6.25a2.5 2.5 0 0 0-2.5-2.5H9" />
    </IconBase>
  );
}

export function ShieldAlertIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 7 3v5c0 4.5-2.7 8.6-7 10-4.3-1.4-7-5.5-7-10V6Z" />
      <path d="M12 8v4" />
      <path d="M12 15h.01" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M15 17H5.5a1.5 1.5 0 0 1-1.1-2.5C5.3 13.4 6 12 6 10.2V9a6 6 0 1 1 12 0v1.2c0 1.8.7 3.2 1.6 4.3a1.5 1.5 0 0 1-1.1 2.5H17" />
      <path d="M9.5 19a2.5 2.5 0 0 0 5 0" />
    </IconBase>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 6 6 6-6 6" />
    </IconBase>
  );
}

export function ActivityIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </IconBase>
  );
}

export function BranchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="6" r="2.25" />
      <circle cx="18" cy="6" r="2.25" />
      <circle cx="18" cy="18" r="2.25" />
      <path d="M8.25 6H15" />
      <path d="M18 8.25v7.5" />
      <path d="M8.25 6v12c0 1.4 1.1 2.5 2.5 2.5H15" />
    </IconBase>
  );
}
