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

export default function Ekle({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { table } = useTable(slug);
  const tableName = table?.name || "";
  const { translate } = useTranslate();
  const searchParams = useSearchParams();
  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate(tableName)} Ekle</h3>
        <div>
          <Button asChild>
            <Link
              href={{
                pathname: "/dashboard/" + tableName,
                query: searchParams.getAllQueryString(),
              }}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      <Card className="min-h-[700px]">
        <CardContent>
          <div className="flex justify-center py-10">
            {table && <CreateFormBase table={table} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
