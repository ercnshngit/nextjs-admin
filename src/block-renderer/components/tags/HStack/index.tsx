import { cn } from "@/libs/utils";
import { z } from "zod";

type HStackProps = z.infer<typeof propsSchema>;

export default function HStack({
  className,
  children,
}: HStackProps = defaultProps) {
  return (
    <div className={cn("flex bg-gray-100 rounded-md p-4", className)}>
      {children}
    </div>
  );
}
export const defaultProps = {
  className: "",
  children: <div></div>,
};
export const displayName = "Card Grid";
export const typeName = "Page Component";
export const iconName = "grid-icon";
export const propsSchema = z.object({
  className: z.string(),
  children: z.any(),
});
