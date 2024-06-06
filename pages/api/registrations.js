import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { Registrations } from "@/models/Registrations";

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

    if(method==='POST'){
        console.log("posting Working2");
        const {category, name, classs, madrasa, programme} = req.body;
        const index=(await Registrations.find({category:category})).length;
        if(category==="Kids"){
          var code=101+index;
        }else if(category==="Children"){
          var code=201+index;
        }else if(category==="Sub Junior"){
          var code=301+index;
        }else if(category==="Junior"){
          var code=401+index;
        }else if(category==="Senior"){
          var code=501+index;
        }
        
        const registrationDoc = await Registrations.create({
          category, name, classs, madrasa, programme, code
        })
      res.json(registrationDoc);
      console.log(req.body);
      console.log(index+' ++ '+code);
    }

    if(method==='PUT'){
        console.log("put Working");
        const {category, name, parent, classs, school, phone, programme, _id} = req.body;
        const registrationDoc = await Registrations.updateOne({_id:_id},{
            category, name, parent, classs, school, phone, programme
        })
      res.json(registrationDoc);
      console.log(req.body);
    }

    if(method==='GET'){
      const registrations=await Registrations.find();
      res.json({registrations})
    }
}