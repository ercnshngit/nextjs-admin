import { cn } from "@/libs/utils";

export default function HTMLText({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <p className={className}>{children}</p>;
}
