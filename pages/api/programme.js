import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

    
    if(method==='PUT'){
        console.log("put Working2");
        const {_id, active} = req.body;
        const programmeStageDoc = await Programme.updateOne({_id:_id},{active});
        const programmes=await Programme.find();
        res.json(programmes);
      console.log(programmeStageDoc);
    }

    /*if(method==='DELETE'){
      if(req.query?.id) {
          await Programme.deleteOne({_id:req.query?.id})
          res.json(true)
      }
  }

  if(method==="GET"){
    const programmes=await Programme.find();
      res.json({programmes})
  }*/
}