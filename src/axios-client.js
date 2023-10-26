import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const persistedStateString = localStorage.getItem("persist:root");
  const persistedState = JSON.parse(persistedStateString);

  // Access the user object from the parsed state
  const userObject = JSON.parse(persistedState.user);

  const token = userObject.token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    throw error;
  }
);

export default axiosClient;

export const request = async (method, url, params = {}) => {
  try {
    const persistedState = JSON.parse(localStorage.getItem("persist:root"));
    const userObject = JSON.parse(persistedState?.user || "{}");
    const token = userObject?.token;

    const options = {
      method: method,
      url: `${import.meta.env.VITE_API_BASE_URL}/api/${url}`,
      data: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(options);
    const responseData = response?.data?.data || response?.data;

    return responseData !== undefined ? responseData : response;
  } catch (error) {
    const { response } = error;

    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    throw error;
  }
};
