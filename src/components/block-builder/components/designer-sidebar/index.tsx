import { Button } from "@/components/ui/button";
import { useDesigner } from "@/contexts/designer-context";
import { ComponentDto } from "@/services/dto/component.dto";
import React from "react";
import SidebarComponent from "../sidebar-component";
import { useQuery } from "@tanstack/react-query";
import { getComponents } from "@/services/dashboard";
import FormInputFactory from "@/components/base-form/form-input-factory";
import SidebarInputFactory from "../sidebar-input-factory";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DesignerSidebar() {
  const { data: sidebarComponents } = useQuery<ComponentDto[]>(
    ["components"],
    () => getComponents()
  );
  const { elements, selectedElement, mode, setMode, updateElement } =
    useDesigner();

  return (
    <div className="bg-white px-4 py-10 h-full min-w-[300px] min-h-screen">
      <div className="flex mb-2 items-center space-x-2">
        <Switch
          id="preview-mode"
          checked={mode === "preview"}
          onChange={() => setMode(mode === "preview" ? "ui" : "preview")}
        />
        <Label htmlFor="preview-mode">Preview Mode</Label>
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
                blockComponent={selectedElement}
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
