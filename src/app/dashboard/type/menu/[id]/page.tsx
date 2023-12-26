"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/langs";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { useRouter } from "next/navigation";
import MenuList from "../../menu-list";
import {
  getMenu,
  getMenuByTypeId,
  getMenuItems,
  updateMenu,
} from "@/services/dashboard";
import { MenuDto } from "@/services/dto/menu.dto";
import { useEffect, useState } from "react";

export default function MenuType({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data, error: isError } = useQuery<MenuDto[]>(
    ["menu_type", id],
    () => getMenuByTypeId(Number(id)),
    { enabled: !!id }
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (data: { id: number; data: Partial<MenuDto> }) =>
      updateMenu({ id: data.id, data: data.data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menu_type", id]);
        console.log("updateMutation");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const router = useRouter();
  const { translate } = useTranslate();

  const handleUpdate = (id: UniqueIdentifier, parentId: UniqueIdentifier) => {
    console.log("efsfsfsdffsfewfwfdfd on update", id, parentId);
    const item = data?.find((menu) => menu.title === id);
    const parentItem = data?.find((menu) => menu.title === parentId);
    console.log(item, parentItem);
    if (!item || !parentItem) return;

    updateMutation.mutate({
      id: item.id,
      data: {
        menu_belong_id: parentItem.id,
      },
    });
  };

  const handleRemove = (id: UniqueIdentifier) => {};

  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate("menu")}</h3>
        <div>
          <Button asChild>
            <Link href={"/menu/ekle"}>
              <PlusCircledIcon className="w-4 h-4 mr-2" />
              Yeni {translate("menu")} ekle
            </Link>
          </Button>
        </div>
      </div>

      <Card className="min-h-[700px]">
        <CardContent>
          {mounted && (
            <div className="py-10">
              {data && data?.length > 0 ? (
                <MenuList
                  data={data}
                  handleUpdate={handleUpdate}
                  onRemove={handleRemove}
                />
              ) : (
                <div>
                  Menü yok,{" "}
                  <Link href={"/menu/ekle"}>
                    yeni menü eklemek için tıklayınız.
                  </Link>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
