import { cn } from "@/libs/utils";
import { z } from "zod";

type CardGridProps = z.infer<typeof propsSchema>;
export default function CardGrid({ className, items }: CardGridProps) {
  return (
    <div className={cn("flex bg-gray-100 rounded-md p-4", className)}>
      {JSON.stringify(items)}
    </div>
  );
}

export const propsSchema = z.object({
  className: z.string(),
  items: z.array(z.any()),
});
