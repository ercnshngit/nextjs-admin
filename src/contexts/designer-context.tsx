"use client";
import { BlockDto } from "@/services/dto/block.dto";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useContext } from "react";

type DesignerContextType = {
  elements: BlockComponentDto[];
  setElements: Dispatch<SetStateAction<BlockComponentDto[]>>;
  addElement: (index: number, element: BlockComponentDto) => void;
  removeElement: (code: string) => void;
  mode: "ui" | "html" | "preview";
  setMode: Dispatch<SetStateAction<"ui" | "html" | "preview">>;
  selectedElement: BlockComponentDto | null;
  setSelectedElement: Dispatch<SetStateAction<BlockComponentDto | null>>;
  block: BlockDto | null;
  setBlock: Dispatch<SetStateAction<BlockDto | null>>;
  updateElement: (code: string, element: BlockComponentDto) => void;
  updateBlockData: BlockDto;
  setUpdateBlockData: Dispatch<SetStateAction<BlockDto>>;
  dragdrop: boolean;
  setDragdrop: Dispatch<SetStateAction<boolean>>;
};

type DesignerContextDeactiveType = {
  elements: null;
  setElements: null;
  addElement: null;
  removeElement: null;
  mode: null;
  setMode: null;
  selectedElement: null;
  setSelectedElement: null;
  block: null;
  setBlock: null;
  updateElement: null;
  updateBlockData: null;
  setUpdateBlockData: null;
  dragdrop: null;
  setDragdrop: null;
};

export const DesignerContext = createContext<
  | ({ contextActive: true } & DesignerContextType)
  | ({ contextActive: false } & DesignerContextDeactiveType)
  | null
>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<BlockComponentDto[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<BlockComponentDto | null>(null);
  const [mode, setMode] = useState<"html" | "preview" | "ui">("ui");
  const [dragdrop, setDragdrop] = useState(true);
  const [block, setBlock] = useState<BlockDto | null>(null);
  const [updateBlockData, setUpdateBlockData] = useState<BlockDto>({
    id: 0,
    title: "İsimsiz",
    type_id: 0,
    description: "",
    image_url: "",
    background_image_url: "",
    slug: "",
    status: 0,
  });

  const addElement = (index: number, element: BlockComponentDto) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (code: string) => {
    setElements((prev) => prev.filter((element) => element.code !== code));
  };

  const updateElement = (code: string, element: BlockComponentDto) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.code === code);
      newElements[index] = element;
      return newElements;
    });

    setSelectedElement(element);
  };

  return (
    <DesignerContext.Provider
      value={{
        contextActive: true,
        updateBlockData,
        setUpdateBlockData,
        elements,
        setElements,
        addElement,
        removeElement,
        mode,
        setMode,
        selectedElement,
        setSelectedElement,
        block,
        setBlock,
        updateElement,
        dragdrop,
        setDragdrop,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}

export function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    return {
      contextActive: false,
      updateBlockData: null,
      setUpdateBlockData: null,
      elements: null,
      setElements: null,
      addElement: null,
      removeElement: null,
      mode: null,
      setMode: null,
      selectedElement: null,
      setSelectedElement: null,
      block: null,
      setBlock: null,
      updateElement: null,
      dragdrop: null,
      setDragdrop: null,
    };
  }

  return context;
}
