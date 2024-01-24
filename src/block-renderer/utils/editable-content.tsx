import { useDesigner } from "@/contexts/designer-context";
import { useTableDataByColumnAndValue } from "@/hooks/use-database";
import React, { useEffect } from "react";
import SidebarInputFactory from "../../components/block-builder/components/sidebar-input-factory";

export default function EditableContent({
  propName,
  propValue,
  children,
}: {
  propName: string;
  propValue: string;
  children: React.ReactNode;
}) {
  const { item: prop } = useTableDataByColumnAndValue({
    tableName: "prop",
    column: "key",
    value: propName,
  });
  const propTypeId = prop?.[0]?.type_id;
  const { item: type } = useTableDataByColumnAndValue({
    tableName: "type",
    column: "id",
    value: propTypeId,
    options: {
      enabled: !!propTypeId,
    },
  });

  const { updateElement, selectedElement } = useDesigner();
  if (!selectedElement) return children;
  if (!type) return children;
  return (
    <SidebarInputFactory
      key={propName}
      propKey={propName}
      typeName={type[0].name}
      setValue={(value: string) =>
        updateElement(selectedElement.code, {
          ...selectedElement,
          props: selectedElement.props.map((p) => {
            if (p.prop.key === propName) {
              return {
                ...p,
                value: value,
              };
            }
            return p;
          }),
        })
      }
      value={propValue}
    />
  );
}
