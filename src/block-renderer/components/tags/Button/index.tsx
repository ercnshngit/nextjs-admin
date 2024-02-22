import clsx from "clsx";
import Link from "next/link";
import React from "react";

export default function Button({
  href,
  variant,
  children,
  className,
}: {
  href?: string;
  variant?: keyof typeof variants;
  children?: React.ReactNode;
  className?: string;
}) {
  const variants = {
    moreRounded: "rounded-full bg-icon-blue px-4 py-2 text-white lg:px-14 ",
    default: " rounded-xl bg-primary-blue text-white",
    secondary:
      "rounded-xl bg-text-black text-white transition-all hover:bg-icon-blue",
    outline: "text-secondary-blue rounded-xl border border-primary-blue",
  } as const;

  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          "inline-block w-fit select-none px-2 py-1 text-center text-base lg:px-10 lg:text-lg",
          variants[variant || "default"],
          className
        )}
      >
        {children}
      </Link>
    );
  }
}
