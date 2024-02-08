import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableWrapper<T extends { id: number }>({
  data,
}: {
  data: T[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {data &&
            data.length > 0 &&
            Object.keys(data[0]).map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <TableRow key={item.id}>
              {Object.values(item).map((value) => (
                <TableCell key={value}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
