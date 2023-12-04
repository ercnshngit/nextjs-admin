import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import {
  Controller,
  FieldErrors,
  UseFormRegister,
  useController,
} from "react-hook-form";
import { DATABASE_TABLE, DATABASE_TABLE_COLUMN } from "@/config/general";
import Label from "../Label";

// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
// });

const ButtonCustomList = [
  ["undo", "redo"],
  ["font", "fontSize"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["removeFormat"],
  ["fontColor", "hiliteColor"],
  ["outdent", "indent"],
  ["align", "horizontalRule", "list"],
  ["link"],
  ["fullScreen", "showBlocks", "codeView"],
];

const RichTextBox = ({
  field,
  table,
  register,
  errors,
  control,
  defaultValue,
  ...props
}: {
  field: DATABASE_TABLE_COLUMN;
  table: DATABASE_TABLE;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: any;
  control: any;
}) => {
  return (
    <div className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200">
      <Label field={field} table={table} />

      <Controller
        name={field.name}
        control={control}
        render={({ field }) => (
          <div></div>
          // <SunEditor
          //   defaultValue={defaultValue}
          //   {...field}
          //   setOptions={{
          //     height: "200px",
          //     buttonList: ButtonCustomList,
          //     mode: "classic",
          //   }}
          // />
        )}
      />
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
};

export default RichTextBox;
