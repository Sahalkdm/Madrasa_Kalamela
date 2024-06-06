import { mongooseConnect } from "@/lib/mongoose";
import { Madrasa } from "@/models/Madrasa";
import { hash } from 'bcrypt';

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

    if(method==='POST'){
        console.log("posting Working2");
        const {madrasa,username, password} = req.body;
        const hashedPassword = await hash(password, 10);
        const madrasaDoc = await Madrasa.create({
            madrasa, 
            username,
            password:hashedPassword,
            point:{Kids:0,Children:0, SubJunior:0, Junior:0, Senior:0},
        })
      res.json(madrasaDoc);
      console.log(madrasaDoc);
    }
}