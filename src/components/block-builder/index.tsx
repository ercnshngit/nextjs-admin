"use client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Designer from "./components/designer";
import DesignerSidebar from "./components/designer-sidebar";
import DragOverlayWrapper from "./components/drag-overlay-wrapper";
import { customCollisionDetectionAlgorithm } from "./utils/colision-detection";
import { useDesigner } from "@/contexts/designer-context";
import { cn } from "@/libs/utils";

export default function BlockBuilder({ dragDrop }: { dragDrop: boolean }) {
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

  const { mode } = useDesigner();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetectionAlgorithm}
    >
      <div
        className={cn(" h-full", mode === "ui" && "grid grid-cols-[70%_1fr]")}
      >
        <Designer dragDrop={dragDrop} />
        {mode === "ui" && <DesignerSidebar dragDrop={dragDrop} />}
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
