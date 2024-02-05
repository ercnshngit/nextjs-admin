"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/langs";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { getTableItem } from "@/services/panel";
import { MENU_TYPE } from "@/types/menu_types";
import { MENU_ITEM, UPDATE_MENU_ITEM } from "@/types/menus";
import { useRouter } from "next/navigation";
import MenuList from "../menu-list";
import {
  changeMenuOrder,
  getMenuItems,
  updateMenu,
} from "@/services/dashboard";
import Loading from "@/components/loading";

export default function MenuType({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data: menu_type, error: isError } = useQuery<MENU_TYPE, Error>(
    ["menu_type", id],
    () => getTableItem({ id: Number(id), tableName: "type" }),
    { enabled: !!id }
  );
  if (menu_type) {
    return <Menu menuTypeId={+id} />;
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}

function Menu({ menuTypeId }: { menuTypeId: number }) {
  const { data, error } = useQuery<MENU_ITEM[], Error>(
    ["menus", menuTypeId],
    () => getMenuItems({ typeId: menuTypeId })
  );
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (data: { from: number; to: number }) => {
      return changeMenuOrder(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menus", menuTypeId]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const router = useRouter();
  const { translate } = useTranslate();

  const handleUpdate = (data: { from: number; to: number }) => {
    updateMutation.mutate(data);
  };

  const handleRemove = (id: UniqueIdentifier) => {};

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex justify-between">
        <h3 className="text-lg font-medium">{translate("menu")}</h3>
        <div>
          <Button asChild>
            <Link
              href={{
                pathname: "/dashboard/menu/ekle",
                query: { type_id: menuTypeId },
              }}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Yeni {translate("menu")} ekle
            </Link>
          </Button>
        </div>
      </div>

      <Card className="min-h-[700px]">
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
