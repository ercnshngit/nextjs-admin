import { ComponentDto } from "@/services/dto/component.dto";
import { useDraggable } from "@dnd-kit/core";
import { Icons } from "../../utils/icons";

export default function SidebarComponent({
  component,
  ...props
}: {
  component: ComponentDto;
  [key: string]: any;
}) {
  const draggable = useDraggable({
    id: component.id + "-sidebar-drag-handler",
    data: {
      component: component,
      isSidebarComponent: true,
    },
  });
  const Icon =
    (component.icon && Icons[component.icon as keyof typeof Icons]) || null;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="p-4 border aspect-square flex flex-col justify-center items-center gap-4 bg-white rounded-md mb-4 cursor-pointer"
    >
      {Icon && <Icon />}
      <h1 className="text-center">{component.name}</h1>
    </div>
  );
}
