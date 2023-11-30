"use client";
import { useDesigner } from "@/contexts/designer-context";
import { cn } from "@/libs/utils";
import { Component, PageComponent } from "@/types/page-component";
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
import {
  CopyIcon,
  HeightIcon,
  LetterCaseCapitalizeIcon,
  MoveIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useCallback, useEffect, useState } from "react";
import DragOverlayWrapper from "../drag-overlay-wrapper";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { customCollisionDetectionAlgorithm } from "./utils/colision-detection";
import { componentTags } from "./utils/component-tags";
import { createTree } from "./utils/tree-operations";
import { Switch } from "../ui/switch";

const COMPONENTS: PageComponent[] = [
  {
    code: "1",
    component: {
      id: 1,
      name: "Text",
      tag: "Text",
    },
    block_id: 1,
    type: {
      id: 1,
      name: "Page",
    },
    depth: 1,
    order: 1,
    belong_component_id: "2",
    props: [
      {
        prop: {
          id: 1,
          key: "className",
          type: "string",
        },
        value: "font-bold text-xl",
      },
      {
        prop: {
          id: 2,
          key: "text",
          type: "string",
        },
        value: "Hello World",
      },
    ],
  },
  {
    code: "3",
    component: {
      id: 1,
      name: "Text",
      tag: "Text",
    },
    block_id: 1,
    type: {
      id: 1,
      name: "Page",
    },
    depth: 1,
    order: 2,
    belong_component_id: "2",
    props: [
      {
        prop: {
          id: 1,
          key: "className",
          type: "string",
        },
        value: "font-bold text-xl text-red-500",
      },
      {
        prop: {
          id: 2,
          key: "text",
          type: "string",
        },
        value: "Asfsdfdsfsdfdsf",
      },
    ],
  },
  {
    code: "2",
    component: {
      id: 2,
      name: "Vertical Stack",
      tag: "VStack",
    },
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
          type: "string",
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
    icon: "LetterCaseCapitalize",
    type: {
      id: 1,
      name: "Page",
    },
    props: [
      {
        id: 1,
        key: "className",
        type: "string",
      },

      {
        id: 2,
        key: "text",
        type: "string",
      },
    ],
  },
  {
    id: 2,
    name: "Vertical Stack",
    icon: "Height",
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
        type: "string",
      },
    ],
  },
];

