import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techMap } from "./techMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDevIconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[.]/g, "").toLowerCase();
  console.log(normalizedTechName);

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};
export const updateSearchParams = (key: string, value: string) => {
  // Get the current search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(key, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.delete(type.toLowerCase());

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
