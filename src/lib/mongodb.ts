import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: "stp",
        family: 4,
        serverSelectionTimeoutMS: 10000,
      })
      .then((mongoose) => {
        console.log("MongoDB Connected");
        console.log(mongoose.connection.db?.databaseName);
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}