"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import CreateFormBase from "../../../../components/base-form/create-form-base";
import { useQuery } from "@tanstack/react-query";
import { getTableItem } from "@/services/panel";
import { useTranslate } from "@/langs";
import { useTable } from "@/hooks/use-database";
import useSearchParams from "@/hooks/use-search-params";
import CreatePage from "@/components/create-page";

export default function Ekle({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { table } = useTable(slug);
  const tableName = table?.name || "";
  return (
    <CreatePage tableName={tableName}>
      {table && <CreateFormBase table={table} />}
    </CreatePage>
  );
}
