import mongoose from "mongoose";

export async function connectDB() {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error("MONGO_URI is not set. Copy .env.example to .env and fill it in.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("mongoDB connected");
    } catch (err) {
        console.error("mongoDB connection error:", err.message);
        process.exit(1);
    }
}
