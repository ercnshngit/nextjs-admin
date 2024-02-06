import { useDesigner } from "@/contexts/designer-context";
import { getGeneralBySlug, getTable } from "@/services/dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function EditableData({
  description,
  addPage,
  children,
  queryKey,
}: {
  description: string;
  children: React.ReactNode;
  addPage: React.ReactNode;
  queryKey: string;
}) {
  const { selectedElement } = useDesigner();
  const [isOpened, setIsOpened] = React.useState(false);

  const queryClient = useQueryClient();

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
    queryClient.invalidateQueries([queryKey]);
  };

  if (!selectedElement) return children;
  return (
    <>
      <p>{description}</p>
      {/* <button onClick={open}>Ekleme yerini ac</button>
      {isOpened &&
        createPortal(
          <>
            <div className="absolute inset-0 bg-black/70" onClick={close} />
            <div className="absolute inset-0 w-[80%] mx-auto max-h-[80%] overflow-auto">
              {addPage}
            </div>
          </>,
          document.body
        )} */}
    </>
  );
}
