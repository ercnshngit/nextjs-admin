import React from "react";
import { z } from "zod";

type ButtonProps = z.infer<typeof propsSchema>;
export const propsSchema = z.object({
  className: z.string(),
  value: z.string(),
});
export const defaultProps: z.infer<typeof propsSchema> = {
  className: "",
  value: "",
};
Button.displayName = "Button";

export default function Button({ className, value }: ButtonProps) {
  return <button className={className}>{value}</button>;
}
