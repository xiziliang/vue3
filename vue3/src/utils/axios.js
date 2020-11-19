import axios from "axios";
const axiosInit = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
});
axiosInit.interceptors.request.use((config) => {
  return config;
});

axiosInit.interceptors.response.use(
  (res) => {
    return res.data.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const post = (opts) => {
  return axiosInit({
    methods: "post",
    ...opts,
  });
};

export const get = (opts) => {
  return axiosInit({
    methods: "get",
    ...opts,
  });
};

export const del = (opts) => {
  return axiosInit({
    methods: "delete",
    ...opts,
  });
};
