"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger
          value="light"
          onClick={() => setTheme("light")}
          className={theme === "light" ? "active" : ""}
        >
          <SunIcon className="h-5 w-5" />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "active" : ""}
        >
          <MoonIcon className="h-5 w-5" />
        </TabsTrigger>
        <TabsTrigger
          value="system"
          onClick={() => setTheme("system")}
          className={theme === "system" ? "active" : ""}
        >
          <DesktopIcon className="h-5 w-5" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
