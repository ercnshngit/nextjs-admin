import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";

export default function TableWrapper<T extends { id: number }>({
  data,
  setSelectedItemId,
  table,
  columns,
}: {
  data: T[];
  setSelectedItemId: (id: number) => void;
  table: DatabaseTableDto;
  columns?: { show?: string[]; hidden?: string[] };
}) {
  if (!data || data.length === 0) {
    return <p>Veri bulunamadi sag taraftan yeni ekleyebilirsiniz</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {data &&
            data.length > 0 &&
            Object.keys(data[0])
              .filter(
                (key) =>
                  !table.columns?.find((column) => column.name === key)
                    ?.is_hidden ||
                  columns?.show?.includes(key) ||
                  !columns?.hidden?.includes(key)
              )
              .map((key) => {
                return <TableHead key={key}>{key}</TableHead>;
              })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <TableRow key={item.id} onClick={() => setSelectedItemId(item.id)}>
              {Object.entries(item).map((value) => {
                if (
                  table.columns?.find((column) => column.name === value[0])
                    ?.is_hidden
                )
                  return null;
                return <TableCell key={value[0]}>{value[1]}</TableCell>;
              })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
