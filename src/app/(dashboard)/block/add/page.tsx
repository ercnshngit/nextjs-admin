import FormBuilder from "@/components/block-builder";
import { DesignerContextProvider } from "@/contexts/designer-context";
import React from "react";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <DesignerContextProvider>
      <FormBuilder />
    </DesignerContextProvider>
  );
}

export default BuilderPage;
