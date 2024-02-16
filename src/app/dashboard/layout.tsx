import LanguageSwitcher from "@/components/language-switcher";
import Logo from "@/components/logo";
import { Sidebar } from "@/components/sidebar";
import ThemeSwitcher from "@/components/theme-switcher";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-1/5 min-h-full shadow">
        <Sidebar className="flex-shrink hidden sm:block" />
      </div>
      <div className="flex flex-col flex-1 w-4/5 min-h-screen bg-background ">
        <div className="flex flex-col min-h-screen min-w-full  ">
          <nav className="flex justify-between border-b border-border h-14 px-4 py-2">
            <Logo />
            <div className="flex gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </nav>
          <main className="flex flex-grow w-full">
            <div className="container flex-1 py-10 mx-auto overflow-y-hidden ">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
