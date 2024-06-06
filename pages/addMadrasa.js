import Test from "@/Components/Test";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function AdminLoginPage(){

    const router = useRouter();
  const [madrasa, setMadrasa] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword]=useState('');

  const AddMadrasaHandler = async (ev) => {
    ev.preventDefault();
        const ponit={Kids:0,Children:0, SubJunior:0, Junior:0, Senior:0}
        const data={madrasa, username, password, ponit};
            await axios.post('/api/madrasa', data).then(response=>{
                if(response.status===200){
                    router.push('/addMadrasa')
                }
                
            });
            setCnfPassword('');
            setMadrasa('');
            setPassword('');
            setUsername('');
        } 


    return (
        <div className="grad">
          <Head>
            <title>Add Madrasa</title>
          </Head>
            <Test/>
<form className="max-w-sm mx-auto mt-10 bg-opacity-10" onSubmit={AddMadrasaHandler}>
<h2>Add Madrasa</h2>
  <div className="mb-5">
    <label htmlFor="Madrasa" className="block mb-2 text-sm font-medium text-gray-900">Madrasa</label>
    <input type="text" id="Madrasa" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
    placeholder="Madrasa Name" required value={madrasa} onChange={ev=>setMadrasa(ev.target.value)}/>
  </div>
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
    <input type="text" id="username" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
    placeholder="User Name" required value={username} onChange={ev=>setUsername(ev.target.value)}/>
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">password</label>
    <input type="password" id="password" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required placeholder="*******" 
    value={password} onChange={ev=>setPassword(ev.target.value)} />
  </div>
  <div className="mb-5">
    <label htmlFor="cndpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
    <input type="password" id="cnfpassword" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required placeholder="*******" 
    value={cnfPassword} onChange={ev=>setCnfPassword(ev.target.value)} />
  </div>
  <button type="submit" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none 
    focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-25" disabled={password!=cnfPassword || password===''}
    >Submit</button>
</form>

        </div>
    )
}