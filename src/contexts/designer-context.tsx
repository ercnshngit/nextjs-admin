"use client";
import { Component } from "@/types/page-component";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useContext } from "react";

type DesignerContextType = {
  elements: Component[];
  setElements: Dispatch<SetStateAction<Component[]>>;
  addElement: (index: number, element: Component) => void;
  removeElement: (id: number) => void;

  selectedElement: Component | null;
  setSelectedElement: Dispatch<SetStateAction<Component | null>>;

  updateElement: (id: number, element: Component) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<Component[]>([]);
  const [selectedElement, setSelectedElement] = useState<Component | null>(
    null
  );

  const addElement = (index: number, element: Component) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: number) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: number, element: Component) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
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
