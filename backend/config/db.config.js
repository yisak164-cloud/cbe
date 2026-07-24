import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function DB() {
    try {
        const url = process.env.DB_URL.replace('mongodb.net/', 'mongodb.net/cbe')
        await mongoose.connect(url);
        console.log("MongoDB Connected ✅");
    } catch (err) {
        console.log("Connection failed ❌", err);
    }
}

export default DB;