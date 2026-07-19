import axios from "axios";
// create api 
export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    timeout: 5000
})