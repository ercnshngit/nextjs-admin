import React from "react";
import { z } from "zod";

type ImageProps = z.infer<typeof propsSchema>;

export default function Image({ className, src }: ImageProps = defaultProps) {
  return (
    <img
      className={className}
      src={"https://" + process.env.NEXT_PUBLIC_FILE_URL + src}
      alt=""
    />
  );
}
export const defaultProps = {
  className: "",
  src: "",
};
export const displayName = "Resim";
export const typeName = "Page Component";
export const iconName = "image-icon";
export const propsSchema = z.object({
  className: z.string(),
  src: z.string(),
});
