"use client";
import { Button } from "@/components/ui/button";
import { useDatabase } from "@/hooks/use-database";
import Link from "next/link";
import React from "react";

export default function Config() {
  const { tables, configs, createConfig, deleteConfig } = useDatabase();

  const tablesHasConfigs = configs?.map((config) => config.name);

  return (
    <div className="container flex-1 py-10 mx-auto overflow-hidden ">
      {tables &&
        tables.map((table) => (
          <div key={table.id} className="flex justify-between border-b py-4">
            <h2>{table.name}</h2>
            {tablesHasConfigs?.includes(table.name) ? (
              <div className="flex gap-2">
                <Button onClick={() => createConfig.mutate(table.name)}>
                  tekrar oluştur
                </Button>
                <Button asChild>
                  <Link href={`/dashboard/config/${table.name}`}>edit</Link>
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => deleteConfig.mutate(table.name)}
                >
                  delete
                </Button>
              </div>
            ) : (
              <Button onClick={() => createConfig.mutate(table.name)}>
                create
              </Button>
            )}
          </div>
        ))}
    </div>
  );
}
