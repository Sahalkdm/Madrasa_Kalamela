import Test from "@/Components/Test";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function AdminLoginPage(){

    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword]=useState('');

  const AddAdminHandler = async (ev) => {
    ev.preventDefault();
        const data={email,password};
            await axios.post('/api/addadmin', data).then(response=>{
                if(response.status===200){
                    router.push('/')
                }
                
            });
        } 


    return (
        <div className="grad">
          <Head>
            <title>Add Admin</title>
          </Head>
            <Test/>
<form className="max-w-sm mx-auto mt-10 bg-opacity-10" onSubmit={AddAdminHandler}>
<h2>Admin Login</h2>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
    <input type="email" id="email" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
    placeholder="example@gmail.com" required value={email} onChange={ev=>setEmail(ev.target.value)}/>
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
    <input type="password" id="password" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required 
    value={password} onChange={ev=>setPassword(ev.target.value)} />
  </div>
  <div className="mb-5">
    <label htmlFor="cndpassword" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
    <input type="password" id="cnfpassword" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required 
    value={cnfPassword} onChange={ev=>setCnfPassword(ev.target.value)} />
  </div>
  <button type="submit" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none 
    focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-25" disabled={password!=cnfPassword || password===''}
    >Submit</button>
</form>

        </div>
    )
}