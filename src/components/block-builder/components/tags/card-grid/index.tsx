import { cn } from "@/libs/utils";

export function CardGrid({
  className,
  items,
}: {
  className: string;
  items: any[];
}) {
  return (
    <div className={cn("flex bg-gray-100 rounded-md p-4", className)}>
      {JSON.stringify(items)}
    </div>
  );
}
