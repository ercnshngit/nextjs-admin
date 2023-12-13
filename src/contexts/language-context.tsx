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

type LanguageContextType = {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageContextProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>("tr");
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageContext");
  }

  return context;
}
