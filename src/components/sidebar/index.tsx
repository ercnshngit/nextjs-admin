"use client";
import { cn } from "@/libs/utils";
import { Button } from "../ui/button";
import { List } from "lucide-react";
import { translate } from "@/langs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DATABASE_TABLES } from "@/config/general";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <div className={cn("pb-12", className)}>
      <div className="py-4 space-y-4">
        <div className="px-3">
          <h1 className="flex items-center justify-center w-full py-4 text-2xl">
            AdminPanel
          </h1>
          <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">
            Tablolar
          </h2>
          <div className="flex flex-col space-y-1">
            {DATABASE_TABLES.filter((item) => !item.hidden).map((item) => (
              <Button
                asChild
                key={item.name}
                variant={pathname === item.name ? "secondary" : "ghost"}
                className="justify-start "
              >
                <Link href={"/" + item.name}>
                  {item.Icon ? (
                    <item.Icon className="w-5 h-5 mr-2" />
                  ) : (
                    <List className="w-5 h-5 mr-2" />
                  )}
                  {translate(item.name)}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
