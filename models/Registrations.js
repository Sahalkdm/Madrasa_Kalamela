import mongoose, {Schema, model, models} from "mongoose";

const RegistrationsSchema= new Schema({
    category:{type:String},
    name:{type:String},
    classs:{type:String},
    madrasa:{type:Object},
    programme:[{type:Object}],
    code:{type:String},
    point:{type:Number}
})

export const Registrations = models.Registrations || model('Registrations', RegistrationsSchema)