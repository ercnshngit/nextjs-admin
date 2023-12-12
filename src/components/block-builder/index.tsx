"use client";
import { useDesigner } from "@/contexts/designer-context";
import { cn } from "@/libs/utils";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { ComponentDto } from "@/services/dto/component.dto";
import {
  DndContext,
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
import { Button } from "../ui/button";
import DragOverlayWrapper from "./components/drag-overlay-wrapper";
import { customCollisionDetectionAlgorithm } from "./utils/colision-detection";
import { componentTags } from "./utils/component-tags";
import { handleDragEnd } from "./utils/drag-helpers";
import { transformToDesiredFormat } from "./utils/jsx-to-json";
import { createStringFromTree, createTree } from "./utils/tree-operations";

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
    onSave();
  };
  return (
    <div className="bg-white px-4 py-10 h-full min-w-[300px]">
      <div>
        <Button onClick={saveElements}>Gönder</Button>
      </div>
      <div className="flex items-center mb-6 justify-between  w-full space-x-2">
        <Button
          onClick={() => setMode("ui")}
          variant={mode === "ui" ? "default" : "secondary"}
        >
          Tasarım
        </Button>
        <Button
          onClick={() => setMode("preview")}
          variant={mode === "preview" ? "default" : "secondary"}
        >
          Önizleme
        </Button>
        <Button
          onClick={() => setMode("html")}
          variant={mode === "html" ? "default" : "secondary"}
        >
          HTML
        </Button>
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
    setElements,
    mode,
  } = useDesigner();

  const [tree, setTree] = useState<BlockComponentDto[]>([]);
  const [hoveredElement, setHoveredElement] = useState<string[]>([]);
  const [jsx, setJsx] = useState<string>("");
  const [htmlError, setHtmlError] = useState<string | null>(null);

  function handleApplyHtml() {
    if (mode !== "html") return;
    if (jsx === "") return;
    (async () => {
      const jsxElements = await transformToDesiredFormat(
        jsx.replaceAll("\n", "")
      );
      if (jsxElements.error) {
        console.log("hata", jsxElements.error);
        setHtmlError(jsxElements.error.message);
        return;
      } else {
        setHtmlError(null);
      }
      setElements([...jsxElements]);
      setJsx(createStringFromTree(jsxElements));
    })();
  }

  useEffect(() => {
    const elementTree = createTree(elements);
    if (!elementTree) return;
    setTree(elementTree);
    setJsx(createStringFromTree(elementTree));
  }, [elements]);

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
      depth: 0,
      belong_block_component_code: null,
    },
  });

  useDndMonitor({
    onDragEnd: (event) =>
      handleDragEnd({
        event,
        addElement,
        removeElement,
        elements,
      }),
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
            {htmlError && (
              <div className="bg-red-500 p-4 rounded-md text-white">
                {JSON.stringify(htmlError, null, 2)}
              </div>
            )}
            <textarea
              value={jsx}
              onChange={(e) => {
                setJsx(e.target.value);
              }}
              className="rounded-md border w-full border-gray-300 p-2 h-[500px]"
            />
            <Button
              onClick={() => {
                handleApplyHtml();
              }}
              variant="destructive"
            >
              Apply
            </Button>
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
