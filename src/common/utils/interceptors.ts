import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const exampleReqInterceptors = (config: InternalAxiosRequestConfig) => {
  const example = localStorage.getItem("example");
  if (example) {
    config.headers["x-access-token"] = example;
  }
  return config;
};

const exampleResInterceptors = (response: AxiosResponse) => {
  const example = response.headers["example"];

  if (example) {
    localStorage.setItem("example", example);
  }

  return response;
};

export const applyInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      exampleReqInterceptors(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use((response) => {
    exampleResInterceptors(response);
    return response;
  });
};
