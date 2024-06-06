import Test from "@/Components/Test";
import AddProgrammeForm from "@/Components/addProgrammeForm";
import Head from "next/head";

export default function AddProgramme(){
    return(
        <div>
             <Head>
            <title>Add Programme</title>
          </Head>
            <Test/>
            <AddProgrammeForm/>
        </div>
    )
}