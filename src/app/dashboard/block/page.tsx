"use client";
import ListPage from "@/components/list-page";
import { getTable } from "@/services/panel";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function BlockListPage() {
  const { data, error } = useQuery(["block"], () =>
    getTable({ tableName: "block" })
  );

  return <ListPage slug="block" data={data} />;
}
