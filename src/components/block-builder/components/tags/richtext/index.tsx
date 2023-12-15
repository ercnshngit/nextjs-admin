import { cn } from "@/libs/utils";

export function RichText({
  className,
  content,
}: {
  className: string;
  content: string;
}) {
  return <div className={cn("h-24", className)}>{content}</div>;
}
