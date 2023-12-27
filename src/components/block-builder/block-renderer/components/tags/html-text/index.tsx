import { cn } from "@/libs/utils";
import { z } from "zod";

type HTMLTextProps = z.infer<typeof propsSchema>;
export default function HTMLText({ className, children }: HTMLTextProps) {
  return <p className={className}>{children}</p>;
}

export const propsSchema = z.object({
  className: z.string(),
  children: z.any(),
});
