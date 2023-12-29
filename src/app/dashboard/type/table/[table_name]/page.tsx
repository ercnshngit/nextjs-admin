"use client";
import ListPage from "@/components/list-page";
import { getTypes } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Type({ params }: { params: { table_name: string } }) {
  const table_name = params.table_name;
  const { data: types } = useQuery(["types", table_name], () =>
    getTypes(table_name)
  );

  return <ListPage slug={"type"} data={types} />;
}
