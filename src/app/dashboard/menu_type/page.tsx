"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/langs";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import Loading from "@/components/loading";
import { getTableItem } from "@/services/common-table-api";
import { changeMenuOrder, getMenuByTypeId } from "@/services/menu";
import { MENU_ITEM } from "@/types/menus";
import { menu } from "@prisma/client";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import useSearchParams from "@/hooks/use-search-params";

export default function MenuType() {
  const searchParams = useSearchParams();

  const id = searchParams.getQueryString("type_id") || 0;
  const { data: menu_type, error: isError } = useQuery<menu, Error>(
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
    () => getMenuByTypeId({ typeId: menuTypeId })
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
