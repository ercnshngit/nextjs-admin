import { cn } from "@/libs/utils";

export function VStack({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col bg-gray-100 rounded-md p-4", className)}>
      {children}
    </div>
  );
}
