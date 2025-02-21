import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techDescription, techMap } from "./techMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDevIconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[.]/g, "").toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[.]/g, "").toLowerCase();

  return techDescription[normalizedTechName]
    ? techDescription[normalizedTechName]
    : `${techName} is a popular tool for development.`;
};

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { name: "year", value: 31536000 },
    { name: "month", value: 2592000 },
    { name: "week", value: 604800 },
    { name: "day", value: 86400 },
    { name: "hour", value: 3600 },
    { name: "minute", value: 60 },
    { name: "second", value: 1 },
  ];

  for (const interval of intervals) {
    const value = Math.floor(seconds / interval.value);
    if (value >= 1) {
      return `${value} ${interval.name}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
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

export const getSkipLimit = (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  return { skip, limit };
};

export const formatNumber = (number: number) => {
  if (number <= 1000000) {
    return (number / 1000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};
