"use client";
import { Button } from "@/components/ui/button";
import { useDesigner } from "@/contexts/designer-context";
import { BlockComponentDto } from "@/services/dto/block_component.dto";
import dynamic from "next/dynamic";
import { memo, useMemo, useState, useEffect } from "react";

function Component({
  component,
  children,
  ...rest
}: {
  component: BlockComponentDto;
  children?: any;
  [key: string]: any;
}) {
  const [isError, setIsError] = useState(false);
  const [components, setComponents] = useState<{
    [key: string]: React.ComponentType;
  }>({});

  useEffect(() => {
    if (!components[component.component.tag.name]) {
      (async () => {
        try {
          const componentModule = await import(
            "../components/tags/" + component.component.tag.name
          ).catch((e) => {
            console.error("Error loading component:", e);
            setIsError(true);
            return ErrorComponent;
          });

          setComponents((prevComponents) => ({
            ...prevComponents,
            [component.component.tag.name]: componentModule.default,
          }));
        } catch (error) {
          console.error("Error loading component:", error);
          setIsError(true);
        }
      })();
    }
  }, [component.component.tag.name, components]);

  if (isError) return <ErrorComponent component={component} />;
  if (!components[component.component.tag.name]) return null;
  const DynamicComponent = components[component.component.tag.name];
  if (children) {
    // @ts-ignore
    return <DynamicComponent {...rest}>{children}</DynamicComponent>;
  }

  return <DynamicComponent {...rest} />;
}

const Memo = memo(Component);

export { Memo as Component };

// ... rest of your code

// ... rest of your code

const ErrorComponent = ({
  component,
}: {
  component?: BlockComponentDto;
  [key: string]: any;
}) => {
  const { removeElement } = useDesigner();

  return (
    <div className="text-center text-red-400 bg-red-100">
      {component?.component.tag.name}
      <p className="text-red-400">Desteklenmeyen bileşen lütfen silin</p>
      <Button
        variant={"destructive"}
        size={"sm"}
        onClick={(e) => {
          e.stopPropagation();
          if (component) removeElement && removeElement(component.code);
        }}
      >
        Sil
      </Button>
      <div className="w-full border-b border-red-400"></div>
      {component?.children?.map((child) => {
        return <ErrorComponent key={component.code} component={component} />;
      })}
    </div>
  );
};
ErrorComponent.displayName = "ErrorComponent";
