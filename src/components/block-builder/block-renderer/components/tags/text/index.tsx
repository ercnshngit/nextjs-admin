import { cn } from "@/libs/utils";

export default function Text({
  className,
  value,
}: {
  className: string;
  value: string;
}) {
  return (
    <div className={cn("font-bold bg-red-500", className)}>
      {value || "Üzerine tıklayarak düzenleyebilirsiniz"}
    </div>
  );
}
