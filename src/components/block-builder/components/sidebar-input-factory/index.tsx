import React, { useCallback } from "react";

import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import ImagePickerInput from "./components/image-picker-input";
import TextInput from "./components/text-input";
import { Label } from "@/components/ui/label";
import { useTranslate } from "@/langs";
import RichTextEditor from "./components/rich-text";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import JSONInput from "./components/json-input";
import { ImSpinner2 } from "react-icons/im";
import DataInput from "./components/data-input";

type SidebarInputFactoryProps = {
  value: any;
  propKey: string;
  typeName: string;
  setValue: any;
  customInput?: {
    for: string;
    component: React.FC<any>;
  }[];
};

export default function SidebarInputFactory({
  customInput,
  propKey,
  typeName,
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
    <div className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200">
      <Label htmlFor={propKey}>{translate(propKey)}</Label>
      <p className="text-xs text-gray-400">{propKey}</p>
      {!typeName && (
        <div className="flex items-center justify-center">
          <ImSpinner2 className="animate-spin h-6 w-6" />
        </div>
      )}
      {typeName && getInputComponent(typeName)}
    </div>
  );
}
