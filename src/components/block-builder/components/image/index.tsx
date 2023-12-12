import React from "react";

export default function Image({
  className,
  src,
}: {
  className: string;
  src: string;
}) {
  return <img className={className} src={src} alt="" />;
}
