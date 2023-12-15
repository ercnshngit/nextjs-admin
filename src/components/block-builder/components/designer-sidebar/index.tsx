import { Button } from "@/components/ui/button";
import { useDesigner } from "@/contexts/designer-context";
import { ComponentDto } from "@/services/dto/component.dto";
import React from "react";
import SidebarComponent from "../sidebar-component";
import { useQuery } from "@tanstack/react-query";
import { getComponents } from "@/services/dashboard";
import FormInputFactory from "@/components/base-form/form-input-factory";
import SidebarInputFactory from "../sidebar-input-factory";

export default function DesignerSidebar() {
  const { data: sidebarComponents } = useQuery<ComponentDto[]>(
    ["components"],
    () => getComponents()
  );
  const { elements, selectedElement, mode, setMode, updateElement } =
    useDesigner();

  return (
    <div className="bg-white px-4 py-10 h-full min-w-[300px] min-h-screen">
      <div className="flex items-center justify-between w-full mb-6 space-x-2">
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
        {/* <Button
          onClick={() => setMode("html")}
          variant={mode === "html" ? "default" : "secondary"}
        >
          HTML
        </Button> */}
      </div>
      {selectedElement && (
        <div className="flex flex-col w-full gap-2">
          <h1 className="text-2xl font-bold">Properties</h1>

          {selectedElement.props.map((prop) => {
            if (prop.prop.key === "children") {
              return <div key={prop.prop.key}>.</div>;
            }
            return (
              <SidebarInputFactory
                key={prop.prop.key}
                blockComponentProp={prop}
                setValue={(value: string) =>
                  updateElement(selectedElement.code, {
                    ...selectedElement,
                    props: selectedElement.props.map((p) => {
                      if (p.prop.key === prop.prop.key) {
                        return {
                          ...p,
                          value: value,
                        };
                      }
                      return p;
                    }),
                  })
                }
                value={prop.value}
              />
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
