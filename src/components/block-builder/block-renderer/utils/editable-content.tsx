import React from "react";
import SidebarInputFactory from "../../components/sidebar-input-factory";
import { BlockComponentDto } from "../types";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import { useDesigner } from "@/contexts/designer-context";
import { useTable, useTableDataByColumnAndValue } from "@/hooks/use-database";

export default function EditableContent({
  propKey,
  children,
}: {
  propKey: string;
  children: React.ReactNode;
}) {
  const { item } = useTableDataByColumnAndValue("type", "name", propKey);
  const { updateElement, selectedElement } = useDesigner();
  if (!selectedElement) return children;

  const propName = Object.keys({ propKey })[0];
  const propValue = propKey;
  return (
    <SidebarInputFactory
      key={propName}
      propKey={propName}
      typeName={item.type.name}
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
