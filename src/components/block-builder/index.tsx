"use client";
import { useDesigner } from "@/contexts/designer-context";
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
import {
  CopyIcon,
  HeightIcon,
  LetterCaseCapitalizeIcon,
  MoveIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useCallback, useEffect, useState } from "react";
import DragOverlayWrapper from "./components/drag-overlay-wrapper";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { customCollisionDetectionAlgorithm } from "./utils/colision-detection";
import { componentTags } from "./utils/component-tags";
import { createTree } from "./utils/tree-operations";
import JSONEditInput from "./components/json-edit-input";
import { ComponentDto } from "@/services/dto/component.dto";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FormControl, FormItem, FormLabel } from "../ui/form";

export const Icons = {
  LetterCaseCapitalize: LetterCaseCapitalizeIcon,
  Height: HeightIcon,
};

export default function BlockBuilder({
  onSave,
  sidebarComponents,
}: {
  onSave: () => void;
  sidebarComponents: ComponentDto[];
}) {
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetectionAlgorithm}
    >
      <Designer />

      <DesignerSidebar sidebarComponents={sidebarComponents} onSave={onSave} />
      <DragOverlayWrapper />
    </DndContext>
  );
}

function DesignerSidebar({
  sidebarComponents,
  onSave,
}: {
  sidebarComponents: ComponentDto[];
  onSave: () => void;
}) {
  const { elements, selectedElement, mode, setMode, updateElement } =
    useDesigner();

  const saveElements = () => {
    console.log(elements);
    onSave();
  };
  return (
    <div className="bg-white px-4 py-10 h-full min-w-[300px]">
      <div>
        <Button onClick={saveElements}>Gönder</Button>
      </div>
      <div className="flex items-center mb-6 justify-between  w-full space-x-2">
        <div
          className="py-1 px-2 my-2 w-full text-center select-none cursor-pointer bg-gray-100 rounded "
          onClick={() => {
            setMode((prev) =>
              prev === "ui" ? "html" : prev === "html" ? "preview" : "ui"
            );
          }}
        >
          {mode}
        </div>
      </div>
      {selectedElement && (
        <div className="flex flex-col w-full  gap-2">
          <h1 className="text-2xl font-bold">Properties</h1>

          {selectedElement.props.map((prop) => {
            if (prop.prop.key === "children") {
              return <div key={prop.prop.key}>.</div>;
            }
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
          sidebarComponents.map((component) => {
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

function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
    mode,
  } = useDesigner();

  const [tree, setTree] = useState<BlockComponentDto[]>([]);
  useEffect(() => {
    setTree(createTree(elements));
  }, [elements]);

  const [hoveredElement, setHoveredElement] = useState<string[]>([]);
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
      depth: 0,
      belong_block_component_code: null,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      type DraggedElement = {
        component: BlockComponentDto | ComponentDto;
        isComponent?: boolean;
        isSidebarComponent?: boolean;
      };

      type DroppedArea = {
        component: BlockComponentDto;
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
        const sidebarComponent = draggedElement?.component as ComponentDto;
        const newElement = {
          ...sidebarComponent,
          code: crypto.randomUUID(),
          component: {
            ...sidebarComponent,
            type_id: sidebarComponent.type.id,
            tag_id: sidebarComponent.tag.id,
          },
          block: {
            id: 0,
            title: "deneme block",
            type_id: 1,
          },
          depth: 0,
          hasChildren: sidebarComponent.props.find(
            (prop) => prop.prop.key === "children"
          )
            ? true
            : false,
          children: sidebarComponent.props.find(
            (prop) => prop.prop.key === "children"
          )
            ? []
            : undefined,
          props: sidebarComponent.props.map((prop) => ({
            prop: prop.prop,
            value: "",
          })),
          order: elements.length,
          belong_block_component_code: null,
        };

        addElement(elements.length, newElement);
        return;
      } else if (isSidebarComponentDroppingOverComponent) {
        console.log("2");
        const sidebarComponent = draggedElement?.component as ComponentDto;
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
        //DEPTH
        // ORDER
        //BELONG_BLOCK_COMPONENT_CODE
        const newElement = {
          ...sidebarComponent,
          code: crypto.randomUUID(),
          component: {
            ...sidebarComponent,
            type_id: sidebarComponent.type.id,
            tag_id: sidebarComponent.tag.id,
          },
          block: {
            id: 0,
            title: "deneme block",
            type_id: 1,
          },
          hasChildren: sidebarComponent.component_prop.find(
            (prop) => prop.prop.key === "children"
          )
            ? true
            : false,
          children: sidebarComponent.props.find(
            (prop) => prop.prop.key === "children"
          )
            ? []
            : undefined,
          props: sidebarComponent.props.map((prop) => ({
            prop: prop.prop,
            value: "",
          })),
          depth: droppedArea?.component.depth, // BURASI ÜSTTEKİNDEN FARKLI
          order: indexForNewElement,
          belong_block_component_code:
            droppedArea?.component.belong_block_component_code,
        };

        addElement(indexForNewElement, newElement);
        return;
      } else if (isSidebarComponentInComponent) {
        console.log("3");
        const sidebarComponent = draggedElement?.component as ComponentDto;

        const newElement = {
          ...sidebarComponent,
          code: crypto.randomUUID(),
          component: {
            ...sidebarComponent,
            type_id: sidebarComponent.type.id,
            tag_id: sidebarComponent.tag.id,
          },
          block: {
            id: 0,
            title: "deneme block",
            type_id: 1,
          },
          hasChildren: sidebarComponent.component_prop.find(
            (prop) => prop.prop.key === "children"
          )
            ? true
            : false,
          children: sidebarComponent.props.find(
            (prop) => prop.prop.key === "children"
          )
            ? []
            : undefined,
          props: sidebarComponent.props.map((prop) => ({
            prop: prop.prop,
            value: "",
          })),
          depth: droppedArea?.component.depth + 1,
          order: 0,
          belong_block_component_code: droppedArea?.component.code,
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
            belong_block_component_code: droppedArea.component.code,
            depth: droppedArea.component.depth + 1,
          };
          addElement(indexForNewElement, newElement);

          return;
        }
        const newElement = {
          ...elements[activeElementIndex],
          children: draggedElement.component.hasChildren ? [] : undefined,
          hasChildren: draggedElement.component.hasChildren,
          belong_block_component_code:
            droppedArea.component.belong_block_component_code,
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
          belong_block_component_code: null,
        };
        removeElement(activeCode);
        addElement(elements.length, activeElement);
      }
    },
  });

  const renderDesignWrapper = (component: BlockComponentDto) => {
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
            if (child.component.tag.name in componentTags) {
              return renderDesignWrapper(child);
            }
            return null;
          })}
      </DesignWrapper>
    );
  };

  const renderPreview = (component: BlockComponentDto) => {
    const Component = componentTags[component.component.tag.name];
    return (
      <Component
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value])
        )}
        key={component.code}
      >
        {component.children?.map((child) => {
          if (child.component.tag.name in componentTags) {
            const ChildComponent = componentTags[child.component.tag.name];

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
    <div className="flex w-full h-full ">
      <div
        className="p-4 w-full h-full "
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        {mode === "html" ? (
          <div className="flex flex-col  w-full gap-2 p-4">
            <textarea></textarea>
          </div>
        ) : (
          <div
            ref={droppable.setNodeRef}
            className={cn(
              "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
              droppable.isOver && "ring-4 ring-primary ring-inset"
            )}
          >
            {!droppable.isOver && elements.length === 0 && (
              <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                Buraya bırakın
              </p>
            )}

            {droppable.isOver && elements.length === 0 && (
              <div className="p-4 w-full">
                <div className="h-[120px] rounded-md bg-primary/20"></div>
              </div>
            )}
            {elements.length > 0 &&
              (mode === "preview" ? (
                <div className="flex flex-col  w-full gap-2 p-4">
                  {tree.map((component) => {
                    if (component.component.tag.name in componentTags) {
                      return renderPreview(component);
                    }
                    return null;
                  })}
                </div>
              ) : mode === "ui" ? (
                <div className="flex flex-col  w-full gap-2 p-4">
                  {tree.map((component) => {
                    if (component.component.tag.name in componentTags) {
                      return renderDesignWrapper(component);
                    }
                    return null;
                  })}
                </div>
              ) : null)}
          </div>
        )}
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
  component: BlockComponentDto;
  [key: string]: any;
}) => {
  const { removeElement, setSelectedElement } = useDesigner();
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

  const Component = componentTags[component.component.tag.name];
  const { addElement } = useDesigner();
  const duplicateElement = useCallback(
    (component: BlockComponentDto, parentCode?: string) => {
      const code = crypto.randomUUID();
      const newElement = {
        ...component,
        code: code,
        order: parentCode ? component.order : component.order + 1,
        belong_block_component_code: parentCode
          ? parentCode
          : component.belong_block_component_code,
      };
      if (parentCode) {
        addElement(component.order, newElement);
      } else {
        addElement(component.order + 2, newElement);
      }
      component.children?.forEach((child) => {
        if (child.component.tag.name in componentTags) {
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
        <Component {...props} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  );
};
