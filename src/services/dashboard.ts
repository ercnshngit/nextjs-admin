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
