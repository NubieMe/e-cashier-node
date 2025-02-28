import mongoose from "mongoose";
import "dotenv/config"

const address = process.env.DATABASE_URL!;

export function connect() {
    const db = mongoose.connection;

    mongoose.connect(address);

    db.on("error", (error) => console.error(error));
    db.once("open", async () => {
        console.log("DB is ",address);
    })

    return db
}