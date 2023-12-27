import React from "react";
import { z } from "zod";

type ImageProps = z.infer<typeof propsSchema>;

export default function Image({ className, src }: ImageProps) {
  return (
    <img
      className={className}
      src={"https://" + process.env.NEXT_PUBLIC_FILE_URL + src}
      alt=""
    />
  );
}

export const propsSchema = z.object({
  className: z.string(),
  src: z.string(),
});
