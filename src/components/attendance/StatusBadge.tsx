import { AttendanceStatus } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

const statusConfig: Record<
  AttendanceStatus,
  { label: string; className: string }
> = {
  present: {
    label: "Present",
    className: "bg-success text-success-foreground",
  },
  absent: {
    label: "Absent",
    className: "bg-destructive text-destructive-foreground",
  },
  "half-day": {
    label: "Half Day",
    className: "bg-warning text-warning-foreground",
  },
  leave: {
    label: "Leave",
    className: "bg-leave text-leave-foreground",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
