import dynamic from "next/dynamic";
import { useMemo } from "react";

export function Component({
  name,
  children,
  ...rest
}: {
  name: string;
  children?: any;
  [key: string]: any;
}) {
  const Component = useMemo(() => {
    try {
      return dynamic<any>(() => import("../components/tags/" + name), {
        loading: () => <p>Loading...</p>,
      });
    } catch (error) {
      console.error("Error loading component:", error);
      return null;
    }
  }, [name]);

  if (!Component) return null;
  if (children) return <Component {...rest}>{children}</Component>;

  return <Component {...rest} />;
}
