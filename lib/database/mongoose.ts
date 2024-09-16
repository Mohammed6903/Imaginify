import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Cached connection for reuse across hot-reloaded or multiple instances
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<Mongoose | null> => {
  // Return cached connection if already connected
  if (cached.conn) return cached.conn;

  // Throw error if MongoDB URL is missing
  if (!MONGODB_URL) {
    throw new Error("MongoDB URL not provided");
  }

  // If not connected, create a new promise to connect to MongoDB
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL);
  }

  // Await the connection and cache it for future requests
  cached.conn = await cached.promise;

  return cached.conn;
};
