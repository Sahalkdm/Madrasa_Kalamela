import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { parse } from "cookie";
import AddProgrammeForm from "@/Components/addProgrammeForm";
import Test from "@/Components/Test";

export default function ProgrammeEdit({programme,user}){
    return (
        <div>
            <Test user={user}/>
            {user ? (<AddProgrammeForm {...programme}/>):(<h2>You are not Admin</h2>)}
        </div>
    )
}

export async function getServerSideProps(context){
    const {id} = context.query;
    await mongooseConnect();
    const cookies = parse(context.req.headers.cookie || '');
    const user = JSON.parse(cookies.session || '{}');
    const programme=await Programme.findById(id);
    return{
        props:{
            programme:JSON.parse(JSON.stringify(programme)),
            user:user,
        },
};
}