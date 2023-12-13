import axiosClient from "@/libs/axios";
import { CREATE_MENU_ITEM, UPDATE_MENU_ITEM } from "@/types/menus";

export const getMenu = async () => {
  const { data } = await axiosClient.get("/menu/get/all");
  return data;
};

export const deleteMenu = async (id: number) => {
  const { data } = await axiosClient.delete(`/menu/delete/${id}`);
  return data;
};

export const createMenu = async (data: CREATE_MENU_ITEM) => {
  const { data: responseData } = await axiosClient.post("/menu/create", data);
  return responseData;
};

export const updateMenu = async ({ id, data }: UPDATE_MENU_ITEM) => {
  const { data: responseData } = await axiosClient.post(
    "/menu/set/" + id,
    data
  );
  return responseData;
};

export const getMenuItems = async ({
  slug,
  lang,
}: {
  slug: string;
  lang: "TR" | "EN";
}) => {
  const { data } = await axiosClient.get(`/menu/get/allwith/${slug}/${lang}`);
  return data;
};