import mongoose, {Schema, model, models} from "mongoose";

const ProgrammeregSchema= new Schema({
    title:{type:String},
    category:{type:String},
    registrations:[{type:Object}]
},{
    timestamps:true
})

export const Programmereg = models.Programmereg || model('Programmereg', ProgrammeregSchema)