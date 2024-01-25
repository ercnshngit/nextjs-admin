"use client";
import ListPage from "@/components/list-page";
import { Button } from "@/components/ui/button";
import { getTypes } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";

export default function Type({ params }: { params: { table_name: string } }) {
  const table_name = params.table_name;
  const { data: types } = useQuery(["types", table_name], () =>
    getTypes(table_name)
  );

  const router = useRouter();

  return (
    <ListPage
      slug={"type"}
      data={types}
      addButtonHref={{
        pathname: "/dashboard/type/ekle",
        query: { table_id: types?.[0]?.table_id },
      }}
      buttons={(row: Row<any>) => {
        return (
          <>
            <Button
              className="bg-blue-500"
              onClick={() => {
                router.push("/dashboard/menu_type/" + row.original.id);
              }}
            >
              Menüyü Düzenle
            </Button>
            <Button
              className="bg-gray-500"
              onClick={() => {
                router.push("/dashboard/type/" + row.original.id + "/update");
              }}
            >
              Düzenle
            </Button>
          </>
        );
      }}
    />
  );
}
