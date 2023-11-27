import Logo from "@/components/logo";
import ThemeSwitcher from "@/components/theme-switcher";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h-14 px-4 py-2">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex flex-grow w-full">{children}</main>
    </div>
  );
}
