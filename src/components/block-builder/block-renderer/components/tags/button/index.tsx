import React from "react";
import { z } from "zod";

type ButtonProps = z.infer<typeof propsSchema>;

export default function Button({ className, value }: ButtonProps) {
  return <button className={className}>{value}</button>;
}

export const propsSchema = z.object({
  className: z.string(),
  value: z.string(),
});
