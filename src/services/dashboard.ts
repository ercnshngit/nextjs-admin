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
  const { data } = await axiosClient.get(`/config/create/${table_name}`);
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
