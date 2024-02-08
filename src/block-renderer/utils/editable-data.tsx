import { useDesigner } from "@/contexts/designer-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createPortal } from "react-dom";
import TableWrapper from "./components/table";
import CreateFormBase from "@/components/base-form/create-form-base";
import { useTable } from "@/hooks/use-database";

export default function EditableData<T extends { id: number }>({
  description,
  children,
  tableName,
  data,
}: {
  description: string;
  children: React.ReactNode;
  tableName: string;
  data: T[];
}) {
  const { selectedElement } = useDesigner();
  const [isOpened, setIsOpened] = React.useState(true);

  const queryClient = useQueryClient();

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
    queryClient.invalidateQueries([tableName]);
  };

  const { table } = useTable(tableName);

  if (!table) return children;

  if (!selectedElement) return children;
  return (
    <>
      <p>{description}</p>
      <button onClick={open}>Ekleme yerini ac</button>
      {isOpened &&
        createPortal(
          <>
            <div className=" inset-0 fixed bg-black/70" onClick={close} />
            <div className=" inset-0 fixed p-10 z-40 w-[80%] bg-white rounded-md mx-auto max-h-[80%] my-auto overflow-auto">
              <div className="flex gap-4">
                <div className="w-full flex-1">
                  <TableWrapper<T> data={data} />
                </div>
                <div className="flex w-1/3 flex-col h-full overflow-hidden ">
                  <div className="rounded-md shadow-md overflow-auto p-4">
                    <CreateFormBase table={table} />
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
