"use client";

import { cn } from "@/libs/utils";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
export default function RichTextEditor({
  blockComponentProp,
  value,
  setValue,
}: {
  blockComponentProp: ComponentPropDto;
  value: any;
  setValue: any;
}) {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={value}
      onUpdate={({ editor }) => {
        setValue(editor.getText());
      }}
    ></EditorProvider>
  );
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 ">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("bold") ? "is-active bg-blue-200" : ""
        )}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("italic") ? "is-active bg-blue-200" : ""
        )}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("strike") ? "is-active bg-blue-200" : ""
        )}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("code") ? "is-active bg-blue-200" : ""
        )}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("paragraph") ? "is-active bg-blue-200" : ""
        )}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("heading", { level: 1 })
            ? "is-active bg-blue-200"
            : ""
        )}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("heading", { level: 2 })
            ? "is-active bg-blue-200"
            : ""
        )}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("heading", { level: 3 })
            ? "is-active bg-blue-200"
            : ""
        )}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("heading", { level: 4 })
            ? "is-active bg-blue-200"
            : ""
        )}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("heading", { level: 5 })
            ? "is-active bg-blue-200"
            : ""
        )}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("heading", { level: 6 })
            ? "is-active bg-blue-200"
            : ""
        )}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("bulletList") ? "is-active bg-blue-200" : ""
        )}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("orderedList") ? "is-active bg-blue-200" : ""
        )}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("codeBlock") ? "is-active bg-blue-200" : ""
        )}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          "bg-gray-100 border rounded-md p-1 ",
          editor.isActive("blockquote") ? "is-active bg-blue-200" : ""
        )}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" })
            ? "is-active bg-blue-200"
            : ""
        }
      >
        purple
      </button>
    </div>
  );
};
