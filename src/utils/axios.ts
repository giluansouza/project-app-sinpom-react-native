import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

export default axios;
