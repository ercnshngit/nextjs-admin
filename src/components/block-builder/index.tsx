"use client";
import { Component, PageComponent } from "@/types/page-component";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MoveIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { cn } from "@/libs/utils";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useDndMonitor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "../drag-overlay-wrapper";
import { useDesigner } from "@/contexts/designer-context";
import { customCollisionDetectionAlgorithm } from "./colision-detection";

const COMPONENTS: PageComponent[] = [
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
        prop: {
          id: 1,
          key: "className",
        },
        value: "font-bold text-xl",
      },
      {
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
        prop: {
          id: 1,
          key: "className",
        },
        value: "font-bold text-xl text-red-500",
      },
      {
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
        prop: {
          id: 1,
          key: "className",
        },
        value: "",
      },
    ],
  },
];

const SIDEBAR_COMPONENTS: Component[] = [
  {
    id: 1,
    name: "Text",
    tag: "Text",
    type: {
      id: 1,
      name: "Page",
    },
    props: [
      {
        id: 1,
        key: "className",
      },

      {
        id: 2,
        key: "text",
      },
    ],
  },
  {
    id: 2,
    name: "Vertical Stack",
    tag: "VStack",
    hasChildren: true,
    type: {
      id: 1,
      name: "Page",
    },
    props: [
      {
        id: 1,
        key: "className",
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
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetectionAlgorithm}
    >
      <Designer />
      <DesignerSidebar />
      <DragOverlayWrapper />
    </DndContext>
  );
}

function DesignerSidebar() {
  return (
    <div className="bg-white px-4 py-10 h-full min-w-[200px]">
      {SIDEBAR_COMPONENTS.map((component) => {
        return <SidebarComponent component={component} key={component.id} />;
      })}
    </div>
  );
}

function SidebarComponent({
  component,
  ...props
}: {
  component: Component;
  [key: string]: any;
}) {
  const draggable = useDraggable({
    id: component.id + "-sidebar-drag-handler",
    data: {
      id: component.id,
      component: component,
      isSidebarComponent: true,
    },
  });
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="p-4 border rounded-md mb-4 cursor-pointer"
    >
      <h1>{component.name}</h1>
    </div>
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

  const [tree, setTree] = useState<PageComponent[]>([]);
  useEffect(() => {
    setTree(createTree(elements));
  }, [elements]);

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

      if (!draggedElement || !droppedArea) return;
      console.log({
        "component mi:": draggedElement?.isComponent,
        "sidebar component mi:": draggedElement?.isSidebarComponent,
        "bırakılan yer component mi:": droppedArea?.isComponent,
        "bırakılan yer designer drop area mı:": droppedArea?.isDesignerDropArea,
        "bırakılan yerin çocuğu var mı:": droppedArea?.hasChildren,
        "bırakılan yerin üst yarısı mı:": droppedArea?.isTopHalf,
        "bırakılan yerin alt yarısı mı:": droppedArea?.isBottomHalf,
        "bırakılan yerin depthi:": droppedArea?.depth,
        "bırakılan yerin belong component idsi:":
          droppedArea?.belong_component_id,
        "bırakılan yerin idsi:": droppedArea?.id,
      });

      const isSidebarComponentDroppingOverDesignerDropArea =
        draggedElement?.isSidebarComponent && droppedArea?.isDesignerDropArea;

      const isDroppingOverComponent =
        droppedArea?.isTopHalf || droppedArea?.isBottomHalf;

      const isDroppingOverChildren =
        droppedArea?.hasChildren ||
        droppedArea?.isTopHalf ||
        droppedArea?.isBottomHalf;

      const isSidebarComponentDroppingOverComponent =
        draggedElement?.isSidebarComponent && isDroppingOverComponent;

      const isComponentOverComponent =
        isDroppingOverChildren && draggedElement?.isComponent;

      const isComponentOverDesignerDropArea =
        droppedArea?.isDesignerDropArea && draggedElement?.isComponent;

      const isSidebarComponentInComponent =
        draggedElement?.isSidebarComponent && droppedArea?.hasChildren;

      if (isSidebarComponentDroppingOverDesignerDropArea) {
        console.log("1");
        const sidebarComponent = draggedElement?.component as Component;
        const newElement = {
          id: crypto.getRandomValues(new Uint32Array(1))[0],
          name: sidebarComponent.name,
          tag: sidebarComponent.tag,
          block_id: 0,
          type: {
            id: sidebarComponent.type.id,
            name: sidebarComponent.type.name,
          },
          depth: 0,
          hasChildren: sidebarComponent.hasChildren,
          children: sidebarComponent.hasChildren ? [] : undefined,
          order: elements.length,
          belong_component_id: null,
          props: sidebarComponent.props.map((prop) => ({
            prop: {
              id: prop.id,
              key: prop.key,
            },
            value: "",
          })),
        };

        addElement(elements.length, newElement);
        return;
      } else if (isSidebarComponentDroppingOverComponent) {
        console.log("2");
        const sidebarComponent = draggedElement?.component as Component;
        const overId = droppedArea?.id;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (droppedArea?.isBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        console.log("bırakılan yer", droppedArea);
        const newElement = {
          id: crypto.getRandomValues(new Uint32Array(1))[0],
          name: sidebarComponent.name,
          tag: sidebarComponent.tag,
          block_id: 0,
          type: {
            id: sidebarComponent.type.id,
            name: sidebarComponent.type.name,
          },
          depth: droppedArea?.depth,
          hasChildren: sidebarComponent.hasChildren,
          children: sidebarComponent.hasChildren ? [] : undefined,
          order: indexForNewElement,
          belong_component_id: droppedArea?.belong_component_id,
          props: sidebarComponent.props.map((prop) => ({
            prop: {
              id: prop.id,
              key: prop.key,
            },
            value: "",
          })),
        };

        addElement(indexForNewElement, newElement);
        return;
      } else if (isSidebarComponentInComponent) {
        console.log("3");
        const sidebarComponent = draggedElement?.component as Component;

        const newElement = {
          id: crypto.getRandomValues(new Uint32Array(1))[0],
          name: sidebarComponent.name,
          tag: sidebarComponent.tag,
          block_id: 0,
          type: {
            id: sidebarComponent.type.id,
            name: sidebarComponent.type.name,
          },
          hasChildren: sidebarComponent.hasChildren,
          children: sidebarComponent.hasChildren ? [] : undefined,
          depth: parseFloat(droppedArea?.depth) + 1,
          order: 0,
          belong_component_id: droppedArea?.id,
          props: sidebarComponent.props.map((prop) => ({
            prop: {
              id: prop.id,
              key: prop.key,
            },
            value: "",
          })),
        };

        addElement(0, newElement);

        return;
      } else if (isComponentOverComponent) {
        console.log("4");
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
          console.log("4.1");
          indexForNewElement = 0;
          const newElement = {
            ...elements[activeElementIndex],
            children: draggedElement.component.hasChildren ? [] : undefined,
            hasChildren: draggedElement.component.hasChildren,
            belong_component_id: droppedArea.id,
            depth: droppedArea.depth + 1,
          };
          addElement(indexForNewElement, newElement);

          return;
        }
        const newElement = {
          ...elements[activeElementIndex],
          children: draggedElement.component.hasChildren ? [] : undefined,
          hasChildren: draggedElement.component.hasChildren,
          belong_component_id: droppedArea.belong_component_id,
          depth: droppedArea.depth,
        };
        addElement(indexForNewElement, newElement);
      } else if (isComponentOverDesignerDropArea) {
        console.log("5");
        const activeId = draggedElement?.id;
        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        if (activeElementIndex === -1) {
          throw new Error("element not found");
        }
        const activeElement = {
          ...elements[activeElementIndex],
          children: draggedElement.component.hasChildren ? [] : undefined,
          hasChildren: draggedElement.component.hasChildren,
          depth: 0,
          belong_component_id: null,
        };
        removeElement(activeId);
        addElement(elements.length, activeElement);
      }
    },
  });

  const renderComponent = (component: PageComponent) => {
    return (
      <DesignWrapper
        hoveredElement={hoveredElement}
        setHoveredElement={setHoveredElement}
        component={component}
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value])
        )}
        key={component.id}
      >
        {component.hasChildren &&
          component.children &&
          component.children.map((child) => {
            if (child.tag in componentTags) {
              return renderComponent(child);
            }
            return null;
          })}
      </DesignWrapper>
    );
  };

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
              {tree.map((component) => {
                if (component.tag in componentTags) {
                  return renderComponent(component);
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
  return (
    <div className={cn("flex flex-col bg-gray-100 rounded-md p-4", className)}>
      {children}
    </div>
  );
}

export function Text({ className, text }: { className: string; text: string }) {
  return (
    <div className={cn("font-bold", className)}>
      {text || "Üzerine tıklayarak düzenleyebilirsiniz"}
    </div>
  );
}

function createTree(components: PageComponent[]) {
  const map: { [key: number]: PageComponent } = {};

  components.forEach((component) => {
    map[component.id] = { ...component, children: [] };
  });

  function addChildren(component: PageComponent) {
    components.forEach((child) => {
      if (child.belong_component_id === component.id) {
        component.children?.push(addChildren({ ...child, children: [] }));
      }
    });
    return component;
  }

  return components
    .filter((component) => !component.belong_component_id)
    .map((root) => addChildren(map[root.id]));
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
  component: PageComponent;
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
      component: component,
      depth: component.depth,
      belong_component_id: component.belong_component_id,
    },
  });
  const bottomHalf = useDroppable({
    id: component.id + "-bottom",
    data: {
      tag: component.tag,
      id: component.id,
      component: component,
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
      component: component,
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
      component: component,
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
      {component.hasChildren && component.children?.length === 0 && (
        <div
          ref={children.setNodeRef}
          className="absolute w-full h-1/3 bg-red-500 bottom-1/3 "
        />
      )}

      <div
        ref={bottomHalf.setNodeRef}
        className="absolute  w-full bottom-0 h-1/3 rounded-b-md"
      />

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
        <div className="absolute top-1/3 w-full rounded-md h-1/3 bg-primary " />
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
