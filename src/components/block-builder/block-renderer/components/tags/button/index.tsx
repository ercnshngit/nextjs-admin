import React from "react";
import { z } from "zod";

type ButtonProps = z.infer<typeof propsSchema>;
export const propsSchema = z.object({
  className: z.string(),
  value: z.string(),
});

Button.defaultProps = {
  className: "",
  value: "",
};
Button.displayName = "Buton";
Button.typeName = "Page Component";
Button.iconName = "button-icon";

export default function Button({ className, value }: ButtonProps) {
  return <button className={className}>{value}</button>;
}
