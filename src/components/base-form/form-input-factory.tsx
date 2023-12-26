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
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import IconSelect from "./components/IconSelect";

type FormInputFactoryProps =
  | {
      field: DataBaseTableColumnDto;
      table: DatabaseTableDto;
      register: UseFormRegister<any>;
      errors: FieldErrors;
      formType: "create_crud_option";
      id?: number;
      setValue: any;
      watch?: any;
      control: any;
      customInput?: {
        for: string;
        component: React.FC<any>;
      }[];
    }
  | {
      field: DataBaseTableColumnDto;
      table: DatabaseTableDto;
      register: UseFormRegister<any>;
      errors: FieldErrors;
      formType: "update_crud_option";
      defaultValue: any;
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
    props.field?.[formType]?.input_type?.name ||
    props.field?.input_type?.name ||
    "text";

  if (customInput) {
    const CustomInputItem = customInput.find(
      (item) => item.for === inputType
    )?.component;
    if (CustomInputItem) {
      return <CustomInputItem {...props} />;
    }
  }

  switch (inputType) {
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
      return <Select {...props} />;
      //TODO: relation input type should be updated
      return <Relation formType={formType} id={id} {...props} />;
    case "select":
      return <Select {...props} />;
    case "icon-select":
      return <IconSelect {...props} />;
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
