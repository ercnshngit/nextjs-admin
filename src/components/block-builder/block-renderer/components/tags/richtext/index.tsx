import { z } from "zod";
import EditableContent from "../../../utils/editable-content";

type RichTextProps = z.infer<typeof propsSchema>;

export default function RichText({ className, content }: RichTextProps) {
  return (
    <div className="">
      <EditableContent propKey={content}>
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </EditableContent>
    </div>
  );
}

export const propsSchema = z.object({
  className: z.string(),
  content: z.string(),
});
