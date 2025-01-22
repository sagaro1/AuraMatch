import mongoose from "mongoose";

const faceDaata= new mongoose.Schema({
    faceshape:{type: String, required: true},
    gender:{type:String, required: true},
    image:{type:String, required: true}


})

const FaceData = mongoose.model('FaceData', faceDaata);
export default FaceData