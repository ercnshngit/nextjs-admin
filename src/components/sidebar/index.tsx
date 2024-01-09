"use client";
import { cn } from "@/libs/utils";
import { Button } from "../ui/button";
import { List, icons } from "lucide-react";
import { useTranslate } from "@/langs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useConfigs, useDatabase } from "@/hooks/use-database";
import { useQuery } from "@tanstack/react-query";
import { getTable, getTypes } from "@/services/dashboard";
import { TypeDto } from "@/services/dto/type.dto";
import useSearchParams from "@/hooks/use-search-params";

export function Sidebar({ className }: { className?: string }) {
  const { translate } = useTranslate();

  const pathname = usePathname();
  const { getQueryString } = useSearchParams();
  const { configs, error } = useConfigs();

  const { data: blockTypes } = useQuery<TypeDto[]>(["block_types"], () =>
    getTypes("block")
  );

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
            {blockTypes?.map((item) => (
              <Button
                key={item.id}
                asChild
                variant={
                  getQueryString("filterValue") === String(item.id)
                    ? "default"
                    : "ghost"
                }
                className="justify-start "
              >
                <Link
                  href={{
                    pathname: "/dashboard/block",
                    query: { filterBy: "type_id", filterValue: item.id },
                  }}
                >
                  <List className="w-5 h-5 mr-2" />

                  {translate(item.name)}
                </Link>
              </Button>
            ))}

            <Button
              asChild
              variant={
                pathname === "/dashboard/type/table/menu" ? "default" : "ghost"
              }
              className="justify-start "
            >
              <Link href={"/dashboard/type/table/menu"}>
                <List className="w-5 h-5 mr-2" />

                {translate("MENU_TYPES")}
              </Link>
            </Button>

            {configs
              ?.filter((item) => !item.is_hidden)
              .map((item) => {
                const Icon = icons[item.icon as keyof typeof icons];

                return (
                  <Button
                    asChild
                    key={item.name}
                    variant={
                      pathname === "/dashboard/" + item.name
                        ? "default"
                        : "ghost"
                    }
                    className="justify-start "
                  >
                    <Link href={"/dashboard/" + item.name}>
                      {item.icon ? (
                        <Icon className="w-5 h-5 mr-2" />
                      ) : (
                        <List className="w-5 h-5 mr-2" />
                      )}
                      {translate(item.name)}
                    </Link>
                  </Button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
