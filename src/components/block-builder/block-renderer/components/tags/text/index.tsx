import { cn } from "@/libs/utils";
import { z } from "zod";
type TextProps = z.infer<typeof propsSchema>;
export const propsSchema = z.object({
  className: z.string(),
  value: z.string(),
});
export default function Text({ className, value }: TextProps) {
  return (
    <div className={cn("font-bold bg-red-500", className)}>
      {value || "Üzerine tıklayarak düzenleyebilirsiniz"}
    </div>
  );
}
