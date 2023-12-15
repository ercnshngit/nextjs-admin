"use client";
import BlockBuilder from "@/components/block-builder";
import {
  DesignerContextProvider,
  useDesigner,
} from "@/contexts/designer-context";
import {
  createComponentsInBlock,
  getBlock,
  getBlockComponents,
  getComponents,
} from "@/services/dashboard";
import { CreateBlockComponentsDto } from "@/services/dto/block_component.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { elements, setElements } = useDesigner();

  const { data: block_components } = useQuery(
    ["block_components", params.id],
    () => getBlockComponents(Number(params.id))
  );

  useEffect(() => {
    if (!block_components) return;

    setElements(block_components);
  }, [block_components]);

  const queryClient = useQueryClient();

  const createBlocks = useMutation(
    (data: CreateBlockComponentsDto) => createComponentsInBlock({ data: data }),
    {
      onSuccess: async (data) => {
        console.log(JSON.stringify(data));
        toast.success("Blok başarıyla güncellendi");
        await queryClient.invalidateQueries(["block_components", params.id]);
      },
    }
  );

  const { data: block } = useQuery(["block", params.id], () =>
    getBlock({
      id: Number(params.id),
    })
  );

  const handleSave = async () => {
    if (!block) {
      toast.error("Blok bulunamadı");
      return;
    }

    const data: CreateBlockComponentsDto = {
      block_id: Number(params.id),
      block_components: elements
        .filter((e) => {
          if (e.belong_block_component_code === null) return true;
          return elements.find(
            (el) => el.code === e.belong_block_component_code
          );
        })
        .map((el) => ({
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
