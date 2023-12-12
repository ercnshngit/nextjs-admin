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
      onSuccess: async () => { },
    }
  );

  const handleSave = async () => {
    const data: CreateBlockComponentsDto = {
      block_components: elements.map((el) => ({
        ...el,
        component: {
          ...el.component,
          type_id: el.component.type,
          tag_id: el.component.tag.id,
        },
        block: {
          id: Number(params.id),
          title: "Deneme sdfdsfdsfSayfa",
          type_id: 10,
        },
        belong_block_component_code: el.belong_block_component_code
          ? el.belong_block_component_code
          : null,
      })),
    };

    await createBlocks.mutate(data);
  };

  return (
    <BlockBuilder sidebarComponents={sidebarComponents} onSave={handleSave} />
  );
}
