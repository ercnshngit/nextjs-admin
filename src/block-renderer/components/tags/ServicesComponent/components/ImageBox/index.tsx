import Image from "next/image";
import Link from "next/link";
import React from "react";
import SubTitle from "../../../SubTitle";

export default function ImageBox({
  href,
  src,
  title,
}: {
  href: string;
  src: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-center gap-4 transition-all hover:scale-105"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md group-hover:shadow-md">
        {src && <Image src={src} alt={title} fill className="object-cover" />}
      </div>
      <SubTitle className="text-center text-2xl">{title}</SubTitle>
    </Link>
  );
}
