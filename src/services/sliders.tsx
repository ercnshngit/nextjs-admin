import axiosClient from "@/libs/axios";
import { Slider, Sliders } from "@/types/sliders";

export const getSliders = async () => {
  const { data } = await axiosClient.get("/sliders");
  return data;
};

export const getSlidersById = async ({ sliderId }: { sliderId: number }) => {
  const { data } = await axiosClient.get("/sliders/get/" + sliderId);
  return data;
};

export const createSliders = async ({ stitle, stext, simg }: Slider) => {
  return await axiosClient.post("/sliders/create", {
    stitle,
    stext,
    simg,
  });
};

export const updateSlider = async ({ id, stitle, stext }: Slider) => {
  return await axiosClient.post(`/sliders/set/${id}`, {
    stitle,
    stext,
  });
};

export const uploadSliderImage = async (id: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await axiosClient.post("/sliders/upload/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
