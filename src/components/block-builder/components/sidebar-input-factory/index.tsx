import React from "react";

import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import ImagePickerInput from "./components/image-picker-input";
import TextInput from "./components/text-input";
import { Label } from "@/components/ui/label";
import { useTranslate } from "@/langs";
import RichTextEditor from "./components/rich-text";
import { BlockComponentDto } from "@/services/dto/block_component.dto";

type SidebarInputFactoryProps = {
  blockComponentProp: ComponentPropDto;
  value: any;
  setValue: any;
  blockComponent: BlockComponentDto;
  customInput?: {
    for: string;
    component: React.FC<any>;
  }[];
};

export default function SidebarInputFactory({
  customInput,
  ...props
}: SidebarInputFactoryProps) {
  const { translate } = useTranslate();

  if (customInput) {
    const CustomInputItem = customInput.find(
      (item) => item.for === props.blockComponentProp.prop.key
    )?.component;
    if (CustomInputItem) {
      return <CustomInputItem {...props} />;
    }
  }

  const getInputComponent = () => {
    switch (props.blockComponentProp.prop.type.name) {
      case "text":
        return <TextInput {...props} />;
      case "image":
        return <ImagePickerInput {...props} />;
      case "richtext":
        return <RichTextEditor {...props} />;
      default:
        return <TextInput {...props} />;
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200">
      <Label htmlFor={props.blockComponentProp.prop.key}>
        {translate(props.blockComponentProp.prop.key)}
      </Label>
      <p className="text-xs text-gray-400">
        {props.blockComponentProp.prop.key}
      </p>
      {getInputComponent()}
    </div>
  );
}
