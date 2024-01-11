"use client";
import ListPage from "@/components/list-page";
import { Button } from "@/components/ui/button";
import { createComponentsFromFolder } from "@/services/dashboard";
import { getTable } from "@/services/panel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function BlockListPage() {
  const { data, error } = useQuery(["component"], () =>
    getTable({ tableName: "component" })
  );
  const queryClient = useQueryClient();
  const createComponentsMutation = useMutation(
    () => createComponentsFromFolder(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["component"]);
      },
    }
  );
  const button = (
    <Button type="button" onClick={() => createComponentsMutation.mutate()}>
      Component oluştur
    </Button>
  );

  return <ListPage slug="component" data={data} headerButtonSlot={button} />;
}
