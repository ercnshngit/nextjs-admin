import Logo from "@/components/logo";
import ThemeSwitcher from "@/components/theme-switcher";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background ">
      <nav className="flex justify-between border-b border-border h-14 px-4 py-2">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex flex-grow w-full">
        <div className="container flex-1 py-10 mx-auto overflow-y-hidden ">
          {children}
        </div>
      </main>
    </div>
  );
}
