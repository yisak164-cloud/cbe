import axios from "axios";
// create api 
export const api = axios.create({
    baseURL: "https://cbe-lwgg.vercel.app/api",
    withCredentials: true,
    timeout: 5000
})
