"use client";
import { useDatabase } from "@/hooks/use-database";
import Link from "next/link";
import React from "react";

export default function Config() {
  const { tables, configs, createConfig } = useDatabase();

  const tablesHasConfigs = configs?.map((config) => config.name);

  const handleCreateConfig = (table_name: string) => {
    createConfig.mutate(table_name);
  };
  return (
    <div className="container flex-1 py-10 mx-auto overflow-hidden ">
      {tables &&
        tables.map((table) => (
          <div key={table.id} className="flex justify-between border-b py-4">
            <h2>{table.name}</h2>
            {tablesHasConfigs?.includes(table.name) ? (
              <Link href={`/dashboard/config/${table.name}`}>edit</Link>
            ) : (
              <button onClick={() => handleCreateConfig(table.name)}>
                create
              </button>
            )}
          </div>
        ))}
    </div>
  );
}
