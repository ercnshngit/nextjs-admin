import { useDesigner } from "@/contexts/designer-context";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { createStringFromTree, createTree } from "../../utils/tree-operations";
import { handleDragEnd } from "../../utils/drag-helpers";
import { componentTags } from "../../utils/component-tags";
import ElementsHtml from "../elements-html";
import { cn } from "@/libs/utils";
import ComponentWrapper from "../component-wrapper";
import { Button } from "@/components/ui/button";

export default function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
    setElements,
    mode,
    setBlock,
  } = useDesigner();

  const [tree, setTree] = useState<BlockComponentDto[]>([]);
  const [hoveredElement, setHoveredElement] = useState<string[]>([]);
  // const [jsx, setJsx] = useState<string>("");

  useEffect(() => {
    const elementTree = createTree(elements);
    if (!elementTree) return;
    setTree(elementTree);
    // setJsx(createStringFromTree(elementTree));
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

  const renderComponentWrapper = (component: BlockComponentDto) => {
    return (
      <ComponentWrapper
        hoveredElement={hoveredElement}
        setHoveredElement={setHoveredElement}
        component={component}
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value])
        )}
        key={component.code}
      >
        {component.children?.map((child) => {
          if (child.component.tag.name in componentTags) {
            return renderComponentWrapper(child);
          }
          return renderUnsupported(child);
        })}
      </ComponentWrapper>
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
        id={component.code}
      >
        {component.children?.map((child) => {
          if (child.component.tag.name in componentTags) {
            renderPreview(child);
          }
          return renderUnsupported(child);
        })}
      </Component>
    );
  };

  const renderUnsupported = (component: BlockComponentDto) => {
    return (
      <div className="text-center text-red-400 bg-red-100">
        {component.component.tag.name}
        <p className="text-red-400">Desteklenmeyen bileşen lütfen silin</p>
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => removeElement(component.code)}
        >
          Sil
        </Button>
        <div className="w-full border-b border-red-400"></div>
        {component.children?.map((child) => {
          if (child.component.tag.name in componentTags) {
            return mode === "preview"
              ? renderPreview(component)
              : mode === "ui"
              ? renderComponentWrapper(component)
              : null;
          }
          return renderUnsupported(child);
        })}
      </div>
    );
  };

  return (
    <div className="flex w-full h-full ">
      <div
        className="w-full h-full p-4 "
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        {/* {mode === "html" ? (
          // <ElementsHtml setElements={setElements} jsx={jsx} setJsx={setJsx} />
        ) : ( */}
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="flex items-center flex-grow text-3xl font-bold text-muted-foreground">
              Buraya bırakın
            </p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {tree.map((component) => {
                if (component.component.tag.name in componentTags) {
                  return mode === "preview"
                    ? renderPreview(component)
                    : mode === "ui"
                    ? renderComponentWrapper(component)
                    : null;
                }
                return renderUnsupported(component);
              })}
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
