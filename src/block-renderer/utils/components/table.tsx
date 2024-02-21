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
              .map((key, index) => {
                if (typeof key === "string") {
                  return <TableHead key={key}>{key}</TableHead>;
                } else {
                  return <div key={index}>{JSON.stringify(key)}</div>;
                }
              })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <TableRow key={item.id} onClick={() => setSelectedItemId(item.id)}>
              {Object.entries(item)
                .filter(
                  ([key, value]) =>
                    !table.columns?.find((column) => column.name === key)
                      ?.is_hidden ||
                    columns?.show?.includes(key) ||
                    !columns?.hidden?.includes(key)
                )
                .map(([key, value]) => {
                  if (typeof value === "string") {
                    return <TableCell key={key}>{value}</TableCell>;
                  } else {
                    return (
                      <div key={JSON.stringify(key)}>
                        {JSON.stringify(value)}
                      </div>
                    );
                  }
                })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
