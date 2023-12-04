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

export default axiosClient;

export const axiosFileClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FILE_API_URL,
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
