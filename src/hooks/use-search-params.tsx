import {
  usePathname,
  useRouter,
  useSearchParams as useSearch,
} from "next/navigation";
import React, { useCallback } from "react";

export default function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearch()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setQueryString = useCallback(
    (name: string, value: string) => {
      router.push(pathname + "?" + createQueryString(name, value));
    },
    [pathname, createQueryString, router]
  );
  const setQueryStringNoRefresh = useCallback(
    (name: string, value: string) => {
      router.replace(pathname + "?" + createQueryString(name, value));
    },
    [pathname, createQueryString, router]
  );

  const setMultipleQueryString = useCallback(
    (values: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams);
      values.forEach((value) => {
        params.set(value.name, value.value);
      });
      router.push(pathname + "?" + params.toString());
    },
    [pathname, searchParams, router]
  );

  const getQueryString = useCallback(
    (name: string) => {
      return searchParams.get(name);
    },
    [searchParams]
  );

  const getMultipleQueryString = useCallback(
    (names: string[]) => {
      const params = new URLSearchParams(searchParams);
      const values: { [key: string]: string } = {};
      names.forEach((name) => {
        values[name] = params.get(name) || "";
      });
      return values;
    },
    [searchParams]
  );

  const getAllQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    const values: { [key: string]: string } = {};
    params.forEach((value, key) => {
      values[key] = value;
    });
    return values;
  }, [searchParams]);

  const createSearchParamsForUrl = useCallback(() => {
    const url =
      "?" +
      Object.entries(getAllQueryString())
        .map(([key, value]) => key + "=" + value)
        .join("&");

    return url;
  }, [getAllQueryString]);

  return {
    setQueryString,
    setQueryStringNoRefresh,
    getQueryString,
    setMultipleQueryString,
    getMultipleQueryString,
    getAllQueryString,
    createSearchParamsForUrl,
  };
}
