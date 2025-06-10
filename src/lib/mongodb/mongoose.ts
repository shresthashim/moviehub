import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
  mongoose.set("strictQuery", false);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB_NAME || "moviehub",
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB runtime error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
    isConnected = false;
  });
};
