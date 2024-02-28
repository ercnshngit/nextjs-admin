"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { uploadMediaToServer } from "@/services/media";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
          ],
        },
      ],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
      [{ html: [] }],
    ],
    handlers: {
      image: async function (value: any) {
        if (value) {
          const file = value.target.files[0];
          const { data } = await uploadMediaToServer({
            file: file,
            route: "conval/editor",
          });
        }
      },
    },
  },

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  // "image",
  // "video",
];

const COLORS = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
];

export const ReactQuillWrapper = ({
  value,
  setValue,
  ...rest
}: {
  value: string;
  setValue: any;
}) => {
  const [mounted, setMounted] = useState(false);
  const [htmlMode, setHtmlMode] = useState(false);
  const [images, setImages] = useState();
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="html-mode"
          checked={htmlMode}
          onCheckedChange={() => setHtmlMode((p) => !p)}
        />
        <Label htmlFor="html-mode">HTML</Label>
      </div>
      {htmlMode && (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-[80%] min-h-[250px] w-full"
        />
      )}
      {!htmlMode && (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
          modules={modules}
          formats={formats}
          className="h-[80%] bg-white"
        />
      )}
    </>
  );
};
