import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/models/Admin";
import { hash } from 'bcrypt';

export default async function Handler(req,res){
    const {method} =req;
    await mongooseConnect();

    if(method==='POST'){
        console.log("posting Working2");
        const {email, password} = req.body;
        const hashedPassword = await hash(password, 10);
        const AdminDoc = await Admin.create({
            email, 
            password:hashedPassword
        })
      res.json(AdminDoc);
      console.log(req.body);
    }
}