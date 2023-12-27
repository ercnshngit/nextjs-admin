import { cn } from "@/libs/utils";
import { z } from "zod";
type TitleProps = z.infer<typeof propsSchema>;
export const propsSchema = z.object({
  className: z.string(),
  value: z.string(),
});
export default function Title({ className, value }: TitleProps) {
  return (
    <div className={cn("font-bold text-xl", className)}>
      {value || "Üzerine tıklayarak düzenleyebilirsiniz"}
    </div>
  );
}
