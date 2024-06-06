import Test from "@/Components/Test";
import Link from "next/link";
import Head from "next/head";

export default function AdminPage() {
    return (
        <div>
             <Head>
            <title>Admin Dashboard</title>
          </Head>
            <Test />
            <h2 className="text-center text-gray-900">Admin Page</h2>

            <div className="flex flex-col justify-evenly gap-5 m-2 md:flex-wrap md:flex-row items-center">
            <Link href="/adminLogin" className="w-full sm:w-1/2 md:w-1/3 block p-4 border 
            rounded-lg shadow  
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className=" text-xl font-bold tracking-tight text-gray-900 text-white">
                Admin Login</h5>
           </Link>
           <Link href="/programme" className="w-full sm:w-1/2 md:w-1/3 block p-4 border 
            rounded-lg shadow  
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className=" text-xl font-bold tracking-tight text-gray-900 text-white">
               Programmes</h5>
           </Link>
            <Link href="/madrasaregs" className="w-full sm:w-1/2 md:w-1/3 block p-4 border 
            rounded-lg shadow  
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className=" text-xl font-bold tracking-tight text-gray-900 text-white">
               Madrasa Registrations</h5>
           </Link>
           <Link href="/registrations" className="w-full sm:w-1/2 md:w-1/3 block p-4 border 
            rounded-lg shadow  
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className=" text-xl font-bold tracking-tight text-gray-900 text-white">
               Programme Registrations & Add Grades</h5>
           </Link>
           <Link href="/stagemanage" className="w-full sm:w-1/2 md:w-1/3 block p-4 border 
            rounded-lg shadow  
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className="truncate text-xl font-bold tracking-tight text-gray-900 text-white">
               Manage Stage Programmes</h5>
           </Link>
           <Link href="/addProgramme" className="block w-full sm:w-1/2 md:w-1/3 p-4 border 
            rounded-lg shadow  
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className="text-xl font-bold tracking-tight text-gray-900 text-white">
                Add Programme</h5>
           </Link>
           
           <Link href="/addAdmin" className="block w-full sm:w-1/2 md:w-1/3 p-4 border 
            rounded-lg shadow 
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className="text-xl font-bold tracking-tight text-gray-900 text-white">
                Add Admin</h5>
           </Link>
           <Link href="/addMadrasa" className="block w-full sm:w-1/2 md:w-1/3 p-4 border 
            rounded-lg shadow 
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className="text-xl font-bold tracking-tight text-gray-900 text-white">
                Add Madrasa</h5>
           </Link>
           <Link href="/addMessage" className="block w-full sm:w-1/2 md:w-1/3 p-4 border 
            rounded-lg shadow  mb-2
            bg-gray-800 border-gray-700 hover:bg-gray-700">

            <h5 className="text-xl font-bold tracking-tight text-gray-900 text-white">
                Add Messages</h5>
           </Link>
        </div>
        </div>
    )
}