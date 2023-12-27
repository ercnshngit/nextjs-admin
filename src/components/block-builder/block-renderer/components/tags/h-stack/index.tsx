import { cn } from "@/libs/utils";
import { z } from "zod";

type HStackProps = z.infer<typeof propsSchema>;

export default function HStack({ className, children }: HStackProps) {
  return (
    <div className={cn("flex bg-gray-100 rounded-md p-4", className)}>
      {children}
    </div>
  );
}

export const propsSchema = z.object({
  className: z.string(),
  children: z.any(),
});
