import axios from "axios"  // ← add this line

export const api = axios.create({
    baseURL: "https://cbe-backend-lovat.vercel.app/api",
    withCredentials: false,
    timeout: 5000
})
