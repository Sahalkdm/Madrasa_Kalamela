import Layout from "@/Components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddMessage(){

    const rounter=useRouter();
    const [message, setMessage]= useState('');
     async function MessageHandler(ev){
        ev.preventDefault();
        const data={message}
        await axios.post('/api/message',data).then(response=>{
            if(response.status===200){
                rounter.push('/message')
            }
        })
     }
    return(
        <Layout>
            <div className="center">
            <form onSubmit={MessageHandler} className="w-full md:w-1/2">
            <h2>Add Message</h2>
                <textarea value={message} onChange={ev=>setMessage(ev.target.value)} className="w-full overflow-auto p-1 rounded-md" rows="4"
                 placeholder="Add Comments..."></textarea>
                <button className="btn-primary">Send Message</button>
            </form>
            </div>
        </Layout>
    )
}