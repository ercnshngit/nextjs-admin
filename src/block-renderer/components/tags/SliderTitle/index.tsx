import { cn } from "@/libs/utils";
import clsx from "clsx";
import React from "react";

export default function SliderTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "mb-[1em] text-4xl font-bold leading-none text-white lg:text-6xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
