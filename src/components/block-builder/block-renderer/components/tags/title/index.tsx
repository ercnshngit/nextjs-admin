import { cn } from "@/libs/utils";

export default function Title({
  className,
  value,
}: {
  className: string;
  value: string;
}) {
  return (
    <div className={cn("font-bold text-xl", className)}>
      {value || "Üzerine tıklayarak düzenleyebilirsiniz"}
    </div>
  );
}
