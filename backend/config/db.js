import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/resturant-menu-viewer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); 
  }
};
