import { cn } from "@/libs/utils";
import { z } from "zod";
import ItemList from "./components/item-list";
import EditableData from "@/block-renderer/utils/editable-data";
import { useQuery } from "@tanstack/react-query";
import { getTable } from "@/services/dashboard";

type CardGridProps = z.infer<typeof propsSchema>;
export default function CardGrid({
  className,
  items,
}: CardGridProps = defaultProps) {
  const tableName = "menu";
  const { data, error } = useQuery([tableName], () =>
    getTable({ tableName: tableName })
  );
  return (
    <div className={cn("flex bg-gray-100 rounded-md p-4", className)}>
      <EditableData description="fsdfsdfsd" tableName={tableName} data={data}>
        <div>sdfdsf</div>
      </EditableData>
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
