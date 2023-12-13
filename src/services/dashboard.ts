import axiosClient from "@/libs/axios";
import { BlockDto } from "./dto/block.dto";
import { MenuDto } from "./dto/menu.dto";

export const getTablesStructure = async () => {
  const { data } = await axiosClient.get("/table");
  return data;
};

export const getTablesConfigs = async () => {
  const { data } = await axiosClient.get("/config");
  return data;
};

export const getTableInputTypes = async () => {
  const { data } = await axiosClient.get("/type/input-type");
  return data;
};

export const getComponents = async () => {
  const { data } = await axiosClient.get("/component");
  return data;
};

export const createComponentsInBlock = async ({ data }: any) => {
  const res = await axiosClient.post("/block/component", data);
  return res;
};

export const createTableConfig = async ({
  table_name,
}: {
  table_name: string;
}) => {
  const { data } = await axiosClient.get(`/table/${table_name}/config/create`);
  return data;
};

export const updateTableConfig = async ({
  table_name,
  data,
}: {
  table_name: string;
  data: any;
}) => {
  const res = await axiosClient.post(`/table/${table_name}/config`, data);
  return res;
};

export const getTableWhere = async ({
  tableName,
  where,
}: {
  tableName: string;
  where: { key: string; value: string | number }[];
}) => {
  const { data } = await axiosClient.post(
    "/table/" + tableName + "/where",
    where
  );
  return data;
};

export const getBlock = async ({ id }: { id: number }) => {
  const { data } = await axiosClient.get(`/block/${id}`);
  return data as BlockDto;
};

export const getMenus = async () => {
  const { data } = await axiosClient.get("/menu");
  return data;
};

export const createMenu = async (data: MenuDto) => {
  const res = await axiosClient.post("/menu", data);
  return res;
};

export const deleteMenu = async ({ id }: { id: number }) => {
  const res = await axiosClient.get(`/menu/delete/${id}`);
  return res;
};

export const getMenuById = async ({ id }: { id: number }) => {
  const { data } = await axiosClient.get(`/menu/get/byid/${id}`);
  return data;
};

export const updateMenu = async ({ id, data }: { id: number; data: MenuDto }) => {
  const res = await axiosClient.post(`/menu/get/byid/${id}`, data);
  return res;
}

export const getMenuBySlug = async ({ slug }: { slug: string }) => {
  const { data } = await axiosClient.get(`/menu/get/byslug/${slug}`);
  return data;
}

export const getMenusByType = async ({ type_id }: { type_id: number }) => {
  const { data } = await axiosClient.get(`/menu/type/${type_id}`);
  return data;
};

export const getMenuByTypeAndId = async ({
  type_id,
  id,
}: {
  type_id: number;
  id: number;
}) => {
  const { data } = await axiosClient.get(`/menu/type/${type_id}/get/byid/${id}`);
  return data;
};

export const getMenuByTypeAndSlug = async ({
  type_id,
  slug,
}: {
  type_id: number;
  slug: string;
}) => {
  const { data } = await axiosClient.get(
    `/menu/type/${type_id}/get/byslug/${slug}`
  );
  return data;
};


