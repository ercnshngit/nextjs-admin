import axiosClient, { axiosFileClient } from "@/libs/axios";

export const getMediaFromServer = async ({
  directory,
}: {
  directory: string;
}) => {
  const { data: responseData } = await axiosFileClient.get(
    "/media/" + directory
  );
  return responseData;
};

export const uploadMediaToServer = async ({
  file,
  route,
}: {
  file: File;
  route: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosFileClient.post("/media/upload/" + route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMedia = async ({ directory }: { directory: string }) => {
  const { data: responseData } = await axiosClient.get("/media/" + directory);
  return responseData;
};

export const uploadMedia = async ({
  file,
  route,
}: {
  file: File;
  route: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosClient.post("/media/" + route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
