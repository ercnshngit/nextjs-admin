"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Menu() {
  const router = useRouter();
  useEffect(() => {
    router.push("/menu_type");
    console.log("menu");
  }, []);
  return <div>Menu</div>;
}
