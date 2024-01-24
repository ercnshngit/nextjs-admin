import { cn } from "@/libs/utils";
import React from "react";
import { ImSpinner2 } from "react-icons/im";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <ImSpinner2 className="animate-spin h-12 w-12" />
    </div>
  );
}
