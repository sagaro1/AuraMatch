import mongoose from "mongoose";

const glassSchema= new mongoose.Schema({
    faceshape:String,
    glassstyle:String,
    image:String,
    gender:String,
    description:String

})
const Glass=mongoose.model("Glass",glassSchema);
export default Glass