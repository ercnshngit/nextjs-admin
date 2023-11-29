import { cn } from "@/libs/utils";

export function Text({ className, text }: { className: string; text: string }) {
  return (
    <div className={cn("font-bold", className)}>
      {text || "Üzerine tıklayarak düzenleyebilirsiniz"}
    </div>
  );
}
