import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Checkbox from "./components/Checkbox";
import Date from "./components/Date";
import Hidden from "./components/Hidden";
import ImagePicker from "./components/ImagePicker";
import MultiSelect from "./components/MultiSelect";
import Number from "./components/Number";
import Relation from "./components/Relation";
import RichTextBox from "./components/RichTextBox";
import Select from "./components/Select";
import String from "./components/String";
import TextArea from "./components/TextArea";
import { Column, Database_Table } from "@/types/config";

type FormInputFactoryProps = {
  field: Column;
  table: Database_Table;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  formType: "create" | "update";
  defaultValue?: any;
  id?: number;
  setValue: any;
  watch?: any;
  control: any;
  customInput?: {
    for: string;
    component: React.FC<any>;
  }[];
};

export default function FormInputFactory({
  formType,
  id,
  customInput,
  ...props
}: FormInputFactoryProps) {
  const inputType =
    props.field?.[
      formType === "create" ? "create_crud_option" : "update_crud_option"
    ]?.input_type || props.field?.input_type;

  if (customInput) {
    const CustomInputItem = customInput.find(
      (item) => item.for === inputType.name
    )?.component;
    if (CustomInputItem) {
      return <CustomInputItem {...props} />;
    }
  }

  switch (inputType.name) {
    case "checkbox":
      return <Checkbox {...props} />;
    case "date":
      return <Date {...props} />;
    case "hidden":
      return <Hidden {...props} />;
    case "image":
      return <ImagePicker {...props} />;
    case "multi-select":
      return <MultiSelect {...props} />;
    case "number":
      return <Number {...props} />;
    case "relation":
      return <Relation formType={formType} id={id} {...props} />;
    case "select":
      return <Select {...props} />;
    case "textarea":
      return (
        <>
          <TextArea {...props} />
        </>
      );
    case "richtext":
      return (
        <>
          <RichTextBox {...props} />
        </>
      );

    default:
      return (
        <>
          <String {...props} />
        </>
      );
  }
}
