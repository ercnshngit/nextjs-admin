"use client";
import ListPage from "@/components/dynamic-crud-layouts/list-page";
import { Button } from "@/components/ui/button";
import { getTable } from "@/services/common-table-api";
import { useQuery } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";

export default function BlockListPage() {
  const { data, error } = useQuery(["block"], () =>
    getTable({ tableName: "block" })
  );

  const router = useRouter();

  return <ListPage slug="block" data={data} />;
}
