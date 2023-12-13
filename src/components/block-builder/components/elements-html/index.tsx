import React, { useState } from "react";
import { transformToDesiredFormat } from "../../utils/jsx-to-json";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { createStringFromTree } from "../../utils/tree-operations";
import { Button } from "@/components/ui/button";
import { getComponents } from "@/services/dashboard";
import { ComponentDto } from "@/services/dto/component.dto";
import { useQuery } from "@tanstack/react-query";

export default function ElementsHtml({
  setElements,
  jsx,
  setJsx,
}: {
  setElements: React.Dispatch<React.SetStateAction<BlockComponentDto[]>>;
  jsx: string;
  setJsx: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [htmlError, setHtmlError] = useState<string | null>(null);
  const { data: sidebarComponents } = useQuery<ComponentDto[]>(
    ["components"],
    () => getComponents()
  );
  function handleApplyHtml() {
    if (jsx === "") return;
    if (!sidebarComponents) return;
    (async () => {
      const jsxElements = await transformToDesiredFormat(
        jsx.replaceAll("\n", ""),
        sidebarComponents
      );
      if (jsxElements.error) {
        console.log("hata", jsxElements.error);
        setHtmlError(jsxElements.error.message);
        return;
      } else {
        setHtmlError(null);
      }
      setElements([...jsxElements]);
      setJsx(createStringFromTree(jsxElements));
    })();
  }
  return (
    <div className="flex flex-col  w-full gap-2 p-4">
      {htmlError && (
        <div className="bg-red-500 p-4 rounded-md text-white">
          {JSON.stringify(htmlError, null, 2)}
        </div>
      )}
      <textarea
        value={jsx}
        onChange={(e) => {
          setJsx(e.target.value);
        }}
        className="rounded-md border w-full border-gray-300 p-2 h-[500px]"
      />
      <Button
        onClick={() => {
          handleApplyHtml();
        }}
        variant="destructive"
      >
        Apply
      </Button>
    </div>
  );
}
