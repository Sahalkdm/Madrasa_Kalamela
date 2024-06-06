import Layout from "@/Components/Layout";
import ProgrammeTable from "@/Components/ProgrammeTable";
import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { parse } from "cookie";


export default function ProgrammePage({programmes, user}){

    return(
        <Layout user={user}>
        <ProgrammeTable programmes={programmes} user={user} category={"Kids"}/>
        <ProgrammeTable programmes={programmes} user={user} category={"Children"}/>
        <ProgrammeTable programmes={programmes} user={user} category={"Sub Junior"}/>
        <ProgrammeTable programmes={programmes} user={user} category={"Junior"}/>
        <ProgrammeTable programmes={programmes} user={user} category={"Senior"}/>
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