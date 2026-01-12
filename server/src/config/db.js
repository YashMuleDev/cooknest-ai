import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        // Set mongoose options
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    }catch(error){
        console.error("❌ MongoDB connection failed:", error.message);
        console.error("🔍 Check your MONGO_URI and network connection");
        console.error("⚠️  Server will continue running but database operations will fail");
        // Don't exit the process - let server run for testing
        // process.exit(1);
    }
};