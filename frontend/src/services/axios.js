import axios from "axios";

export const api = axios.create({
    baseURL: "https://cbe-backend-lovat.vercel.app/api",
    withCredentials: true,
    timeout: 5000,
});

console.log("Axios baseURL:", api.defaults.baseURL);
