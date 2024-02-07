"use client";
import { z } from "zod";
import EditableContent from "../../../utils/editable-content";
import { motion } from "framer-motion";
type RichTextProps = z.infer<typeof propsSchema>;

export default function RichText({ className, content }: RichTextProps) {
  return (
    <motion.div className="">
      <EditableContent
        typeName="richtext"
        propName={"content"}
        propValue={content}
      >
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </EditableContent>
    </motion.div>
  );
}
export const defaultProps = {
  className: "",
  content: "",
};
export const displayName = "Card Grid";
export const typeName = "Page Component";
export const iconName = "grid-icon";
export const propsSchema = z.object({
  className: z.string(),
  content: z.string(),
});
