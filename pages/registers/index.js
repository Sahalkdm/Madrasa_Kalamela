import Layout from "@/Components/Layout";
import Register from "@/Components/Register";
import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { parse } from "cookie";
import Head from "next/head";

export default function RegisterPage({programmes,madrasa}){
    return(
        <div>
             <Head>
            <title>Register</title>
          </Head>
            <Layout>
            <Register programmes={programmes} madrasaa={madrasa}/>
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect();
    const cookies = parse(context.req?.headers.cookie || '');
    const madrasa = JSON.parse(cookies.session || '{}');
    const programmes=await Programme.find();
    return{
        props:{
            programmes:JSON.parse(JSON.stringify(programmes)),
            madrasa:madrasa,
        },
};
}