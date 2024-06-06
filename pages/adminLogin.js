import Test from "@/Components/Test";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function AdminLoginPage(){

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]=useState('');

  const LoginHandler = async (ev) => {
    ev.preventDefault();
        const data={email,password};
            await axios.post('/api/login', data).then(response=>{
                if(response.data.message==='Login successful.'){
                    router.push('/admin');
                } else if(response.data.message==='Invalid credentials.'){
                  //router.push('/adminLogin')
                  setError("Invalid Credentials")
                } else{
                  //router.push('/adminLogin')
                }             
            });
        } 


    return (
        <div>
           <Head>
            <title>Admin Login</title>
          </Head>
            <Test/>
<form className="max-w-sm mx-auto mt-20" onSubmit={LoginHandler}>
<h2>Admin Login</h2>
<p className="font-bold text-red-600">{error}</p>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
    <input type="email" id="email" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
    placeholder="example@gmail.com" required value={email} onChange={ev=>setEmail(ev.target.value)}/>
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
    <input type="password" id="password" className="border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required placeholder="*******"
    value={password} onChange={ev=>setPassword(ev.target.value)} />
  </div>
  <button type="submit" className="btn-primary">Submit</button>
</form>

        </div>
    )
}
