"use client";
import { cn } from "@/libs/utils";
import { Button } from "../ui/button";
import { List } from "lucide-react";
import { useTranslate } from "@/langs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useConfigs, useDatabase } from "@/hooks/use-database";
import { useQuery } from "@tanstack/react-query";
import { getTable, getTypes } from "@/services/dashboard";

export function Sidebar({ className }: { className?: string }) {
  const { translate } = useTranslate();

  const pathname = usePathname();
  const { configs, error } = useConfigs();

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
            <Button
              asChild
              variant={pathname === "/block" ? "secondary" : "ghost"}
              className="justify-start "
            >
              <Link
                href={{
                  pathname: "/dashboard/block",
                  query: { filterBy: "type_id", filterValue: 3 },
                }}
              >
                <List className="w-5 h-5 mr-2" />

                {translate("page")}
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/dashboard/block" ? "secondary" : "ghost"}
              className="justify-start "
            >
              <Link
                href={{
                  pathname: "/dashboard/block",
                  query: { filterBy: "type_id", filterValue: 3 },
                }}
              >
                <List className="w-5 h-5 mr-2" />

                {translate("slider")}
              </Link>
            </Button>
            <Button
              asChild
              variant={
                pathname === "/dashboard/type/menu" ? "secondary" : "ghost"
              }
              className="justify-start "
            >
              <Link href={"/dashboard/type/table/menu"}>
                <List className="w-5 h-5 mr-2" />

                {translate("Menü")}
              </Link>
            </Button>

            {configs
              ?.filter((item) => !item.is_hidden)
              .map((item) => (
                <Button
                  asChild
                  key={item.name}
                  variant={
                    pathname === "/dashboard/" + item.name
                      ? "secondary"
                      : "ghost"
                  }
                  className="justify-start "
                >
                  <Link href={"/dashboard/" + item.name}>
                    {item.icon ? (
                      <div>{item.icon}</div>
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