export const Icons = {
  LetterCaseCapitalize: LetterCaseCapitalizeIcon,
  Height: HeightIcon,
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
  const { selectedElement, isPreview, updateElement, setIsPreview } =
    useDesigner();
  return (
    <div className="bg-white px-4 py-10 h-full min-w-[300px]">
      <div className="flex items-center justify-between  w-full space-x-2">
        <Label htmlFor="preview-mode">Preview Mode</Label>
        <Switch
          id="preview-mode"
          onCheckedChange={() => setIsPreview((prev) => !prev)}
          checked={isPreview}
        />
      </div>
      {selectedElement && (
        <div className="flex flex-col w-full  gap-2">
          <h1 className="text-2xl font-bold">Properties</h1>
          {selectedElement.props.map((prop) => {
            return (
              <div key={prop.prop.key} className="flex w-full  flex-col gap-2">
                <label htmlFor={prop.prop.key}>{prop.prop.key}</label>
                <input
                  className="rounded-md border w-full border-gray-300 p-2"
                  type="text"
                  id={prop.prop.key}
                  value={prop.value}
                  onChange={(e) => {
                    updateElement(selectedElement.code, {
                      ...selectedElement,
                      props: selectedElement.props.map((p) => {
                        if (p.prop.key === prop.prop.key) {
                          return {
                            ...p,
                            value: e.target.value,
                          };
                        }
                        return p;
                      }),
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {!selectedElement &&
          SIDEBAR_COMPONENTS.map((component) => {
            return (
              <SidebarComponent component={component} key={component.id} />
            );
          })}
      </div>
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
      component: component,
      isSidebarComponent: true,
    },
  });
  const Icon = Icons[component.icon as keyof typeof Icons];
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="p-4 border aspect-square flex flex-col justify-center items-center gap-4 bg-white rounded-md mb-4 cursor-pointer"
    >
      <Icon />
      <h1 className="text-center">{component.name}</h1>
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
    isPreview,
  } = useDesigner();

  const [tree, setTree] = useState<PageComponent[]>([]);
  useEffect(() => {
    setTree(createTree(elements));
  }, [elements]);

  const [hoveredElement, setHoveredElement] = useState<string[]>([]);
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

      type DraggedElement = {
        component: PageComponent | Component;
        isComponent?: boolean;
        isSidebarComponent?: boolean;
      };

      type DroppedArea = {
        component: PageComponent;
        hasChildren?: boolean;
        isTopHalf?: boolean;
        isBottomHalf?: boolean;
        isDesignerDropArea?: boolean;
      };

      const draggedElement = active.data?.current as DraggedElement;
      const droppedArea = over.data?.current as DroppedArea;

      if (!draggedElement || !droppedArea) return;

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
          code: crypto.randomUUID(),
          component: {
            id: sidebarComponent.id,
            name: sidebarComponent.name,
            tag: sidebarComponent.tag,
          },
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
              type: prop.type,
            },
            value: "",
          })),
        };

        addElement(elements.length, newElement);
        return;
      } else if (isSidebarComponentDroppingOverComponent) {
        console.log("2");
        const sidebarComponent = draggedElement?.component as Component;
        const overId = droppedArea?.component.code;
        const overElementIndex = elements.findIndex((el) => el.code === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (droppedArea?.isBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        console.log("bırakılan yer", droppedArea);
        const newElement = {
          code: crypto.randomUUID(),
          component: {
            id: sidebarComponent.id,
            name: sidebarComponent.name,
            tag: sidebarComponent.tag,
          },
          block_id: 0,
          type: {
            id: sidebarComponent.type.id,
            name: sidebarComponent.type.name,
          },
          depth: droppedArea?.component.depth,
          hasChildren: sidebarComponent.hasChildren,
          children: sidebarComponent.hasChildren ? [] : undefined,
          order: indexForNewElement,
          belong_component_id: droppedArea?.component.belong_component_id,
          props: sidebarComponent.props.map((prop) => ({
            prop: {
              id: prop.id,
              key: prop.key,
              type: prop.type,
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
          code: crypto.randomUUID(),
          component: {
            id: sidebarComponent.id,
            name: sidebarComponent.name,
            tag: sidebarComponent.tag,
          },
          block_id: 0,
          type: {
            id: sidebarComponent.type.id,
            name: sidebarComponent.type.name,
          },
          hasChildren: sidebarComponent.hasChildren,
          children: sidebarComponent.hasChildren ? [] : undefined,
          depth: droppedArea?.component.depth + 1,
          order: 0,
          belong_component_id: droppedArea?.component.code,
          props: sidebarComponent.props.map((prop) => ({
            prop: {
              id: prop.id,
              key: prop.key,
              type: prop.type,
            },
            value: "",
          })),
        };

        addElement(0, newElement);

        return;
      } else if (isComponentOverComponent) {
        console.log("4");
        if (!("code" in draggedElement?.component)) {
          throw new Error("dragged element is not component");
        }
        const activeCode = draggedElement?.component?.code;
        const overId = droppedArea?.component.code;
        const activeElementIndex = elements.findIndex(
          (el) => el.code === activeCode
        );
        const overElementIndex = elements.findIndex((el) => el.code === overId);
        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }
        removeElement(activeCode);
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
            belong_component_id: droppedArea.component.code,
            depth: droppedArea.component.depth + 1,
          };
          addElement(indexForNewElement, newElement);

          return;
        }
        const newElement = {
          ...elements[activeElementIndex],
          children: draggedElement.component.hasChildren ? [] : undefined,
          hasChildren: draggedElement.component.hasChildren,
          belong_component_id: droppedArea.component.belong_component_id,
          depth: droppedArea.component.depth,
        };
        addElement(indexForNewElement, newElement);
      } else if (isComponentOverDesignerDropArea) {
        console.log("5");
        if (!("code" in draggedElement?.component)) {
          throw new Error("dragged element is not component");
        }
        const activeCode = draggedElement?.component.code;
        const activeElementIndex = elements.findIndex(
          (el) => el.code === activeCode
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
        removeElement(activeCode);
        addElement(elements.length, activeElement);
      }
    },
  });

  const renderDesignWrapper = (component: PageComponent) => {
    return (
      <DesignWrapper
        hoveredElement={hoveredElement}
        setHoveredElement={setHoveredElement}
        component={component}
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value])
        )}
        key={component.code}
      >
        {component.hasChildren &&
          component.children &&
          component.children.map((child) => {
            if (child.component.tag in componentTags) {
              return renderDesignWrapper(child);
            }
            return null;
          })}
      </DesignWrapper>
    );
  };

  const renderPreview = (component: PageComponent) => {
    const Component = componentTags[component.component.tag];
    return (
      <Component
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value])
        )}
        key={component.code}
      >
        {component.children?.map((child) => {
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
          {elements.length > 0 &&
            (isPreview ? (
              <div className="flex flex-col  w-full gap-2 p-4">
                {tree.map((component) => {
                  if (component.component.tag in componentTags) {
                    return renderPreview(component);
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="flex flex-col  w-full gap-2 p-4">
                {tree.map((component) => {
                  if (component.component.tag in componentTags) {
                    return renderDesignWrapper(component);
                  }
                  return null;
                })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const DesignWrapper = ({
  hoveredElement,
  setHoveredElement,
  component,
  tag: string,
  ...props
}: {
  hoveredElement: string[];
  setHoveredElement: React.Dispatch<React.SetStateAction<string[]>>;
  component: PageComponent;
  [key: string]: any;
}) => {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: component.code + "-top",
    data: {
      isTopHalf: true,
      component: component,
    },
  });
  const bottomHalf = useDroppable({
    id: component.code + "-bottom",
    data: {
      component: component,
      isBottomHalf: true,
    },
  });
  const children = useDroppable({
    id: component.code + "-children",
    data: {
      component: component,
      hasChildren: component.hasChildren,
    },
  });
  const draggable = useDraggable({
    id: component.code + "-drag-handler",
    data: {
      component: component,
      isComponent: true,
    },
  });

  const Component = componentTags[component.component.tag];
  const { addElement } = useDesigner();
  const duplicateElement = useCallback(
    (component: PageComponent, parentCode?: string) => {
      const code = crypto.randomUUID();
      const newElement = {
        ...component,
        code: code,
        order: parentCode ? component.order : component.order + 1,
        belong_component_id: parentCode
          ? parentCode
          : component.belong_component_id,
      };
      if (parentCode) {
        addElement(component.order, newElement);
      } else {
        addElement(component.order + 2, newElement);
      }
      component.children?.forEach((child) => {
        if (child.component.tag in componentTags) {
          duplicateElement(child, code);
        }
      });
    },
    [addElement]
  );

  if (draggable.isDragging) return null; // temporary remove the element from designer

  return (
    <div
      ref={draggable.setNodeRef}
      onMouseEnter={() => {
        setHoveredElement((prev) => [...prev, component.code]);
      }}
      onMouseLeave={() =>
        setHoveredElement((prev) =>
          prev.filter((item) => item !== component.code)
        )
      }
      className="border relative group border-dashed border-gray-400 rounded-md"
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
          hoveredElement[hoveredElement.length - 1] === component.code
            ? "block"
            : "hidden"
        )}
      />
      <div
        className={cn(
          "absolute top-0 right-0 gap-1 z-20",
          hoveredElement[hoveredElement.length - 1] === component.code
            ? "flex"
            : "hidden"
        )}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            duplicateElement(component);
          }}
          variant="default"
          size="icon"
          className="h-6 w-6 p-1"
        >
          <CopyIcon />
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(component);
          }}
          variant="default"
          size="icon"
          className="h-6 w-6 p-1"
        >
          <Pencil2Icon />
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // avoid selection of element while deleting
            removeElement(component.code);
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
        kod: {component.code}
        <br />
        depth: {component.depth}
        <br />
        order: {component.order}
        <br />
        belong_component_id: {component.belong_component_id}
        <br />
        <Component {...props} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  );
};
