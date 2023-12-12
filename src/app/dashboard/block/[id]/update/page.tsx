"use client";
import BlockBuilder from "@/components/block-builder";
import {
  DesignerContextProvider,
  useDesigner,
} from "@/contexts/designer-context";
import { createComponentsInBlock, getComponents } from "@/services/dashboard";
import { CreateBlockComponentsDto } from "@/services/dto/block_component.dto";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

export default function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { data: sidebarComponents } = useQuery(["components"], () =>
    getComponents()
  );

  const { elements } = useDesigner();

  const createBlocks = useMutation(
    (data: CreateBlockComponentsDto) => createComponentsInBlock({ data: data }),
    {
      onSuccess: async () => {},
    }
  );

  const handleSave = async () => {
    const data: CreateBlockComponentsDto = {
      block_components: elements.map((el) => ({
        component: {
          id: el.component.id,
          name: el.component.name,
          type_id: el.component.types.id,
          icon: el.component.icon,
          tag_id: el.component.tag.id,
          tag: {
            id: el.component.tag.id,
            name: el.component.tag.name,
          },
          types: {
            id: el.component.types.id,
            name: el.component.types.name,
          },
          component_prop: el.component.component_prop,
        },
        block: {
          id: Number(params.id),
          title: "Deneme sdfdsfdsfSayfa",
          type_id: 10,
        },
        belong_block_component_code: el.belong_block_component_code
          ? el.belong_block_component_code
          : null,
        depth: el.depth,
        order: el.order,
        code: el.code,
        hasChildren: el.hasChildren,
        props: el.props.map((prop) => ({
          prop: {
            id: prop.prop.id,
            key: prop.prop.key,
            type_id: prop.prop.type_id,
          },
          value: prop.value,
        })),
      })),
    };

    await createBlocks.mutate(data);
  };

  return (
    <BlockBuilder sidebarComponents={sidebarComponents} onSave={handleSave} />
  );
}
