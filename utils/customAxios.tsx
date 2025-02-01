"use client";

import axios from "axios";

const customAxios = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true, // Ensures cookies are sent with the request
});

customAxios.interceptors.request.use(
  (config) => {
    // Add the customOrigin header
    config.headers["custom-origin"] = "cedirates-dev";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access if necessary
      // For example, redirect to login page
      // window.location = "https://cedirates.com/login";
    }
    return Promise.reject(error);
  }
);

export default customAxios;
