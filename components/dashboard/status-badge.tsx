import { STATUS_LABEL, type FilingStatus } from "@/lib/filing-types";

const styles: Record<FilingStatus, string> = {
  draft: "bg-forest/5 text-muted ring-forest/10",
  submitted: "bg-review/10 text-review ring-review/25",
  in_review: "bg-review/10 text-review ring-review/25",
  pack_ready: "bg-clear/10 text-clear ring-clear/25",
  closed: "bg-forest/5 text-faint ring-forest/10",
};

export function StatusBadge({ status }: { status: FilingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
