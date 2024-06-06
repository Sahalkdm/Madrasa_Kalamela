import Layout from "@/Components/Layout";
import axios from "axios";
import { parse } from "cookie";
import { useEffect, useState } from "react";

export default function MessagePage({user}){

    const [messages, setMessages]=useState([]);
    const [click, setClick]=useState(false)

    useEffect(()=>{
        axios.get('/api/message').then(response=>{
            setMessages(response.data.messages)
        })
    },[click,])

function dateFormat(date){
    const dateObject = new Date(date);

// Format the date and time
const formattedDate = dateObject.toLocaleString('en-US', {
year: 'numeric',
month: '2-digit',
day: '2-digit',
hour: '2-digit',
minute: '2-digit',
});
return formattedDate.replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+) (AM|PM)/, '$2/$1/$3, $4 $5');

}

async function messageDelete(id){
    await axios.delete('/api/message?id='+id);
    setClick(true)
}


    return(
        <Layout user={user}>
            <h2 className="text-white text-center">Messages</h2>
            <div className="flex flex-col-reverse items-center p-5 bg-gray-400 m-3 rounded-md bg-opacity-80">
                {messages.length >0 && messages.map(msg=>(
                    <div key={msg._id} className="bg-gray-900 bg-opacity-80 md:w-1/2 w-full p-2 text-white rounded-md flex gap-1 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                     </svg>
                     <div>
                     <p>{msg.message}</p>
                     <div className={"text-right text-xs text-gray-400 "+(user?.email?"flex justify-between":"")}>
                        {user?.email && (<svg onClick={()=>messageDelete(msg._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 cursor-pointer">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                        </svg>
                        )}
                        <span>{dateFormat(msg.createdAt)}</span></div>
                     </div>
            </div>
                ))}
            
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context){
    const cookies = parse(context.req?.headers.cookie || '');
    const user = JSON.parse(cookies.session || '{}');
    return{
        props:{
            user:user,
        },
};
}