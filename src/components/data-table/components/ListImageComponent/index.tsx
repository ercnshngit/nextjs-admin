import Image from "next/image";
import React from "react";

export default function ListImageComponent({ value }: { value: any }) {
  if (value && value.startsWith("/")) {
    return (
      <Image
        width={32}
        height={32}
        src={"https://" + process.env.NEXT_PUBLIC_FILE_URL + value}
        alt={value}
      />
    );
  } else {
    return <div>Resim Bulunamadı</div>;
  }
}
