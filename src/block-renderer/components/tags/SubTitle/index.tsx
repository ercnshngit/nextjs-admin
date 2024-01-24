import { cn } from "@/libs/utils";
import React from "react";

export default function SubTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "mb-[1em] text-xl font-bold leading-none text-secondary-blue lg:text-2xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
