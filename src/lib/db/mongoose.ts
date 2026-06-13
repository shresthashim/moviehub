import mongoose, { Mongoose } from "mongoose";

/**
 * Serverless-safe Mongoose connection.
 *
 * The connection promise is cached on `globalThis` so concurrent serverless
 * invocations (and hot reloads in dev) reuse a single pooled connection
 * instead of opening a new one each time.
 */

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export const connect = async (): Promise<Mongoose> => {
  if (cache.conn) return cache.conn;

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  mongoose.set("strictQuery", false);

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(mongoUri, {
        dbName: process.env.MONGODB_DB_NAME || "moviehub",
        bufferCommands: false,
      })
      .then((m) => {
        console.log("✅ MongoDB connected successfully");
        return m;
      })
      .catch((error) => {
        cache.promise = null; // allow retry on next request
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
};
