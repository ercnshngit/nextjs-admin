import { cn } from "@/libs/utils";

export function HTMLText({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <p className={className}>{children}</p>;
}
