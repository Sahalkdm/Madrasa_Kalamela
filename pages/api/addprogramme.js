import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

    if(method==='POST'){
        console.log("posting Working2");
        const {title, category, description, stage, day, time} = req.body;
        const programmeDoc = await Programme.create({
            title, category, description, stage, day, time
        })
      res.json(programmeDoc);
      console.log(req.body);
    }

    if(method==='PUT'){
        console.log("put Working2");
        const {title, category, description, stage, day, time,_id} = req.body;
        const programmeResultDoc = await Programme.updateOne({_id:_id},{title, category, description, stage, day, time})
      res.json(programmeResultDoc);
      console.log(programmeResultDoc);
    }

    if(method==='DELETE'){
      if(req.query?.id) {
          await Programme.deleteOne({_id:req.query?.id})
          res.json(true)
      }
  }

  if(method==="GET"){
    const programmes=await Programme.find();
      res.json({programmes})
  }
}