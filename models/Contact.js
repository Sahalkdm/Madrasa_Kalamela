import mongoose, {Schema, model, models} from "mongoose";

const ContactSchema= new Schema({
    email:{type:String},
    phone:{type:Number},
    subject:{type:String},
    message:{type:String},
})

export const Contact = models.Contact || model('Contact', ContactSchema)
