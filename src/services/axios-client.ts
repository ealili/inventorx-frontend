import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {store} from "../store/store.ts";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const persistedStateString = localStorage.getItem("persist:root");

    // Check if persistedStateString is null
    if (persistedStateString !== null) {
        const persistedState = JSON.parse(persistedStateString);

        // Access the users object from the parsed state
        const userObject = JSON.parse(persistedState.access_token || "{}");

        const token = userObject.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

// axiosClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         const {response} = error;
//
//         if (response.status === 401) {
//             localStorage.clear();
//             window.location.href = "/";
//         }
//
//         throw error;
//     }
// );

export default axiosClient;

export const request = async (method: string, url: string, params = {}) => {
    try {
        const accessToken = store.getState().userState.access_token

        // Check if persistedStateString is null
        if (accessToken !== null) {

            const options = {
                method: method,
                url: `${import.meta.env.VITE_API_BASE_URL}/api/${url}`,
                data: params,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios(options);

            // Handle delete
            if (response.status === 204) return response;

            const responseData = response?.data?.data || response?.data;

            return responseData !== undefined ? responseData : response;
        }
    } catch (error) {
        const {response} = error as AxiosError;

        if (response && response.status === 401) {
            localStorage.clear();
            window.location.href = '/'
        }

        console.error("Error:", response); // Log any errors

        throw error;
    }
};

export const requestWithoutToken = async (method: string, url: string, params = {}) => {

    const options: AxiosRequestConfig = {
        method: method,
        url: `${import.meta.env.VITE_API_BASE_URL}/api/${url}`,
        data: params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios(options);

        if (Object.prototype.hasOwnProperty.call(response, 'data') && response.data) {
            if (Object.prototype.hasOwnProperty.call(response.data, 'data') && response.data.data) {
                return response.data.data;
            } else {
                return response.data;
            }
        } else {
            return response
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        } else {
            throw new Error('different error than axios');
        }
    }
};
