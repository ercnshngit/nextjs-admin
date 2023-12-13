import { IMAGE_URL } from "@/config/general";

import Image from "next/image";
import React from "react";

export default function ListImageComponent({ value }: { value: any }) {
  if (value && value.startsWith("/")) {
    return <Image width={32} height={32} src={IMAGE_URL + value} alt={value} />;
  } else {
    return <div>Resim Bulunamadı</div>;
  }
}
