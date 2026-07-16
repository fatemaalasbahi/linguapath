import { Card } from "@/components/ui/Card";
import type { ProgressHistoryItem } from "@/lib/progress/format";

type ProgressHistoryProps = {
  items: ProgressHistoryItem[];
};

export function ProgressHistory({ items }: ProgressHistoryProps) {
  return (
    <Card className="space-y-4 p-5">
      <h2 className="text-base font-semibold text-neutral-900">
        Activity History
      </h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-neutral-100 bg-neutral-50 px-4 py-3"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-900">
                {item.label}
              </p>
              <p className="text-xs text-neutral-500">
                {item.completedAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <p className="text-sm font-semibold text-neutral-900">
              {item.value}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
