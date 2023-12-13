import { cn } from "@/libs/utils";

export function HStack({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex bg-gray-100 rounded-md p-4", className)}>
      {children}
    </div>
  );
}
