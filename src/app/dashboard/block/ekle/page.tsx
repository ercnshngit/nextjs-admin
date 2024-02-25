"use client";
import { control } from "@/block-renderer/utils/control-type";
import BlockBuilder from "@/components/block-builder";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDesigner } from "@/contexts/designer-context";
import useSearchParams from "@/hooks/use-search-params";
import { cn } from "@/libs/utils";
import { createComponentsInBlock } from "@/services/dashboard";
import { CreateBlockComponentsDto } from "@/services/dto/block_component.dto";
import { useDataLanguageMutation } from "@/utils/use-data-language";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowLeftCircleIcon,
  FullscreenIcon,
  PlayIcon,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BuilderPage() {
  const { elements, setElements, setBlock, updateBlockData, mode, setMode } =
    useDesigner();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { dataLanguageMutation } = useDataLanguageMutation({
    table_name: "block",
  });

  const createBlocks = useMutation(
    (data: CreateBlockComponentsDto) => createComponentsInBlock({ data: data }),
    {
      onSuccess: async (data) => {
        console.log(JSON.stringify(data));
        dataLanguageMutation.mutate(data);
        toast.success("Blok başarıyla güncellendi");
        const route =
          "/dashboard/block" + searchParams.createSearchParamsForUrl();
        router.push(route);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Blok güncellenirken bir hata oluştu");
      },
    }
  );

  const [fullscreen, setFullscreen] = useState(false);

  const handleSave = async () => {
    const titleCheck = control(updateBlockData.title, "string", false);
    const slugCheck = control(updateBlockData.slug, "string", false);
    const type = control(updateBlockData.type_id, "number", false);

    if (!titleCheck || !slugCheck || !type) {
      toast.error("Blok başlığı, slug ve tipi boş bırakılamaz");
      return;
    }
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
            <Button
              onClick={() =>
                setMode((p) => (p === "preview" ? "ui" : "preview"))
              }
              variant="secondary"
              className={cn(mode === "preview" && "bg-green-500")}
            >
              <PlayIcon
                className={cn("h-5 w-5", mode === "preview" && "stroke-white")}
              />
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
