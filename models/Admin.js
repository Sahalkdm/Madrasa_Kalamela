import mongoose, {Schema, model, models} from "mongoose";

const AdminSchema= new Schema({
    email:{type:String,required:true},
    password:{type:String, required:true},
})

export const Admin = models.Admin || model('Admin', AdminSchema)