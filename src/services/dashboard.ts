import axiosClient from "@/libs/axios";

export const getTablesStructure = async () => {
  const { data } = await axiosClient.get("/table");
  return data;
};
