import mongoose from "mongoose";
import "dotenv/config"

const address = process.env.DATABASE_URL!;

export function connect() {
    const db = mongoose.createConnection(address, {
        socketTimeoutMS: 10000,
        minPoolSize: 10,
    });

    db.on("error", (error) => console.error(error));
    db.once("open", async () => {
        console.log("DB is ",address);
    })

    return db
}