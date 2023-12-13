"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useLanguage } from "@/contexts/language-context";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Tabs>
      <TabsList>
        <TabsTrigger
          value="tr"
          onClick={() => setLanguage("tr")}
          className={language === "tr" ? "active" : ""}
        >
          TR
        </TabsTrigger>
        <TabsTrigger
          value="en"
          onClick={() => setLanguage("en")}
          className={language === "en" ? "active" : ""}
        >
          EN
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
