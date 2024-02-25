import React, { useCallback } from "react";

import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import ImagePickerInput from "./components/image-picker-input";
import TextInput from "./components/text-input";
import { Label } from "@/components/ui/label";
import { useTranslate } from "@/langs";
import RichTextEditor from "./components/rich-text";
import JSONInput from "./components/json-input";
import { ImSpinner2 } from "react-icons/im";
import DataInput from "./components/data-input";
import SelectInput from "./components/select";

type SidebarInputFactoryProps = {
  value: any;
  propKey: string;
  typeName: string;
  setValue: any;
  className?: string;
  options?: {
    label: string;
    value: any;
  }[];
  customInput?: {
    for: string;
    component: React.FC<any>;
  }[];
};

export default function SidebarInputFactory({
  customInput,
  propKey,
  typeName,
  options,
  ...props
}: SidebarInputFactoryProps) {
  const { translate } = useTranslate();

  const getInputComponent = (type: string) => {
    if (type.startsWith("json")) {
      return <JSONInput propKey={propKey} {...props} />;
    } else {
      switch (type) {
        case "text":
          return <TextInput propKey={propKey} {...props} />;
        case "image":
          return <ImagePickerInput propKey={propKey} {...props} />;
        case "richtext":
          return <RichTextEditor propKey={propKey} {...props} />;
        case "data":
          return <DataInput propKey={propKey} {...props} />;
        case "select":
          return <SelectInput propKey={propKey} {...props} />;
        default:
          return <TextInput propKey={propKey} {...props} />;
      }
    }
  };

  if (customInput) {
    const CustomInputItem = customInput.find(
      (item) => item.for === propKey
    )?.component;
    if (CustomInputItem) {
      return <CustomInputItem {...props} />;
    }
  }

  return (
    <div className="flex w-full flex-col gap-2 border-b border-gray-200 pb-4">
      <Label htmlFor={propKey}>{translate(propKey)}</Label>
      <p className="text-xs text-gray-400">{propKey}</p>
      {!typeName && (
        <div className="flex items-center justify-center">
          <ImSpinner2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {typeName && getInputComponent(typeName)}
    </div>
  );
}
