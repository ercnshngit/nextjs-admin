"use client";
import BlockBuilder from "@/components/block-builder";
import {
  DesignerContextProvider,
  useDesigner,
} from "@/contexts/designer-context";
import {
  createComponentsInBlock,
  getBlock,
  getComponents,
} from "@/services/dashboard";
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
  const { elements } = useDesigner();

  const createBlocks = useMutation(
    (data: CreateBlockComponentsDto) => createComponentsInBlock({ data: data }),
    {
      onSuccess: async () => {},
    }
  );

  const { data: block } = useQuery(["block", params.id], () =>
    getBlock({
      id: Number(params.id),
    })
  );

  const handleSave = async () => {
    if (!block) return;
    const data: CreateBlockComponentsDto = {
      block_components: elements.map((el) => ({
        ...el,
        block: {
          id: Number(params.id),
          title: block.title,
          type_id: block.type_id,
        },
      })),
    };

    await createBlocks.mutate(data);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <h1 className="font-medium p-2">{block?.title}</h1>
      <BlockBuilder onSave={handleSave} />
    </div>
  );
}
