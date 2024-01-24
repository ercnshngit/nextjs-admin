import { cn } from "@/libs/utils";
import { z } from "zod";
type VStackProps = z.infer<typeof propsSchema>;
export const propsSchema = z.object({
  className: z.string(),
  children: z.any(),
});
export default function VStack({ className, children }: VStackProps) {
  return (
    <div className={cn("flex flex-col bg-gray-100 rounded-md p-4", className)}>
      {children}
    </div>
  );
}
