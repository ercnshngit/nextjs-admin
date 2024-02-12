"use client";
import ListPage from "@/components/dynamic-crud-layouts/list-page";
import { getTable } from "@/services/common-table-api";
import { useQuery } from "@tanstack/react-query";

export default function BlockListPage() {
  const { data, error } = useQuery(["component"], () =>
    getTable({ tableName: "component" })
  );

  return <ListPage slug="component" data={data} />;
}
