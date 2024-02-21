import { Component } from "@/block-renderer/utils/component-tags";
import { useDesigner } from "@/contexts/designer-context";
import { cn } from "@/libs/utils";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";
import { handleDragEnd } from "../../utils/drag-helpers";
import { createTree } from "../../utils/tree-operations";
import ComponentWrapper from "../component-wrapper";

export default function Designer({ dragDrop }: { dragDrop: boolean }) {
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
        dragDrop={dragDrop}
        hoveredElement={hoveredElement}
        setHoveredElement={setHoveredElement}
        component={component}
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value])
        )}
        key={component.code}
      >
        {component.children?.map((child) => {
          return renderComponentWrapper(child);
        })}
      </ComponentWrapper>
    );
  };

  const renderPreview = (component: BlockComponentDto): React.ReactNode => {
    return (
      <Component
        component={component}
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value])
        )}
        key={component.code}
        id={component.code}
      >
        {component.children?.map((child) => {
          renderPreview(child);
        })}
      </Component>
    );
  };

  return (
    <div
      className={cn(
        mode === "ui" && "p-4 pb-16",
        "w-full h-full min-h-screen mb-16 "
      )}
      onClick={() => {
        if (selectedElement) setSelectedElement(null);
      }}
    >
      <div
        ref={dragDrop ? droppable.setNodeRef : undefined}
        className={cn(
          "bg-background h-full m-auto  flex flex-col flex-grow items-center justify-start flex-1",
          droppable.isOver && "ring-4 ring-primary ring-inset",
          mode === "ui" && "rounded-xl"
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
              return mode === "preview"
                ? renderPreview(component)
                : mode === "ui"
                ? renderComponentWrapper(component)
                : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
