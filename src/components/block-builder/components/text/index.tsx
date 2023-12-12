import { cn } from "@/libs/utils";

export function Text({
  className,
  value,
}: {
  className: string;
  value: string;
}) {
  return (
    <div className={cn("font-bold", className)}>
      {value || "Üzerine tıklayarak düzenleyebilirsiniz"}
    </div>
  );
}
