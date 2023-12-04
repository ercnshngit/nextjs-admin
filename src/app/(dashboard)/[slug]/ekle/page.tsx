"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import Form from "./form";
import { getDatabaseTable } from "@/config/general";
import { useQuery } from "@tanstack/react-query";
import { getTableItem } from "@/services/panel";
import { translate } from "@/langs";

export default function Ekle({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const table = getDatabaseTable(slug);
  const tableName = table?.name || "";

  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate(tableName)} Ekle</h3>
        <div>
          <Button asChild>
            <Link href={"/" + tableName}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      <Card className="min-h-[700px]">
        <CardContent>
          <div className="flex justify-center py-10">
            {table && <Form table={table} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
