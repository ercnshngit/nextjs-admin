import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { ComponentDto } from "@/services/dto/component.dto";
import { DragEndEvent } from "@dnd-kit/core";

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
export function handleDragEnd({
  event,
  elements,
  addElement,
  removeElement,
}: {
  event: DragEndEvent;
  elements: BlockComponentDto[];
  addElement: (index: number, element: BlockComponentDto) => void;
  removeElement: (code: string) => void;
}) {
  const { active, over } = event;
  if (!active || !over) return;

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
    handleIsSidebarComponentDroppingOverDesignerDropArea({
      draggedElement,
      elements,
      addElement,
    });
  } else if (isSidebarComponentDroppingOverComponent) {
    handleIsSidebarComponentDroppingOverComponent({
      draggedElement,
      droppedArea,
      elements,
      addElement,
    });
  } else if (isSidebarComponentInComponent) {
    handleIsSidebarComponentInComponent({
      draggedElement,
      droppedArea,
      elements,
      addElement,
    });
  } else if (isComponentOverComponent) {
    handleIsComponentOverComponent({
      draggedElement,
      droppedArea,
      elements,
      addElement,
      removeElement,
    });
  } else if (isComponentOverDesignerDropArea) {
    handleIsComponentOverDesignerDropArea({
      draggedElement,
      droppedArea,
      elements,
      addElement,
      removeElement,
    });
  }
}

function handleIsSidebarComponentDroppingOverDesignerDropArea({
  draggedElement,
  elements,
  addElement,
}: {
  draggedElement: DraggedElement;
  elements: BlockComponentDto[];
  addElement: (index: number, element: BlockComponentDto) => void;
}) {
  const sidebarComponent = draggedElement?.component as ComponentDto;
  const newElement = {
    ...sidebarComponent,
    code: crypto.randomUUID(),
    component: sidebarComponent,
    block: {
      id: 0,
      title: "deneme block",
      type_id: 1,
    },
    depth: 0,
    hasChildren: sidebarComponent.props.find((prop) => prop.key === "children")
      ? true
      : false,
    children: sidebarComponent.props.find((prop) => prop.key === "children")
      ? []
      : undefined,
    props: sidebarComponent.props.map((prop) => ({
      prop: {
        ...prop,
        type_id: prop.type.id,
      },
      value: "",
    })),
    order: elements.length,
    belong_block_component_code: null,
  };

  addElement(elements.length, newElement);
  return;
}

function handleIsSidebarComponentDroppingOverComponent({
  draggedElement,
  droppedArea,
  elements,
  addElement,
}: {
  draggedElement: DraggedElement;
  droppedArea: DroppedArea;
  elements: BlockComponentDto[];
  addElement: (index: number, element: BlockComponentDto) => void;
}) {
  console.log("2");
  const sidebarComponent = draggedElement?.component as ComponentDto;
  const overId = droppedArea?.component.code;
  console.log(droppedArea?.component.component.tag.name);
  const overElementIndex = elements.findIndex((el) => el.code === overId);
  if (overElementIndex === -1) {
    throw new Error("element not found");
  }

  let indexForNewElement = overElementIndex; // i assume i'm on top-half
  if (droppedArea?.isBottomHalf) {
    indexForNewElement = overElementIndex + 1;
  }
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
    hasChildren: sidebarComponent.props.find((prop) => prop.key === "children")
      ? true
      : false,
    children: sidebarComponent.props.find((prop) => prop.key === "children")
      ? []
      : undefined,
    props: sidebarComponent.props.map((prop) => ({
      prop: {
        ...prop,
        type_id: prop.type.id,
      },
      value: "",
    })),
    depth: droppedArea?.component.depth, // BURASI ÜSTTEKİNDEN FARKLI
    order: indexForNewElement,
    belong_block_component_code:
      droppedArea?.component.belong_block_component_code,
  };

  addElement(indexForNewElement, newElement);
  return;
}

function handleIsSidebarComponentInComponent({
  draggedElement,
  droppedArea,
  elements,
  addElement,
}: {
  draggedElement: DraggedElement;
  droppedArea: DroppedArea;
  elements: BlockComponentDto[];
  addElement: (index: number, element: BlockComponentDto) => void;
}) {
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
    hasChildren: sidebarComponent.props.find((prop) => prop.key === "children")
      ? true
      : false,
    children: sidebarComponent.props.find((prop) => prop.key === "children")
      ? []
      : undefined,
    props: sidebarComponent.props.map((prop) => ({
      prop: {
        ...prop,
        type_id: prop.type.id,
      },
      value: "",
    })),
    depth: droppedArea?.component.depth + 1,
    order: 0,
    belong_block_component_code: droppedArea?.component.code,
  };

  addElement(0, newElement);

  return;
}

function handleIsComponentOverComponent({
  draggedElement,
  droppedArea,
  elements,
  addElement,
  removeElement,
}: {
  draggedElement: DraggedElement;
  droppedArea: DroppedArea;
  elements: BlockComponentDto[];
  addElement: (index: number, element: BlockComponentDto) => void;
  removeElement: (code: string) => void;
}) {
  console.log("4");
  if (!("code" in draggedElement?.component)) {
    throw new Error("dragged element is not component");
  }
  const activeCode = draggedElement?.component?.code;
  const overId = droppedArea?.component.code;
  const activeElementIndex = elements.findIndex((el) => el.code === activeCode);
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
}

function handleIsComponentOverDesignerDropArea({
  draggedElement,
  droppedArea,
  elements,
  addElement,
  removeElement,
}: {
  draggedElement: DraggedElement;
  droppedArea: DroppedArea;
  elements: BlockComponentDto[];
  addElement: (index: number, element: BlockComponentDto) => void;
  removeElement: (code: string) => void;
}) {
  console.log("5");
  if (!("code" in draggedElement?.component)) {
    throw new Error("dragged element is not component");
  }
  const activeCode = draggedElement?.component.code;
  const activeElementIndex = elements.findIndex((el) => el.code === activeCode);
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
