import dynamic from "next/dynamic";
import { memo, useCallback, useMemo, useState } from "react";
import { useDesigner } from "@/contexts/designer-context";
import { Button } from "@/components/ui/button";
import { BlockComponentDto } from "@/services/dto/block_component.dto";

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
  const Component = useMemo(() => {
    try {
      return dynamic<any>(
        () =>
          import("../components/tags/" + component.component.tag.name).catch(
            (e) => {
              console.error("Error loading component:", e);
              setIsError(true);
              return ErrorComponent;
            }
          ),
        {
          loading: () => <p>Loading..</p>,
        }
      );
    } catch (error) {
      console.error("Error loading component:", error);
      setIsError(true);
      return ErrorComponent;
    }
  }, [component.component.tag.name]);

  if (isError) return <ErrorComponent component={component} />;
  if (children) return <Component {...rest}>{children}</Component>;

  return <Component {...rest} />;
}
const Memo = memo(Component);

export { Memo as Component };

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
          if (component) removeElement(component.code);
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
