import Layout from "@/Components/Layout";
import StageManage from "@/Components/StageManage";
import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { parse } from "cookie";
 
export default function StageManagePage({programmes, user}){
    return(
        <Layout user={user}>
            <h2 className="text-center md:text-left">Stages & Programmes</h2>
            <StageManage programmes={programmes} user={user}/>
        </Layout>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect();
    const cookies = parse(context.req?.headers.cookie || '');
    const user = JSON.parse(cookies.session || '{}');
    const programmes=await Programme.find();
    return{
        props:{
            programmes:JSON.parse(JSON.stringify(programmes)),
            user:user,
        },
};
}