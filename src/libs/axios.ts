import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import Cookies from "universal-cookie";

const isServer = typeof window === "undefined";

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  if (isServer) {
    const token = await useAuth.fromServer();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    const cookies = new Cookies();
    const token = await cookies.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      if (!isServer) {
        const cookies = new Cookies();
        await cookies.remove("token", { path: "/" }),
          await cookies.remove("user", { path: "/" }),
          (window.location.href = "/");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

export const axiosFileClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FILE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_FILE_API_TOKEN}`,
  },
});

axiosFileClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
