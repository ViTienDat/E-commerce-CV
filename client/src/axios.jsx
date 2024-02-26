import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

instance.interceptors.request.use(
  function (config) {
    let lacalStorageData = window.localStorage.getItem("persist:shop/user");
    if (lacalStorageData && typeof lacalStorageData === "string") {
      lacalStorageData = JSON.parse(lacalStorageData);
      const token = JSON.parse(lacalStorageData?.token);
      config.headers = { Authorization: `Bearer ${token}` };
      return config;
    } else return config;
  },
  function (error) {
    return error;
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return error.response.data;
  }
);

export default instance;
