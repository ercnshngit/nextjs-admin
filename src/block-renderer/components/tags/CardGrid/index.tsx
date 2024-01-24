import { cn } from "@/libs/utils";
import { z } from "zod";
import ItemList from "./components/item-list";

type CardGridProps = z.infer<typeof propsSchema>;
export default function CardGrid({
  className,
  items,
}: CardGridProps = defaultProps) {
  return (
    <div className={cn("flex bg-gray-100 rounded-md p-4", className)}>
      <ItemList datasetInfo={items} />
    </div>
  );
}
export const defaultProps = {
  className: "",
  items: "",
};
export const displayName = "Card Grid";
export const typeName = "Page Component";
export const iconName = "grid-icon";
export const propsSchema = z.object({
  className: z.string(),
  items: z.string(),
});
