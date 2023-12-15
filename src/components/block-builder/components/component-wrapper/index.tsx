import { Button } from "@/components/ui/button";
import { useDesigner } from "@/contexts/designer-context";
import { cn } from "@/libs/utils";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import {
  CopyIcon,
  MoveIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useCallback } from "react";
import { componentTags } from "../../utils/component-tags";
export default function ComponentWrapper({
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
}) {
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
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(component);
      }}
      onMouseLeave={() =>
        setHoveredElement((prev) =>
          prev.filter((item) => item !== component.code)
        )
      }
      className="relative border border-gray-400 border-dashed rounded-md group"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/3 rounded-t-md"
      />
      {component.hasChildren && component.children?.length === 0 && (
        <div
          ref={children.setNodeRef}
          className="absolute w-full bg-red-500 h-1/3 bottom-1/3 "
        />
      )}

      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/3 rounded-b-md"
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
          className="w-6 h-6 p-1"
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
          className="w-6 h-6 p-1"
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
          className="w-6 h-6 p-1"
        >
          <TrashIcon />
        </Button>
        <Button
          {...draggable.listeners}
          {...draggable.attributes}
          variant="secondary"
          size="icon"
          className="w-6 h-6 p-1"
        >
          <MoveIcon />
        </Button>
      </div>
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}
      {children.isOver && (
        <div className="absolute w-full rounded-md top-1/3 h-1/3 bg-primary " />
      )}
      <div className="p-2">
        <Component {...props} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  );
}
