import axiosClient from "@/libs/axios";

export const getTable = async ({ tableName }: { tableName: string }) => {
  const { data } = await axiosClient.get("/table/" + tableName);
  return data;
};
