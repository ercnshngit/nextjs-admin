import { useDesigner } from "@/contexts/designer-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createPortal } from "react-dom";
import TableWrapper from "./components/table";
import CreateFormBase from "@/components/base-form/create-form-base";
import { useTable } from "@/hooks/use-database";
import UpdateFormBase from "@/components/base-form/update-form-base";
import { X } from "lucide-react";

export default function EditableData<T extends { id: number }>({
  description,
  children,
  tableName,
  data,
  queryKey,
  formConfig,
}: {
  description: string;
  children: React.ReactNode;
  tableName: string;
  data: T[];
  queryKey: string[];
  formConfig: {
    show?: string[];
    hidden?: string[];
    readonly?: string[];
    defaultValues?: { [key: string]: any };
  };
}) {
  const { selectedElement } = useDesigner();
  const [isOpened, setIsOpened] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(
    null
  );

  const queryClient = useQueryClient();

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
    queryClient.invalidateQueries(queryKey);
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
              <div className="flex justify-between">
                <h2>Veriler</h2>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <div className="grid grid-cols-[60%_1fr] gap-6 grid-rows-2  max-h-full">
                <div className="  row-span-2 ">
                  <TableWrapper<T>
                    columns={{
                      show: formConfig.show,
                      hidden: formConfig.hidden,
                    }}
                    table={table}
                    data={data}
                    setSelectedItemId={setSelectedItemId}
                  />
                </div>
                <div className="h-full p-4">
                  <h2 className="mb-4 font-semibold text-lg">Ekle</h2>
                  <div className="rounded-md shadow-md overflow-auto h-full p-4 ">
                    <CreateFormBase table={table} config={formConfig} />
                  </div>
                </div>
                <div className="h-full p-4">
                  <h2 className="mb-4 font-semibold text-lg">Duzenle</h2>
                  <div className="rounded-md shadow-md overflow-auto h-full p-4 ">
                    {!selectedItemId && <p>Secili bir kayit yok</p>}
                    {selectedItemId && (
                      <UpdateFormBase
                        table={table}
                        id={selectedItemId}
                        config={formConfig}
                      />
                    )}
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
