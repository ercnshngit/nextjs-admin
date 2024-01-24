import { cn } from "@/libs/utils";

export default function Title({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h1
      className={cn(
        "mb-[0.5em] text-3xl font-bold leading-none text-secondary-blue lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
