"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

// url?query=hello&sort=asc
export const useFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //   get current filters from url
  const mutate = (key: string, value: string) => {
    let currentFilters = searchParams.toString().split("&");
    const isDefined = searchParams.has(key);
    if (!isDefined) {
      //  if the filter is not defined, add it
      currentFilters.push(`${key}=${value}`);
      
      return router.push(`${pathname}?${currentFilters.join("&")}`);
    } else {
      // if same filter is defined, remove it
      if (searchParams.get(key) === value) {
        remove(key);
        
        return;
      }
      // if different filter is defined, replace it
      let currentFilters = searchParams.toString().split("&");
      currentFilters = currentFilters.filter((filter) => !filter.includes(key));
      currentFilters.push(`${key}=${value}`);

      
      return router.push(`${pathname}?${currentFilters.join("&")}`);
    }
  };
  const remove = (key: string) => {
    let currentFilters = searchParams.toString().split("&");
    currentFilters = currentFilters.filter((filter) => !filter.includes(key));
    return router.push(`${pathname}?${currentFilters.join("&")}`);
  };
  return {
    mutate,
    remove,
  };
};
