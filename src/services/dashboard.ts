import axiosClient from "@/libs/axios";
import { general } from "@prisma/client";
import { BlockDto } from "./dto/block.dto";
import { BlockComponentDto } from "./dto/block_component.dto";
import { CreateComponentDto } from "./dto/component.dto";
import { DataLanguageDto } from "./dto/data_language.dto";
import { DatabaseTableDto } from "./dto/database-table.dto";

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

export const getComponent = async (id: number) => {
  const { data } = await axiosClient.get("/component/" + id);
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

export const createComponent = async ({
  data,
}: {
  data: CreateComponentDto;
}) => {
  const res = await axiosClient.post("/component", data);
  return res;
};
export const updateComponent = async ({
  id,
  data,
}: {
  id: number;
  data: CreateComponentDto;
}) => {
  const res = await axiosClient.post("/component/" + id, data);
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
  return data as DatabaseTableDto;
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
export const getBlockComponentsByType = async (type: string) => {
  const { data } = await axiosClient.get(`/block/component/bytype/${type}`);

  return data as BlockComponentDto[][];
};
export const getBlockComponentsBySlug = async (slug: string) => {
  const { data } = await axiosClient.get(`/block/component/get/byslug/${slug}`);

  return data as BlockComponentDto[];
};

export const getTypes = async (table_name: string) => {
  const { data } = await axiosClient.get(`/type/get/table-name/${table_name}`);

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
  const { data: responseData } = await axiosClient.post("/block/get/" + id, {
    ...data,
    id,
  });
  return responseData;
};

export const createBlockWithComponents = async (data: any) => {
  const { data: responseData } = await axiosClient.post("/block/create/", data);
  return responseData;
};

export const getDashboard = async () => {
  const { data: responseData } = await axiosClient.get("/dashboard");
  return responseData;
};

export const getTableItemByColumnAndValue = async ({
  tableName,
  column,
  value,
}: {
  tableName: string;
  column: string;
  value: string | number;
}) => {
  const { data: responseData } = await axiosClient.get(
    `/table/${tableName}/by/${column}/${value}`
  );
  return responseData;
};

export const getGeneralSlugs = async () => {
  const { data: responseData } = await axiosClient.get("/general/slugs");
  return responseData;
};
export const getGeneralBySlug = async (slug: string) => {
  const { data: responseData } = await axiosClient.get(
    "/general/get/byslug/" + slug
  );
  return responseData as general[];
};

export const createMenu = async ({ data }: { data: any }) => {
  const res = await axiosClient.post("/menu", data);
  return res;
};

export const deleteMenu = async (id: number) => {
  const { data } = await axiosClient.get(`/menu/delete/${id}`);
  return data;
};

export const updateMenu = async ({ id, data }: { id: number; data: any }) => {
  const { data: responseData } = await axiosClient.post(
    "/menu/get/byid/" + id,
    data
  );
  return responseData;
};

export const changeMenuOrder = async (data: any) => {
  const { data: responseData } = await axiosClient.post(
    "/menu/change-order",
    data
  );
  return responseData;
};

export const getMenuItems = async ({ typeId }: { typeId: number }) => {
  const { data } = await axiosClient.get(`/menu/get/bytype/${typeId}`);
  return data;
};
export const getMenuBySlug = async ({ slug }: { slug: string }) => {
  const { data } = await axiosClient.get(`/menu/get/byslug/${slug}`);
  return data;
};

export const getMenuByTypeId = async (type_id: number) => {
  const { data } = await axiosClient.get(`/menu/type/${type_id}`);
  return data;
};

// data_language
export const getDataLanguages = async () => {
  const { data } = await axiosClient.get("/data_language");
  return data as DataLanguageDto[];
};
export const getDataLanguagesByTable = async ({
  table_name,
}: {
  table_name: string;
}) => {
  const { data } = await axiosClient.get(`/data_language/table/${table_name}`);
  return data as DataLanguageDto[];
};

export const getDataLanguage = async (id: number) => {
  const { data } = await axiosClient.get(`/data_language/${id}`);
  return data as DataLanguageDto;
};

export const createDataLanguage = async (data: DataLanguageDto) => {
  const res = await axiosClient.post("/data_language", data);
  return res;
};

export const updateDataLanguage = async (id: number, data: DataLanguageDto) => {
  const res = await axiosClient.post(`/data_language/${id}`, data);
  return res;
};

export const deleteDataLanguage = async (id: number) => {
  const res = await axiosClient.get(`/data_language/delete/${id}`);
  return res;
};

export const createTableRelations = async (table_name: string) => {
  const res = await axiosClient.get(`/table/${table_name}/config/relations`);
  return res;
};
