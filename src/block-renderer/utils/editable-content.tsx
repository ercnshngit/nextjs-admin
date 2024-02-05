import { useDesigner } from "@/contexts/designer-context";
import { useTableDataByColumnAndValue } from "@/hooks/use-database";
import React, { useEffect } from "react";
import SidebarInputFactory from "../../components/block-builder/components/sidebar-input-factory";

export default function EditableContent({
  propName,
  propValue,
  typeName,
  children,
}: {
  propName: string;
  propValue: string;
  typeName: string;
  children: React.ReactNode;
}) {
  const { updateElement, selectedElement } = useDesigner();
  if (!selectedElement) return children;
  return (
    <SidebarInputFactory
      key={propName}
      propKey={propName}
      typeName={typeName}
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
