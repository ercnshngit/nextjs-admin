import { DesignerContextProvider } from "@/contexts/designer-context";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full flex-grow mx-auto bg-gray-200">
      <DesignerContextProvider>{children}</DesignerContextProvider>
    </div>
  );
}

export default layout;
