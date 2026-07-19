import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function DB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB Connected ✅");
    } catch (err) {
        console.log("Connection failed ❌", err);
    }
}

export default DB;