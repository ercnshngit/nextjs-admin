import { z } from "zod";

type RichTextProps = z.infer<typeof propsSchema>;

export default function RichText({ className, content }: RichTextProps) {
  return (
    <div className="">
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export const propsSchema = z.object({
  className: z.string(),
  content: z.string(),
});
