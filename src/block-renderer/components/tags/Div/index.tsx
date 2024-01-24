import { cn } from "@/libs/utils";
import { z } from "zod";

type DivProps = z.infer<typeof propsSchema>;

export default function Div({ className, children }: DivProps = defaultProps) {
  return <div className={cn(className)}>{children}</div>;
}
export const defaultProps = {
  className: "",
  children: <div></div>,
};
export const displayName = "Div";
export const typeName = "Page Component";
export const iconName = "div-icon";
export const propsSchema = z.object({
  className: z.string(),
  children: z.any(),
});
