"use client";
import UpdateFormBase from "@/components/base-form/update-form-base";
import UpdatePage from "@/components/dynamic-crud-layouts/update-page";
import { useTable } from "@/hooks/use-database";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";

export default function Update({ params }: { params: { id: string } }) {
  const { id } = params;
  const { table } = useTable("menu");
  const tableName = table?.name || "";

  return (
    <UpdatePage id={id} tableName={tableName} goBackUrl="/dashboard/menu_type">
      <UpdateFormBase id={Number(id)} table={table as DatabaseTableDto} />
    </UpdatePage>
  );
}
