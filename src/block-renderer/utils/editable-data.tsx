import { getGeneralBySlug, getTable } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function EditableData({
  datasetInfo,
  component,
}: {
  datasetInfo: string;
  component: any;
}) {
  const [table, name, columnsString] =
    datasetInfo !== "" ? datasetInfo.split("-") : [null, null, null];
  const columns = columnsString?.split(",");
  const { data } = useQuery(
    [table, name],
    () =>
      name &&
      (table === "table"
        ? getTable({
            tableName: name,
          })
        : getGeneralBySlug(name)),
    { enabled: !!name }
  );
  return <>{data && component({ data, columns })}</>;
}
