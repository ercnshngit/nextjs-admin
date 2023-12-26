import React from "react";

export default function Image({
  className,
  src,
}: {
  className: string;
  src: string;
}) {
  return (
    <img
      className={className}
      src={"https://" + process.env.NEXT_PUBLIC_FILE_URL + src}
      alt=""
    />
  );
}
