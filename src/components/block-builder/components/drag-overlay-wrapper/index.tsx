import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { useDesigner } from "@/contexts/designer-context";
import { PageComponent } from "@/types/page-component";
import { createChildrenTree } from "../../utils/tree-operations";
import { Icons } from "../../utils/icons";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { componentTags } from "../../block-renderer/utils/component-tags";

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div className="border rounded-md">No drag overlay</div>;

  if (draggedItem.data?.current?.isSidebarComponent) {
    const component = draggedItem.data?.current?.component;
    const Icon =
      (component.icon && Icons[component.icon as keyof typeof Icons]) || null;
    node = (
      <div className="p-4 border aspect-square flex flex-col justify-center items-center gap-4 bg-white rounded-md mb-4 cursor-pointer">
        {Icon && <Icon />}
        <h1 className="text-center">{component.name}</h1>
      </div>
    );
  }

  if (draggedItem.data?.current?.isComponent) {
    const componentCode = draggedItem.data?.current?.component.code;
    const component = elements.find((el) => el.code === componentCode);
    console.log("elements", draggedItem);
    if (!component) {
      node = <div>Element not found!</div>;
    } else {
      const getComponent = (componentWithoutChildren: BlockComponentDto) => {
        const component = createChildrenTree(
          componentWithoutChildren,
          elements
        );
        const Component = componentTags[component.component.tag.name];

        if (component.component.tag.name in componentTags) {
          if (component.children && component.children.length > 0) {
            return (
              <Component
                {...Object.fromEntries(
                  component.props.map((prop) => [prop.prop.key, prop.value])
                )}
                key={component.code}
                id={component.code}
              >
                {component.children.map((child) => {
                  if (child.component.tag.name in componentTags) {
                    const ChildComponent =
                      componentTags[child.component.tag.name];

                    return (
                      <ChildComponent
                        key={child.code}
                        id={child.code}
                        {...Object.fromEntries(
                          child.props.map((prop) => [prop.prop.key, prop.value])
                        )}
                      />
                    );
                  }
                  return null;
                })}
              </Component>
            );
          }

          return (
            <Component
              key={component.code}
              id={component.code}
              {...Object.fromEntries(
                component.props.map((prop) => [prop.prop.key, prop.value])
              )}
            />
          );
        }
      };

      node = (
        <div className="flex bg-white border rounded-md w-full py-2 px-4 opacity-90 min-h-[100px] pointer pointer-events-none">
          {getComponent(component)}
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
