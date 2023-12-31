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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetectionAlgorithm}
    >
      <div className="flex">
        <Designer />
        <DesignerSidebar />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
