import { ComponentPropDto } from "@/services/dto/prop.dto";
import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import {
  Controller,
  FieldErrors,
  UseFormRegister,
  useController,
} from "react-hook-form";

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
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function TextInput({
  blockComponentProp,
  value,
  setValue,
}: {
  blockComponentProp: ComponentPropDto;
  value: any;
  setValue: any;
}) {
  return (
    <SunEditor
      onChange={(content) => setValue(content)}
      defaultValue={value}
      onImageUpload={(
        targetImgElement,
        index,
        state,
        imageInfo,
        remainingFilesCount
      ) => {
        console.log(
          targetImgElement,
          index,
          state,
          imageInfo,
          remainingFilesCount
        );
      }}
      setOptions={{
        height: "200px",
        buttonList: ButtonCustomList,
        mode: "classic",
      }}
    />
  );
}
