import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { parse } from "cookie";
import Test from "@/Components/Test";
import Register from "@/Components/Register";
import { Registrations } from "@/models/Registrations";

export default function RegistrationEdit({registration,programmes,user}){
    return (
        <div>
            <Test user={user}/>
            {user ? (<Register registeration={registration} programmes={programmes}/>):(<h2>You are not Admin</h2>)}
        </div>
    )
}

export async function getServerSideProps(context){
    const {id} = context.query;
    await mongooseConnect();
    const cookies = parse(context.req.headers.cookie || '');
    const user = JSON.parse(cookies.session || '{}');
    const registration=await Registrations.findById(id);
    const programmes=await Programme.find();
    return{
        props:{
            registration:JSON.parse(JSON.stringify(registration)),
            programmes:JSON.parse(JSON.stringify(programmes)),
            user:user,
        },
};
}