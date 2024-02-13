"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs value={theme} onValueChange={setTheme}>
      <TabsList>
        <TabsTrigger value="light">
          <SunIcon className="h-5 w-5" />
        </TabsTrigger>
        <TabsTrigger value="dark">
          <MoonIcon className="h-5 w-5" />
        </TabsTrigger>
        <TabsTrigger value="system">
          <DesktopIcon className="h-5 w-5" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
