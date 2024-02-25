import { useDesigner } from "@/contexts/designer-context";
import { useTableDataByColumnAndValue } from "@/hooks/use-database";
import React, { useEffect } from "react";
import SidebarInputFactory from "../../components/block-builder/components/sidebar-input-factory";
import { cn } from "@/libs/utils";

export default function EditableContent({
  propName,
  propValue,
  typeName,
  children,
  options,
  className,
}: {
  propName: string;
  propValue: any;
  typeName: string;
  children?: React.ReactNode;
  options?: string[];
  className?: string;
}) {
  const { updateElement, selectedElement } = useDesigner();
  if (!selectedElement) return children;
  return (
    <div className={cn("z-30", className)}>
      <SidebarInputFactory
        key={propName}
        propKey={propName}
        typeName={typeName}
        options={options?.map((item) => ({ label: item, value: item }))}
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
    </div>
  );
}
