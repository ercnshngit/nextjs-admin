import axiosClient from "@/libs/axios";
import { menu } from "@prisma/client";

export const createMenu = async ({ data }: { data: any }) => {
  const res = await axiosClient.post("/menu", data);
  return res;
};

export const deleteMenu = async (id: number) => {
  const { data } = await axiosClient.get(`/menu/delete/${id}`);
  return data;
};

export const updateMenu = async ({ id, data }: { id: number; data: any }) => {
  const { data: responseData } = await axiosClient.post("/menu/" + id, data);
  return responseData;
};

export const changeMenuOrder = async (data: any) => {
  const { data: responseData } = await axiosClient.post(
    "/menu/change-order",
    data
  );
  return responseData;
};

export const getMenuByTypeId = async ({ typeId }: { typeId: number }) => {
  const { data } = await axiosClient.get(`/menu/type/id/${typeId}`);
  return data;
};

interface Menu extends menu {
  submenus: Menu[];
}
export const getMenuByType = async ({ slug }: { slug: string }) => {
  const { data } = await axiosClient.get(`/menu/type/name/${slug}`);
  return data as Menu[];
};
