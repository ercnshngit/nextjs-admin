import { cn } from "@/libs/utils";

export function Text({
  className,
  value,
  children,
}: {
  className: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("font-bold", className)}>
      {value || "Üzerine tıklayarak düzenleyebilirsiniz"}
      {children}
    </div>
  );
}
