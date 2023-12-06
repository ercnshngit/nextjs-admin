"use client";
import { useDatabase } from "@/hooks/use-database";
import React from "react";

export default function Config() {
  const { tables, configs, createConfig } = useDatabase();

  const tablesHasConfigs = configs?.map((config) => config.name);

  const handleCreateConfig = () => {};
  return (
    <div className="container flex-1 py-10 mx-auto overflow-hidden ">
      {tables &&
        tables.map((table) => (
          <div key={table.id} className="flex justify-between">
            <h2>{table.name}</h2>
            {tablesHasConfigs?.includes(table.name) ? (
              <button>edit</button>
            ) : (
              <button onClick={() => handleCreateConfig()}>create</button>
            )}
          </div>
        ))}
    </div>
  );
}
