import mongoose, {Schema, model, models} from "mongoose";

const MadrasaSchema= new Schema({
    madrasa:{type:String},
    username:{type:String},
    password:{type:String},
    point: {
        Kids: { type: Number },
        Children: { type: Number },
        SubJunior: { type: Number },
        Junior: { type: Number },
        Senior: { type: Number }
      }
    });

export const Madrasa = models.Madrasa || model('Madrasa', MadrasaSchema)