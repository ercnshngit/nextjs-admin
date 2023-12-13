import { Button } from "@/components/ui/button";
import { useDesigner } from "@/contexts/designer-context";
import { ComponentDto } from "@/services/dto/component.dto";
import React from "react";
import SidebarComponent from "../sidebar-component";
import { useQuery } from "@tanstack/react-query";
import { getComponents } from "@/services/dashboard";

export default function DesignerSidebar({ onSave }: { onSave: () => void }) {
  const { data: sidebarComponents } = useQuery<ComponentDto[]>(
    ["components"],
    () => getComponents()
  );
  const { elements, selectedElement, mode, setMode, updateElement } =
    useDesigner();

  const saveElements = () => {
    onSave();
  };
  return (
    <div className="bg-white px-4 py-10 h-full min-w-[300px]">
      <div>
        <Button onClick={saveElements}>Gönder</Button>
      </div>
      <div className="flex items-center mb-6 justify-between  w-full space-x-2">
        <Button
          onClick={() => setMode("ui")}
          variant={mode === "ui" ? "default" : "secondary"}
        >
          Tasarım
        </Button>
        <Button
          onClick={() => setMode("preview")}
          variant={mode === "preview" ? "default" : "secondary"}
        >
          Önizleme
        </Button>
        <Button
          onClick={() => setMode("html")}
          variant={mode === "html" ? "default" : "secondary"}
        >
          HTML
        </Button>
      </div>
      {selectedElement && (
        <div className="flex flex-col w-full  gap-2">
          <h1 className="text-2xl font-bold">Properties</h1>

          {selectedElement.props.map((prop) => {
            if (prop.prop.key === "children") {
              return <div key={prop.prop.key}>.</div>;
            }
            return (
              <div key={prop.prop.key} className="flex w-full  flex-col gap-2">
                <label htmlFor={prop.prop.key}>{prop.prop.key}</label>
                <input
                  className="rounded-md border w-full border-gray-300 p-2"
                  type="text"
                  id={prop.prop.key}
                  value={prop.value}
                  onChange={(e) => {
                    updateElement(selectedElement.code, {
                      ...selectedElement,
                      props: selectedElement.props.map((p) => {
                        if (p.prop.key === prop.prop.key) {
                          return {
                            ...p,
                            value: e.target.value,
                          };
                        }
                        return p;
                      }),
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {!selectedElement &&
          sidebarComponents?.map((component) => {
            return (
              <SidebarComponent component={component} key={component.id} />
            );
          })}
      </div>
    </div>
  );
}
