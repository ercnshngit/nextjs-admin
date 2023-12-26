import React from "react";
import { BlockComponentDto } from "./types";
import { createTree } from "./utils/tree-operations";
import { componentTags } from "./utils/component-tags";

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
  const elementTree = createTree(blocks);

  const renderPreview = (component: BlockComponentDto) => {
    const Component = componentTags[component.component.tag.name];

    return (
      <Component
        {...Object.fromEntries(
          component.props.map((prop) => [prop.prop.key, prop.value]),
        )}
        key={component.code}
        id={component.code}
      >
        {component.children?.map((child) => {
          if (child.component.tag.name in componentTags) {
            renderPreview(child);
          }
          console.log(JSON.stringify);
        })}
      </Component>
    );
  };

  return (
    <div>
      {elementTree.map((component) => {
        if (component.component.tag.name in componentTags) {
          return renderPreview(component);
        }
        console.log(JSON.stringify(component));
      })}
    </div>
  );
}
