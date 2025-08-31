import mongoose, { Mongoose } from "mongoose";

import logger from "@/lib/logger";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined");
}

interface IMongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: IMongooseCache;
}

let cached: IMongooseCache = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info("Using existing Mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.MONGO_DB_DATABASE,
      })
      .then((result) => {
        logger.info("Connected to mongodb");
        return result;
      })
      .catch((error) => {
        logger.error("error connecting to MongoDB ", error);
        console.error("error connecting to MongoDB ", error);
        throw new Error(error);
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
