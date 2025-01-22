import mongoose from "mongoose";

const hairSchema= new mongoose.Schema({
    faceshape:String,
    gender:String,
    Name:String,
    image:String,
    description:String

})
const Hair=mongoose.model("Hair",hairSchema);
export default Hair