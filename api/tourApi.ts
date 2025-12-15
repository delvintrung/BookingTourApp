import { Tour } from "@/types";
import axiosClient from "./customAxios";

export const getTours = async () => {
  const res = await axiosClient.get("/v1/tours");
  return res.data.data.result;
};

export const getTourById = async (id: number) => {
  const res = await axiosClient.get(`/v1/tours/${id}`);
  const tour: Tour = res.data.data;
  return tour;
};
