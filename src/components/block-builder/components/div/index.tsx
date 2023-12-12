import { cn } from "@/libs/utils";

export function Div({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={cn(className)}>{children}</div>;
}
