import mongoose from "mongoose";

const beardSchema= new mongoose.Schema({
    faceshape:String,
    gender:String,
    beardstyle:String,
    image:String,
    description:String

})
const Beard=mongoose.model("Beard",beardSchema);
export default Beard
