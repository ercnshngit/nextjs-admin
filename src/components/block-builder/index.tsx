"use client";
import { Component } from "@/types/page-component";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MoveIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { cn } from "@/libs/utils";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useDndMonitor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "../drag-overlay-wrapper";
import { useDesigner } from "@/contexts/designer-context";

const COMPONENTS: Component[] = [
  {
    id: 1,
    name: "Text",
    tag: "Text",
    block_id: 1,
    type: {
      id: 1,
      name: "Page",
    },
    depth: 1,
    order: 1,
    belong_component_id: 2,
    props: [
      {
        id: 1,
        prop: {
          id: 1,
          key: "className",
        },
        value: "font-bold text-xl",
      },
      {
        id: 2,
        prop: {
          id: 2,
          key: "text",
        },
        value: "Hello World",
      },
    ],
  },
  {
    id: 3,
    name: "Text",
    tag: "Text",
    block_id: 1,
    type: {
      id: 1,
      name: "Page",
    },
    depth: 1,
    order: 1,
    belong_component_id: 2,
    props: [
      {
        id: 1,
        prop: {
          id: 1,
          key: "className",
        },
        value: "font-bold text-xl text-red-500",
      },
      {
        id: 2,
        prop: {
          id: 2,
          key: "text",
        },
        value: "Asfsdfdsfsdfdsf",
      },
    ],
  },
  {
    id: 4,
    name: "Text",
    tag: "Text",
    block_id: 1,
    type: {
      id: 1,
      name: "Page",
    },
    depth: 1,
    order: 1,
    belong_component_id: 2,
    props: [
      {
        id: 1,
        prop: {
          id: 1,
          key: "className",
        },
        value: "font-bold text-xl text-red-500",
      },
      {
        id: 2,
        prop: {
          id: 2,
          key: "text",
        },
        value: "Asfsdfdsfsdfdsf",
      },
    ],
  },
  {
    id: 2,
    name: "Vertical Stack",
    tag: "VStack",
    hasChildren: true,
    block_id: 1,
    type: {
      id: 1,
      name: "Page",
    },
    depth: 0,
    order: 1,
    belong_component_id: null,
    props: [
      {
        id: 3,
        prop: {
          id: 1,
          key: "className",
        },
        value: "flex flex-col bg-gray-100 rounded-md p-4",
      },
    ],
  },
];

type ComponentTagsType = {
  [key: string]: any;
};
export const componentTags: ComponentTagsType = {
  Text: Text,
  VStack: VStack,
};

export default function BlockBuilder() {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  const { setElements, setSelectedElement } = useDesigner();
  useEffect(() => {
    const elements = COMPONENTS;
    setElements(elements);
    setSelectedElement(null);
  }, [setElements, setSelectedElement]);

  return (
    <DndContext sensors={sensors}>
      <Designer />
      <DragOverlayWrapper />
    </DndContext>
  );
}

