import { cn } from "@/libs/utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: false,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
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
  "image",
  "video",
];

export function RichText({
  className,
  content,
}: {
  className: string;
  content: string;
}) {
  return (
    <div className="">
      <ReactQuill
        theme="snow"
        value={content === "" ? "Düzenlemek için tıklayın" : content}
        modules={modules}
        formats={formats}
        className="h-full"
      />
    </div>
  );
}
