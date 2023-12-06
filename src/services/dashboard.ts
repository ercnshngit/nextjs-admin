import axiosClient from "@/libs/axios";

export const getTablesStructure = async () => {
  const { data } = await axiosClient.get("/table");
  return data;
};

export const getTablesConfigs = async () => {
  const { data } = await axiosClient.get("/config");
  return data;
};

export const createTableConfig = async (data: any) => {
  const res = await axiosClient.post("/config", data);
  return res;
};

export const getTableInputTypes = async () => {
  const { data } = await axiosClient.get("/input-types");
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
