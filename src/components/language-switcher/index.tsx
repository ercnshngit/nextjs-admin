"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useLanguage } from "@/contexts/language-context";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Tabs value={language} onValueChange={setLanguage}>
      <TabsList>
        <TabsTrigger value="tr">TR</TabsTrigger>
        <TabsTrigger value="en">EN</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
