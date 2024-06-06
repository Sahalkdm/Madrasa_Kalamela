import { mongooseConnect } from "@/lib/mongoose";
import { Message } from "@/models/Message";

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

    if(method==='POST'){
        console.log("posting Working2");
        const {message} = req.body;
        const messageDoc = await Message.create({
           message
        })
      res.json(messageDoc);
      console.log(req.body);
    }

    if(method==='DELETE'){
      if(req.query?.id) {
          await Message.deleteOne({_id:req.query?.id})
          res.json(true)
      }
  }

  if(method==='GET'){
    const messages=await Message.find();
    res.json({messages})
  }

}