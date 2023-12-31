"use client";
import BlockBuilder from "@/components/block-builder";
import { Button } from "@/components/ui/button";
import {
  DesignerContextProvider,
  useDesigner,
} from "@/contexts/designer-context";
import { cn } from "@/libs/utils";
import {
  createComponentsInBlock,
  getBlock,
  getBlockComponents,
  getComponents,
  updateBlock,
} from "@/services/dashboard";
import { BlockDto } from "@/services/dto/block.dto";
import { CreateBlockComponentsDto } from "@/services/dto/block_component.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftCircleIcon, FullscreenIcon, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { elements, setElements, setBlock, updateBlockData } = useDesigner();
  const router = useRouter();
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

  const updateBlockMutation = useMutation(
    () => updateBlock(Number(params.id), updateBlockData),
    {
      onSuccess: async (data) => {
        console.log(JSON.stringify(data));
        toast.success("Blok başarıyla güncellendi");
        await queryClient.invalidateQueries(["block", params.id]);
      },
    }
  );

  const { data: block } = useQuery(["block", params.id], () =>
    getBlock({
      id: Number(params.id),
    })
  );

  const [blockName, setBlockName] = useState(block?.title || "");
  const [fullscreen, setFullscreen] = useState(false);

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
            title: blockName,
            type_id: block.type_id,
          },
        })),
    };

    await createBlocks.mutate(data);
    await updateBlockMutation.mutate();
  };

  useEffect(() => {
    const newBlock = block || null;
    setBlock(newBlock);
  }, [block]);

  return (
    <div
      className={cn(
        " flex flex-col w-full h-full  bg-gray-700",
        fullscreen && "absolute inset-0"
      )}
    >
      <div className="bg-gray-900">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-6">
            <Button onClick={() => router.back()} variant="secondary">
              <ArrowLeftCircleIcon className="w-5 h-5" />
            </Button>
            <div className="">
              <h1 className="text-lg font-bold text-white bg-transparent border-none">
                {blockName}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setFullscreen((prev) => !prev)}
              variant="secondary"
            >
              <FullscreenIcon className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-white">Kaydet</div>
            <Button onClick={handleSave} variant="secondary">
              <Save className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <BlockBuilder />
    </div>
  );
}
