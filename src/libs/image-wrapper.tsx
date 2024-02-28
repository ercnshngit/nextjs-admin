"use client";
import Image from "next/image";
import React, { forwardRef } from "react";
import { cn } from "./utils";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  src: string;
  alt?: string;
}
const ImageWrapper = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div ref={ref} className={cn("relative", props.className)}>
      <Image
        src={process.env.NEXT_PUBLIC_FILE_URL + props.src}
        alt={props.alt || props.src}
        fill
      />
    </div>
  );
});
ImageWrapper.displayName = "ImageWrapper";

export default ImageWrapper;
export const MotionImageWrapper = motion(ImageWrapper);
