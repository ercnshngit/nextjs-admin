import { useDesigner } from "@/contexts/designer-context";
import { useTableDataByColumnAndValue } from "@/hooks/use-database";
import React, { useEffect } from "react";
import { cn } from "@/libs/utils";
import SidebarInputFactory from "@/components/block-builder/components/sidebar-input-factory";
import EditableData from "./editable-data";

export default function EditPane<T extends { id: number }>({
  fields,
  dataFields,
  className,
  children,
}: {
  children?: React.ReactNode;
  fields: {
    propName: string;
    propValue: any;
    typeName: string;
    options?: { label: string; value: any }[];
  }[];
  dataFields?: {
    description: string;
    children: React.ReactNode;
    tableName: string;
    data: T[];
    queryKey: string[];
    formConfig?: {
      show?: string[];
      hidden?: string[];
      readonly?: string[];
      defaultValues?: { [key: string]: any };
    };
  }[];
  className?: string;
}) {
  const { updateElement, selectedElement, contextActive } = useDesigner();
  if (!contextActive || !selectedElement) {
    return children;
  } else {
    return (
      <div className={cn("z-30", className)}>
        {fields?.map(({ propName, typeName, options, propValue }) => (
          <SidebarInputFactory
            key={propName}
            propKey={propName}
            className="text-black"
            typeName={typeName}
            options={options}
            setValue={(value: string) => {
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
              });
            }}
            value={propValue}
          />
        ))}
        {dataFields?.map((dataField) => (
          <EditableData<T> key={dataField.queryKey.join("-")} {...dataField} />
        ))}
      </div>
    );
  }
}
