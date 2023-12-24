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
  updateBlockData: Partial<BlockDto> | null;
  setUpdateBlockData: Dispatch<SetStateAction<Partial<BlockDto> | null>>;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<BlockComponentDto[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<BlockComponentDto | null>(null);
  const [mode, setMode] = useState<"html" | "preview" | "ui">("ui");
  const [block, setBlock] = useState<BlockDto | null>(null);
  const [updateBlockData, setUpdateBlockData] =
    useState<Partial<BlockDto> | null>(null);

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
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}

export function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner must be used within a DesignerContext");
  }

  return context;
}
