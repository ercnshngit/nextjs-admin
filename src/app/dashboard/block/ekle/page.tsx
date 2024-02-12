"use client";
import BlockBuilder from "@/components/block-builder";
import { Button } from "@/components/ui/button";
import { useDesigner } from "@/contexts/designer-context";
import useSearchParams from "@/hooks/use-search-params";
import { cn } from "@/libs/utils";
import { createComponentsInBlock } from "@/services/dashboard";
import { CreateBlockComponentsDto } from "@/services/dto/block_component.dto";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeftCircleIcon, FullscreenIcon, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BuilderPage() {
  const { elements, setElements, setBlock, updateBlockData } = useDesigner();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createBlocks = useMutation(
    (data: CreateBlockComponentsDto) => createComponentsInBlock({ data: data }),
    {
      onSuccess: async (data) => {
        console.log(JSON.stringify(data));
        toast.success("Blok başarıyla güncellendi");
        const route =
          "/dashboard/block" + searchParams.createSearchParamsForUrl();
        router.push(route);
      },
    }
  );

  const [fullscreen, setFullscreen] = useState(false);

  const handleSave = async () => {
    const data: CreateBlockComponentsDto = {
      block: {
        ...updateBlockData,
      },
      block_components: elements
        .filter((e) => {
          if (e.belong_block_component_code === null) return true;
          return elements.find(
            (el) => el.code === e.belong_block_component_code
          );
        })
        .map((el) => ({
          ...el,
        })),
    };

    await createBlocks.mutate(data);
  };

  return (
    <div
      className={cn(
        " flex w-full flex-col  bg-gray-700",
        fullscreen && "absolute right-0 left-0 top-0 h-auto"
      )}
    >
      <div className="bg-gray-900">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-6">
            <Button onClick={() => router.back()} variant="secondary">
              <ArrowLeftCircleIcon className="h-5 w-5" />
            </Button>
            <div className="">
              <h1 className="border-none bg-transparent text-lg font-bold text-white">
                Yeni Blok
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setFullscreen((prev) => !prev)}
              variant="secondary"
            >
              <FullscreenIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-white">Kaydet</div>
            <Button onClick={handleSave} variant="secondary">
              <Save className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <BlockBuilder dragDrop={true} />
    </div>
  );
}
