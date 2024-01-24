import { cn } from "@/libs/utils";
import React from "react";

export default function Description({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "mb-[1em] text-justify text-lg font-light text-text-black lg:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}
