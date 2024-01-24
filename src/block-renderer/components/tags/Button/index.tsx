import React from "react";
import { z } from "zod";

type ButtonProps = z.infer<typeof propsSchema>;
export const propsSchema = z.object({
  className: z.string(),
  value: z.string(),
});

export const defaultProps = {
  className: "",
  value: "",
};
export const displayName = "Buton";
export const typeName = "Page Component";
export const iconName = "button-icon";

export default function Button({
  className,
  value,
}: ButtonProps = defaultProps) {
  return <button className={className}>{value}</button>;
}
