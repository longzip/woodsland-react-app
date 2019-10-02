import axios from "axios";

const fileClient = () => {
  const defaultOptions = {
    baseURL: "/api/v1/",
    method: "get",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function(config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};

export default fileClient();
