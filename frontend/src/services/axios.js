import axios from "axios"  // ← add this line

export const api = axios.create({
    baseURL: "cbe-backend-lovat.vercel.app",
    withCredentials: false,
    timeout: 5000
})
