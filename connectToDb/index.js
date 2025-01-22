import mongoose from "mongoose";

const connecttodB = async () => {
  try {
    await mongoose.connect(process.env.mongodb_url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(process.env.mongodb_url);
  }
};

export default connecttodB;
