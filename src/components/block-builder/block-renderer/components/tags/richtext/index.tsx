export default function RichText({
  className,
  content,
}: {
  className: string;
  content: string;
}) {
  return (
    <div className="">
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
