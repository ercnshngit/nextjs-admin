import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { useDesigner } from "@/contexts/designer-context";
import { PageComponent } from "@/types/page-component";
import { componentTags } from "../block-builder/utils/component-tags";
import { createChildrenTree } from "../block-builder/utils/tree-operations";

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

  let node = <div>No drag overlay</div>;

  if (draggedItem.data?.current?.isSidebarItem) {
    const tag = draggedItem.data?.current?.tag;
    node = componentTags[tag];
  }

  if (draggedItem.data?.current?.isComponent) {
    const componentId = draggedItem.data?.current?.id;
    const component = elements.find((el) => el.id === componentId);
    if (!component) {
      node = <div>Element not found!</div>;
    } else {
      const getComponent = (componentWithoutChildren: PageComponent) => {
        const component = createChildrenTree(
          componentWithoutChildren,
          elements
        );
        const Component = componentTags[component.tag];
        if (component.tag in componentTags) {
          if (component.children && component.children.length > 0) {
            return (
              <Component
                {...Object.fromEntries(
                  component.props.map((prop) => [prop.prop.key, prop.value])
                )}
                key={component.id}
              >
                {component.children.map((child) => {
                  if (child.tag in componentTags) {
                    const ChildComponent = componentTags[child.tag];

                    return (
                      <ChildComponent
                        key={child.id}
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
              key={component.id}
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
