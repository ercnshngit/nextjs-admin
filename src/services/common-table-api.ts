import axiosClient from "@/libs/axios";

export const getTable = async ({ tableName }: { tableName: string }) => {
  const { data } = await axiosClient.get("/table/" + tableName);
  return data;
};

export const getTableItem = async ({
  tableName,
  id,
}: {
  tableName: string;
  id: number;
}) => {
  const { data } = await axiosClient.get("/table/" + tableName + "/" + id);
  return data;
};

export const updateTableItem = async ({
  tableName,
  id,
  data,
}: {
  tableName: string;
  id: number;
  data: any;
}) => {
  const { data: responseData } = await axiosClient.post(
    "/table/" + tableName + "/update/" + id,
    data
  );
  return responseData;
};

export const createTableItem = async ({
  tableName,

  data,
}: {
  tableName: string;
  data: any;
}) => {
  const { data: responseData } = await axiosClient.post(
    "/table/" + tableName,
    data
  );
  return responseData;
};
