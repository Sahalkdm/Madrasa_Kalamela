import mongoose, {Schema, model, models} from "mongoose";

const ProgrammeSchema= new Schema({
    title:{type:String},
    category:{type:String},
    description:{type:String},
    stage:{type:String},
    day:{type:String},
    time:{type:String},
    active:{type:Boolean},
    group:{type:Boolean},
    results:[{type:String}]
})

export const Programme = models.Programme || model('Programme', ProgrammeSchema)
