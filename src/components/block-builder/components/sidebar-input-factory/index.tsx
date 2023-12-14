import React from "react";

import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import ImagePickerInput from "./components/image-picker-input";
import TextInput from "./components/text-input";

type SidebarInputFactoryProps = {
  blockComponentProp: ComponentPropDto;
  defaultValue?: any;
  setValue: any;
  customInput?: {
    for: string;
    component: React.FC<any>;
  }[];
};

export default function SidebarInputFactory({
  customInput,
  ...props
}: SidebarInputFactoryProps) {
  if (customInput) {
    const CustomInputItem = customInput.find(
      (item) => item.for === props.blockComponentProp.prop.key
    )?.component;
    if (CustomInputItem) {
      return <CustomInputItem {...props} />;
    }
  }

  switch (props.blockComponentProp.prop.type.name) {
    case "image":
      return <ImagePickerInput {...props} />;

    default:
      return (
        <>
          <TextInput {...props} />
        </>
      );
  }
}
