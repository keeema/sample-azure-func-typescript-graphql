import mongoose from "mongoose";

export async function mongooseFactory(): Promise<mongoose.Mongoose> {
  return await mongoose.connect(process.env.MongoConnectionString, {
    dbName: process.env.MongoDbName,
  });
}