function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();
  const [hoveredElement, setHoveredElement] = useState<number[]>([]);
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
      depth: 0,
      belong_component_id: null,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const draggedElement = active.data?.current;
      const droppedArea = over.data?.current;

      const isSidebarComponentDroppingOverDesignerDropArea =
        draggedElement?.isSidebarComponent && droppedArea?.isDesignerDropArea;

      const isDroppingOverComponent =
        droppedArea?.isTopHalf ||
        droppedArea?.isBottomHalf ||
        droppedArea?.hasChildren;

      const isSidebarComponentDroppingOverComponent =
        draggedElement?.isSidebarComponent && isDroppingOverComponent;

      const isComponentOverComponent =
        isDroppingOverComponent && draggedElement?.isComponent;

      const isComponentOverDesignerDropArea =
        droppedArea?.isDesignerDropArea && draggedElement?.isComponent;

      const isSidebarComponentInComponent =
        draggedElement?.isSidebarComponent && droppedArea?.hasChildren;

      const tag = draggedElement?.tag;

      if (isSidebarComponentDroppingOverDesignerDropArea) {
        const newElement = componentTags[tag];

        addElement(elements.length, newElement);
        return;
      } else if (isSidebarComponentDroppingOverComponent) {
        const newElement = componentTags[tag];
        //TODO: Düzenlencek
        const overId = droppedArea?.id;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (droppedArea?.isBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        //TODO: Düzenlencek
        addElement(indexForNewElement, newElement);
        return;
      } else if (isSidebarComponentInComponent) {
        const newElement = componentTags[tag];
        // TODO: belong id falan gelcek
        addElement(elements.length, newElement);
        return;
      } else if (isComponentOverComponent) {
        const activeId = draggedElement?.id;
        const overId = droppedArea?.id;
        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }
        removeElement(activeId);
        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (droppedArea?.isBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        if (droppedArea?.hasChildren) {
          indexForNewElement = 0;
          addElement(indexForNewElement, {
            ...elements[activeElementIndex],
            belong_component_id: droppedArea.id,
            depth: droppedArea.depth + 1,
          });
          return;
        }
        addElement(indexForNewElement, {
          ...elements[activeElementIndex],
          belong_component_id: droppedArea.belong_component_id,
          depth: droppedArea.depth,
        });
        return;
      } else if (isComponentOverDesignerDropArea) {
        const activeId = draggedElement?.id;
        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        if (activeElementIndex === -1) {
          throw new Error("element not found");
        }
        const activeElement = {
          ...elements[activeElementIndex],
          depth: 0,
          belong_component_id: null,
        };
        removeElement(activeId);
        addElement(elements.length, activeElement);
        return;
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col  w-full gap-2 p-4">
              {createTree(elements).map((component) => {
                if (component.tag in componentTags) {
                  if (component.children && component.children.length > 0) {
                    return (
                      <DesignWrapper
                        hoveredElement={hoveredElement}
                        setHoveredElement={setHoveredElement}
                        component={component}
                        {...Object.fromEntries(
                          component.props.map((prop) => [
                            prop.prop.key,
                            prop.value,
                          ])
                        )}
                        key={component.id}
                      >
                        {component.children.map((child) => {
                          if (child.tag in componentTags) {
                            return (
                              <DesignWrapper
                                hoveredElement={hoveredElement}
                                setHoveredElement={setHoveredElement}
                                component={child}
                                key={child.id}
                                {...Object.fromEntries(
                                  child.props.map((prop) => [
                                    prop.prop.key,
                                    prop.value,
                                  ])
                                )}
                              />
                            );
                          }
                          return null;
                        })}
                      </DesignWrapper>
                    );
                  }
                  return (
                    <DesignWrapper
                      hoveredElement={hoveredElement}
                      setHoveredElement={setHoveredElement}
                      component={component}
                      key={component.id}
                      {...Object.fromEntries(
                        component.props.map((prop) => [
                          prop.prop.key,
                          prop.value,
                        ])
                      )}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VStack({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function Text({ className, text }: { className: string; text: string }) {
  return <div className={className}>{text}</div>;
}

function createTree(components: Component[]) {
  const tree: Component[] = [];
  const map: { [key: number]: Component } = {};
  components.forEach((component) => {
    map[component.id] = { ...component, children: [] };
  });
  components.forEach((component) => {
    if (component.belong_component_id) {
      map[component.belong_component_id].children?.push(component);
    } else {
      tree.push(map[component.id]);
    }
  });
  return tree;
}

export function createChildrenTree(
  component: Component,
  components: Component[]
) {
  const temp: Component = { ...component, children: [] };

  components.forEach((component) => {
    if (component.belong_component_id === temp.id) {
      temp.children?.push(component);
    }
  });
  return temp;
}

const DesignWrapper = ({
  hoveredElement,
  setHoveredElement,
  component,
  tag: string,
  ...props
}: {
  hoveredElement: number[];
  setHoveredElement: React.Dispatch<React.SetStateAction<number[]>>;
  component: Component;
  [key: string]: any;
}) => {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: component.id + "-top",
    data: {
      tag: component.tag,
      id: component.id,
      isTopHalf: true,
      depth: component.depth,
      belong_component_id: component.belong_component_id,
    },
  });
  const bottomHalf = useDroppable({
    id: component.id + "-bottom",
    data: {
      tag: component.tag,
      id: component.id,
      isBottomHalf: true,
      depth: component.depth,
      belong_component_id: component.belong_component_id,
    },
  });
  const children = useDroppable({
    id: component.id + "-children",
    data: {
      tag: component.tag,
      id: component.id,
      hasChildren: component.hasChildren,
      depth: component.depth,
      belong_component_id: component.belong_component_id,
    },
  });
  const draggable = useDraggable({
    id: component.id + "-drag-handler",
    data: {
      tag: component.tag,
      id: component.id,
      isComponent: true,
      depth: component.depth,
      belong_component_id: component.belong_component_id,
    },
  });
  if (draggable.isDragging) return null; // temporary remove the element from designer

  const Component = componentTags[component.tag];

  return (
    <div
      ref={draggable.setNodeRef}
      onMouseEnter={() => {
        setHoveredElement((prev) => [...prev, component.id]);
      }}
      onMouseLeave={() =>
        setHoveredElement((prev) =>
          prev.filter((item) => item !== component.id)
        )
      }
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(component);
      }}
      className="border relative group border-dashed border-gray-400 rounded-md flex flex-col"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/3  rounded-t-md"
      />

      <div
        ref={bottomHalf.setNodeRef}
        className="absolute  w-full bottom-0 h-1/3 rounded-b-md"
      />
      {component.hasChildren && (
        <div
          ref={children.setNodeRef}
          className="absolute w-full h-1/3 bottom-1/3 "
        />
      )}
      <div
        className={cn(
          "absolute bg-black/40 inset-0 transition-opacity duration-300",
          hoveredElement[hoveredElement.length - 1] === component.id
            ? "block"
            : "hidden"
        )}
      />
      <div
        className={cn(
          "absolute top-0 right-0 gap-1 z-20",
          hoveredElement[hoveredElement.length - 1] === component.id
            ? "flex"
            : "hidden"
        )}
      >
        <Button variant="default" size="icon" className="h-6 w-6 p-1">
          <Pencil2Icon />
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // avoid selection of element while deleting
            removeElement(component.id);
          }}
          variant="destructive"
          size="icon"
          className="h-6 w-6 p-1"
        >
          <TrashIcon />
        </Button>
        <Button
          {...draggable.listeners}
          {...draggable.attributes}
          variant="secondary"
          size="icon"
          className="h-6 w-6 p-1"
        >
          <MoveIcon />
        </Button>
      </div>
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}
      {children.isOver && (
        <div className="absolute top-1/3 w-full rounded-md h-1/3 bg-primary rounded-b-none" />
      )}
      <div className="p-2">
        <Component {...props} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  );
};
