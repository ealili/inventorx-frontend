import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})


axiosClient.interceptors.request.use((config) => {
  const persistedStateString = localStorage.getItem('persist:root');
  const persistedState = JSON.parse(persistedStateString);

  // Access the user object from the parsed state
  const userObject = JSON.parse(persistedState.user)

  const token = userObject.token
  config.headers.Authorization = `Bearer ${token}`

  return config
})

// axiosClient.interceptors.response.use((response) => {
//   return response
// }, (error) => {
//   const {response} = error;
//
//   if (response.status === 401) {
//     localStorage.removeItem('user')
//   }
//
//   throw error;
// })

export default axiosClient


export const request = async (method, url, params = {}) => {
  const persistedStateString = localStorage.getItem('persist:root');
  const persistedState = JSON.parse(persistedStateString);

  // Access the user object from the parsed state
  const userObject = JSON.parse(persistedState.user)

  const token = userObject.token
  try {
    const options = {
      method: method,
      url: `${import.meta.env.VITE_API_BASE_URL}/api/${url}`,
      data: params,
      headers: {
        "Accept": "application/json", "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    const response = await axios(options);

    if (response.data !== undefined && response.data !== null) {
      if (response.data.data !== undefined && response.data.data !== null) {
        return response.data.data;
      } else {
        return response.data;
      }
    } else {
      return response;
    }

  } catch (error) {
    throw error;
  }
}