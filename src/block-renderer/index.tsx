import React from "react";
import { BlockComponentDto } from "./types";
import { createTree } from "./utils/tree-operations";
import { getComponent } from "./utils/component-tags";

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
  const elementTree = createTree(blocks);

  const renderPreview = async (component: BlockComponentDto) => {
    const Component = await getComponent(component.component.tag.name);

    return (
      <Component
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value])
        )}
        key={component.code}
        id={component.code}
      >
        {component.children?.map((child) => {
          renderPreview(child);
        })}
      </Component>
    );
  };

  return (
    <div>
      {elementTree.map((component) => {
        return renderPreview(component);
      })}
    </div>
  );
}