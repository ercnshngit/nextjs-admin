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
import Designer from "./components/designer";
import DesignerSidebar from "./components/designer-sidebar";

export default function BlockBuilder({ onSave }: { onSave: () => void }) {
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
      <div className="flex">
        <Designer />
        <DesignerSidebar onSave={onSave} />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
