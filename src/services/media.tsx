import axiosClient, { axiosFileClient } from "@/libs/axios";

export const getMediaFromServer = async ({
  directory,
}: {
  directory: string;
}) => {
  const { data: responseData } = await axiosClient.get("/media");
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
  return axiosClient.post("/media/" + route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
