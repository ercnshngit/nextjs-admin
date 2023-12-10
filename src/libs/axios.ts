import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import Cookies from "universal-cookie";

const isServer = typeof window === "undefined";

const axiosClient = axios.create({
  baseURL: "http://localhost:5008/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  if (isServer) {
    const accessToken = await useAuth.fromServer();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  } else {
    const cookies = new Cookies();
    const accessToken = await cookies.get("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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

    throw error;

    return Promise.reject(error);
  }
);

export default axiosClient;

export const axiosFileClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FILE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosFileClient.interceptors.request.use(async (config) => {
  if (isServer) {
    const accessToken = await useAuth.fromServer();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  } else {
    const cookies = new Cookies();
    const accessToken = await cookies.get("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return config;
});
