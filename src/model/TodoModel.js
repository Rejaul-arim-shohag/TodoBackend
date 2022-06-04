const mongoose = require("mongoose");
const { Schema } = mongoose;
const TodoSchema = new Schema({
    Title:{type:String, required:true},
    Detail:{type:String, required:true},
    UserId:{type:Number},
    createDate:{type:Date, default:Date.now()},
}, {versionkey:false})

const todoModel = mongoose.model("todos",TodoSchema);
module.exports = todoModel;