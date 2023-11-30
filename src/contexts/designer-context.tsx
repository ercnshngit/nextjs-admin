"use client";
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
  elements: PageComponent[];
  setElements: Dispatch<SetStateAction<PageComponent[]>>;
  addElement: (index: number, element: PageComponent) => void;
  removeElement: (code: string) => void;
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  selectedElement: PageComponent | null;
  setSelectedElement: Dispatch<SetStateAction<PageComponent | null>>;

  updateElement: (code: string, element: PageComponent) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<PageComponent[]>([]);
  const [selectedElement, setSelectedElement] = useState<PageComponent | null>(
    null
  );
  const [isPreview, setIsPreview] = useState(false);

  const addElement = (index: number, element: PageComponent) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (code: string) => {
    setElements((prev) => prev.filter((element) => element.code !== code));
  };

  const updateElement = (code: string, element: PageComponent) => {
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
