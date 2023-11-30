import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { useDesigner } from "@/contexts/designer-context";
import { PageComponent } from "@/types/page-component";
import { componentTags } from "../block-builder/utils/component-tags";
import { createChildrenTree } from "../block-builder/utils/tree-operations";
import { Icons } from "../block-builder";

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
    const Icon = Icons[component.icon as keyof typeof Icons];
    node = (
      <div className="p-4 border aspect-square flex flex-col justify-center items-center gap-4 bg-white rounded-md mb-4 cursor-pointer">
        <Icon />
        <h1 className="text-center">{component.name}</h1>
      </div>
    );
  }

  if (draggedItem.data?.current?.isComponent) {
    const componentCode = draggedItem.data?.current?.code;
    const component = elements.find((el) => el.code === componentCode);
    if (!component) {
      node = <div>Element not found!</div>;
    } else {
      const getComponent = (componentWithoutChildren: PageComponent) => {
        const component = createChildrenTree(
          componentWithoutChildren,
          elements
        );
        const Component = componentTags[component.component.tag];
        if (component.component.tag in componentTags) {
          if (component.children && component.children.length > 0) {
            return (
              <Component
                {...Object.fromEntries(
                  component.props.map((prop) => [prop.prop.key, prop.value])
                )}
                key={component.code}
              >
                {component.children.map((child) => {
                  if (child.component.tag in componentTags) {
                    const ChildComponent = componentTags[child.component.tag];

                    return (
                      <ChildComponent
                        key={child.code}
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
              {...Object.fromEntries(
                component.props.map((prop) => [prop.prop.key, prop.value])
              )}
            />
          );
        }
      };

      node = (
        <div className="flex bg-accent border rounded-md w-full py-2 px-4 opacity-80 pointer pointer-events-none">
          {getComponent(component)}
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
