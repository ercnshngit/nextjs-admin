import { cn } from "@/libs/utils";
import { z } from "zod";

type DivProps = z.infer<typeof propsSchema>;

export default function Div({ className, children }: DivProps) {
  return <div className={cn(className)}>{children}</div>;
}

export const propsSchema = z.object({
  className: z.string(),
  children: z.any(),
});
