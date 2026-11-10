import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillbridge';
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database Warning] Unable to connect to MongoDB at ${mongoUri}`);
    console.warn(`[Database Info] Please configure a local MongoDB instance or set MONGO_URI in server/.env with your MongoDB Atlas connection string.`);
    console.warn(`[Database Info] Error message: ${error.message}`);
    return false;
  }
};
