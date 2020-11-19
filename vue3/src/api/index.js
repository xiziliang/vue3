import { get, post } from "../utils/axios";
export const addPlan = (data) => {
  return post({ url: "/plan", data });
};
export const delPlan = (id) => {
  return del({ url: "/plan", params: { id } });
};
export const getPlan = () => {
  return get({ url: "/data" });
};
