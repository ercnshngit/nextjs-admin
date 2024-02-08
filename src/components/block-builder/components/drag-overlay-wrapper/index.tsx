import { Component } from "@/block-renderer/utils/component-tags";
import { useDesigner } from "@/contexts/designer-context";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { Icons } from "../../utils/icons";
import { createChildrenTree } from "../../utils/tree-operations";

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
      <div className="flex flex-col items-center justify-center gap-4 p-4 mb-4 bg-white border rounded-md cursor-pointer aspect-square">
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

        if (component.children && component.children.length > 0) {
          return (
            <Component
              component={component}
              {...Object.fromEntries(
                component.props.map((prop) => [prop.prop.key, prop.value])
              )}
              key={component.code}
              id={component.code}
            >
              {component.children.map((child) => {
                return (
                  <Component
                    component={child}
                    key={child.code}
                    id={child.code}
                    {...Object.fromEntries(
                      child.props.map((prop) => [prop.prop.key, prop.value])
                    )}
                  />
                );
              })}
            </Component>
          );
        }

        return (
          <Component
            component={component}
            key={component.code}
            id={component.code}
            {...Object.fromEntries(
              component.props.map((prop) => [prop.prop.key, prop.value])
            )}
          />
        );
      };
    }
    if (!component) {
      node = <div>Element not found!</div>;
    } else {
      node = (
        <div className="flex bg-white border rounded-md w-full py-2 px-4 opacity-90 min-h-[100px] pointer pointer-events-none">
          <Component component={component} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
