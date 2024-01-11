import axiosClient from "@/libs/axios";
import { BlockDto } from "./dto/block.dto";
import { MenuDto } from "./dto/menu.dto";
import { CREATE_MENU_ITEM, UPDATE_MENU_ITEM } from "@/types/menus";
import { CreateComponentDto } from "./dto/component.dto";

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

export const getComponentsFromFolder = async () => {
  const { data } = await axiosClient.get("/component/file-system-api");
  return data;
};
export const createComponentsFromFolder = async () => {
  const { data } = await axiosClient.post("/component/file-system-api", {});
  return data;
};

export const createComponentsInBlock = async ({ data }: any) => {
  const res = await axiosClient.post("/block/component", data);
  return res;
};

export const createComponent = async ({
  data,
}: {
  data: CreateComponentDto;
}) => {
  const res = await axiosClient.post("/component", data);
  return res;
};

export const createTableConfig = async ({
  table_name,
}: {
  table_name: string;
}) => {
  const { data } = await axiosClient.get(`/config/create/${table_name}`);
  return data;
};

export const recreateTableConfig = async ({
  table_name,
}: {
  table_name: string;
}) => {
  const { data } = await axiosClient.get(`/config/migrate/${table_name}`);
  return data;
};

export const deleteTableConfig = async ({
  table_name,
}: {
  table_name: string;
}) => {
  const { data } = await axiosClient.get(`/config/delete/${table_name}`);
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

export const getTableConfig = async ({
  table_name,
}: {
  table_name: string;
}) => {
  const { data } = await axiosClient.get(`/table/${table_name}/config`);
  return data;
};

export const getTable = async ({ tableName }: { tableName: string }) => {
  const { data } = await axiosClient.get("/table/" + tableName);
  return data;
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

export const getTranslations = async () => {
  const { data } = await axiosClient.get(`/table/translation`);

  return data;
};

export const getTranslation = async (key: string) => {
  const { data } = await axiosClient.get(`/table/translation/${key}`);

  return data;
};
export const getBlockComponents = async (id: number) => {
  const { data } = await axiosClient.get(`/block/component/get/${id}`);

  return data;
};

export const getTypes = async (table_name: string) => {
  const { data } = await axiosClient.get(`/type/get/table-name/${table_name}`);

  return data;
};

export const getMenu = async () => {
  const { data } = await axiosClient.get("/menu/get/all");
  return data;
};

export const deleteMenu = async (id: number) => {
  const { data } = await axiosClient.delete(`/menu/delete/${id}`);
  return data;
};

export const createMenu = async (data: { id: number; data: any }) => {
  const { data: responseData } = await axiosClient.post("/menu/create", data);
  return responseData;
};

export const updateMenu = async ({ id, data }: { id: number; data: any }) => {
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

export const getMenuByTypeId = async (type_id: number) => {
  const { data } = await axiosClient.get(`/menu/type/${type_id}`);
  return data;
};

export const deleteTableItem = async ({
  tableName,
  id,
}: {
  tableName: string;
  id: number;
}) => {
  const { data: responseData } = await axiosClient.get(
    "/table/" + tableName + "/delete/" + id
  );
  return responseData;
};

export const createCrudOption = async (column_id: number, data: any) => {
  const { data: responseData } = await axiosClient.post(
    "/crud-option/create/" + column_id,
    data
  );
  return responseData;
};

export const updateBlock = async (id: number, data: any) => {
  const { data: responseData } = await axiosClient.post(
    "/block/get/" + id,
    data
  );
  return responseData;
};

export const getDashboard = async () => {
  const { data: responseData } = await axiosClient.get("/dashboard");
  return responseData;
};
