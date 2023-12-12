"use client";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { PageComponent } from "@/types/page-component";
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
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  selectedElement: BlockComponentDto | null;
  setSelectedElement: Dispatch<SetStateAction<BlockComponentDto | null>>;

  updateElement: (code: string, element: BlockComponentDto) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<BlockComponentDto[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<BlockComponentDto | null>(null);
  const [isPreview, setIsPreview] = useState(false);

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
        elements,
        setElements,
        addElement,
        removeElement,
        isPreview,
        setIsPreview,
        selectedElement,
        setSelectedElement,

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
