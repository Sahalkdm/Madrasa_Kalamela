import mongoose, {Schema, model, models} from "mongoose";

const MessageSchema= new Schema({
    message:{type:String},
},{
    timestamps:true
})

export const Message = models.Message || model('Message', MessageSchema)