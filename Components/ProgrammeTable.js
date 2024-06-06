import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProgrammeTable({programmes, user, category}){

    const router = useRouter();
    const [showPopup, setShowPopup]=useState(false);
    const [pid, setPid]=useState('');
    function goBack(){
        router.push('/programme')
        setShowPopup(false)
    }
    async function deleteProduct() {
        await axios.delete('/api/addprogramme?id='+pid);
        console.log('hello');
        console.log(pid);
        goBack();
    }
    return(
        <div>
            <div className="relative overflow-x-auto shadow-md rounded-md m-1 mb-8 bg-gray-700 divide-y divide-gray-200 p-1">
            <h4 className="text-white text-xl p-2 font-bold">{category}</h4>
                <table className="w-full text-left rtl:text-right">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="px-2 py-1">Programme</th>
                            <th className="px-2 py-1">Stage</th>
                            {user?.email && (<><th className="px-2 py-1">Registrations and Grading</th>
                            <th className="px-2 py-1">Add Results</th>
                            <th className="px-2 py-1">Edit</th>
                            <th className="px-2 py-1">Delete</th></>)}
                            <th className="px-2 py-1">Day</th>
                            <th className="px-2 py-1">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programmes.filter(obj=>obj.category===category).map(pro=>(
                            <tr key={pro._id} className="odd:bg-white even:bg-gray-50">
                                <td className="px-2 py-2 font-bold">{pro.title}</td>
                                <td className="px-2 py-2">{pro.stage}</td>
                                {user?.email && (<><td className="px-2 py-1"><Link className="btn-secondary p-0" href={{
                                        pathname: '/registrations',
                                        query: { category: pro.category, programme: pro._id },
                                        }}>Regs_&_Grading</Link>
                                </td>
                                <td className="px-2 py-2"><Link className="btn-green p-0" href={`/addResult/${pro._id}`}>Add_Result</Link></td>
                                <td className="px-2 py-2"><Link href={`/programme/edit/${pro._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto text-blue-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </Link></td>
                        <td className="px-2 py-2"><button onClick={()=>{setShowPopup(true); setPid(pro._id)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto text-red-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

          </button></td></>)}
          <td className="px-2 py-2">{pro.day}</td>
          <td className="px-2 py-2">{pro.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showPopup && (
            <div className="center">
            <div className='backdrop' onClick={()=>setShowPopup(false)}/>
          <div className="w-fit bg-white p-5 rounded-lg absolute top-20 z-10 m-1">
            <h1 className="text-center">Do you Realy want to delete this programme?</h1>
                <div className="flex gap-2 justify-center pt-3">
            <button onClick={deleteProduct} className="bg-red-500 text-white px-3 py-1 hover:bg-red-600 rounded-md">Yes</button>
            <button className="bg-gray-400 text-white px-3 py-1 hover:bg-gray-500 rounded-md" onClick={()=>setShowPopup(false)}>No</button>
            </div>
    </div>
    </div>)}
        </div>
)}