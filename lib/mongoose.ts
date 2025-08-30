import mongoose, { Mongoose } from "mongoose";

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
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((result) => {
        console.log("connected to mongodb");
        return result;
      })
      .catch((error) => {
        console.error("error connecting to MongoDB");
        throw new Error(error);
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
