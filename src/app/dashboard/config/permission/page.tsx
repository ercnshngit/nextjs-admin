"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useDatabase } from "@/hooks/use-database";
import React from "react";

export default function Permission() {
  const { tables, configs, createConfig, deleteConfig, updateConfig } =
    useDatabase();

  const tablesHasConfigs = configs?.map((config) => config.name);

  return (
    <div className="container flex-1 py-10 mx-auto overflow-hidden ">
      <h1>Admin</h1>
      {tables &&
        tables.map((table) => (
          <div key={table.id} className="flex justify-between border-b py-4">
            <h2>{table.name}</h2>
            {tablesHasConfigs?.includes(table.name) ? (
              <div className="flex gap-2">
                <div>
                  Create
                  <Checkbox checked={true} onChange={() => {}} />
                </div>
                <div>
                  Read
                  <Checkbox checked={true} onChange={() => {}} />
                </div>
                <div>
                  Update
                  <Checkbox checked={true} onChange={() => {}} />
                </div>
                <div>
                  Delete
                  <Checkbox checked={true} onChange={() => {}} />
                </div>
              </div>
            ) : (
              <div className="flex gap-2">sdf</div>
            )}
          </div>
        ))}
    </div>
  );
}
