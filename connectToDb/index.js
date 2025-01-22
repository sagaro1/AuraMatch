import mongoose from "mongoose";

const connecttodB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ramrshrcg:jH82.Q2sVAJt9at@aura.tdrnf.mongodb.net/?retryWrites=true&w=majority&appName=Aura"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};

export default connecttodB;
