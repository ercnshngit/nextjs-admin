"use client";

import { useQuery } from "@tanstack/react-query";

import ListPage from "@/components/list-page";
import { getTable } from "@/services/panel";
import { useTable } from "@/hooks/use-database";
import { useEffect } from "react";

export default function DynamicListPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { data, error } = useQuery([slug], () => getTable({ tableName: slug }));

  if (error) return <div>error</div>;
  return <ListPage slug={slug} data={data} />;
}
