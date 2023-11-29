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
  removeElement: (id: number) => void;

  selectedElement: PageComponent | null;
  setSelectedElement: Dispatch<SetStateAction<PageComponent | null>>;

  updateElement: (id: number, element: PageComponent) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<PageComponent[]>([]);
  const [selectedElement, setSelectedElement] = useState<PageComponent | null>(
    null
  );

  const addElement = (index: number, element: PageComponent) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: number) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: number, element: PageComponent) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
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
