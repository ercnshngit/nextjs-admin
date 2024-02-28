import React from "react";
import { BlockComponentDto } from "./types";
import { createTree } from "./utils/tree-operations";
import { Component } from "./utils/component-tags";

export default function BlockRenderer({
  components,
}: {
  components: BlockComponentDto[];
}) {
  const elementTree = createTree(components);

  const renderPreview = async (component: BlockComponentDto) => {
    return (
      <Component
        component={component}
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
    <>
      {elementTree.map((component) => {
        return renderPreview(component);
      })}
    </>
  );
}
