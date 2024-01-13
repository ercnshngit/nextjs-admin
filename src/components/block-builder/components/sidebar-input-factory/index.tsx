import React from "react";

import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import ImagePickerInput from "./components/image-picker-input";
import TextInput from "./components/text-input";
import { Label } from "@/components/ui/label";
import { useTranslate } from "@/langs";
import RichTextEditor from "./components/rich-text";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import JSONInput from "./components/json-input";

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

  if (customInput) {
    const CustomInputItem = customInput.find(
      (item) => item.for === propKey
    )?.component;
    if (CustomInputItem) {
      return <CustomInputItem {...props} />;
    }
  }

  const getInputComponent = () => {
    if (typeName.startsWith("json")) {
      return <JSONInput key={propKey} {...props} />;
    } else {
      switch (typeName) {
        case "text":
          return <TextInput key={propKey} {...props} />;
        case "image":
          return <ImagePickerInput key={propKey} {...props} />;
        case "richtext":
          return <RichTextEditor key={propKey} {...props} />;
        default:
          return <TextInput key={propKey} {...props} />;
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200">
      <Label htmlFor={propKey}>{translate(propKey)}</Label>
      <p className="text-xs text-gray-400">{propKey}</p>
      {getInputComponent()}
    </div>
  );
}
