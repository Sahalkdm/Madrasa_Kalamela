import Layout from "@/Components/Layout";
import axios from "axios";
import { parse } from "cookie";
import { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

export default function ResultPage({user}){

    const tableRef = useRef(null);
    const [category,setCategory]=useState('');
    const [filterProgrammes, setFilterProgrammes]=useState([]);
    const [filterRegistrations, setFilterRegistrations]=useState([]);
    const [resultArrays, setResultArrays]=useState([]);
    const [MadrasaArrays, setMadrasaArrays]=useState([]);
    const [loading,setLoading]=useState(false);

    async function OnchangeHandler(ev){
        setLoading(true);
        setCategory(ev.target.value)
        await axios.put('/api/result',{category:ev.target.value}).then(response=>{
            setResultArrays(response.data.winnersArray);
            setMadrasaArrays(response.data.madrasaArraySorted);
            setFilterProgrammes(response.data.programmes);
            setFilterRegistrations(response.data.registrations)
        })
        setLoading(false);
    }

    const getRegistrationInfo = (code, property) => {
        const registration = filterRegistrations?.find(obj => obj?.code === code);
        return registration ? registration[property] : '';
      };

      return(
        <Layout>
            <h2>Results</h2>
            <select id="default" className="border mb-4 ml-2 rounded-lg 
   p-2.5 bg-gray-700 text-lg border-gray-600 placeholder-gray-400 text-white"
   value={category} onChange={ev=>OnchangeHandler(ev)}
   >
  <option value='' disabled >Choose Category</option>
  <option value="Kids" className="text-lg">kids</option>
  <option value="Children" className="text-lg">Children</option>
  <option value="Sub Junior" className="text-lg">Sub Junior</option>
  <option value="Junior" className="text-lg">Junior</option>
  <option value="Senior" className="text-lg">Senior</option>
</select>
    
    {loading && (<p className="font-semibold ml-5 text-gray-700">Loading...</p>)}

<h3 className="text-center font-bold text-2xl ">Leaderboard</h3>

<div className="relative overflow-auto shadow-md rounded-md m-1">
    <table className="w-full text-left rtl:text-right">
        <thead className="bg-green-500 text-white">
            <tr>
                <th className="px-2 py-1">Sl. No.</th>
                <th className="px-2 py-1">Madrasa</th>
                <th className="px-2 py-1">Points</th>
            </tr>
        </thead>
        <tbody>
            {category && MadrasaArrays?.map((results,index)=>
                (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                    {results?.point >0 && (<><td className="px-2 py-2 font-bold">{index+1}</td>
                    <td className="px-2 py-2 font-bold">{results?.madrasa}</td>
                    <td className="px-2 py-2 font-bold">{results?.point}</td></>)}
                </tr>
))}
        </tbody>
    </table>
</div>

<div className="relative overflow-auto shadow-md rounded-md m-1">
    <table className="w-full text-left rtl:text-right">
        <thead className="bg-green-500 text-white">
            <tr>
                <th className="px-2 py-1">Sl. No.</th>
                <th className="px-2 py-1">Student</th>
                <th className="px-2 py-1">Points</th>
            </tr>
        </thead>
        <tbody>
            {category && resultArrays?.map((results,index)=>
                    (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                    {results?.point >0 && (<><td className="px-2 py-2 font-bold">{index+1}</td>
                    <td className="px-2 py-2 font-bold">
                    {getRegistrationInfo(results?.code, 'name')}
                        <p className="font-normal">{getRegistrationInfo(results?.code, 'madrasa')}</p>
                        </td>
                    <td className="px-2 py-2 font-bold">{results?.point}</td></>)}
                </tr>
))}
        </tbody>
    </table>
</div>

<h3 className="text-center font-bold text-2xl mt-3">Programme Results</h3>
{user?.email && (<button className="btn-primary w-1/2 md:w-1/5"> <DownloadTableExcel
                    filename='Results'
                    sheet={category}
                    currentTableRef={tableRef.current}
                >

                   Export excel 

                </DownloadTableExcel></button>)}

        <a href="https://winners-post.vercel.app/"><button className="px-3 py-2 font-bold text-white rounded-lg shadow-lg m-2" style={{backgroundColor:'#cc9900'}}>Click me & Get Winner Posts</button></a>
<div className="relative overflow-auto shadow-md rounded-md m-1">
    <table className="w-full text-left rtl:text-right" >
        <thead className="bg-gray-700 text-white">
            <tr>
                <th className="px-2 py-1">Sl.No.</th>
                <th className="px-2 py-1">Programme</th>
                <th className="px-2 py-1">Results</th>
            </tr>
            </thead>

            <tbody>
                {filterProgrammes.length >0 && filterProgrammes.map((pro,index)=>(
                    <tr key={pro._id} className="odd:bg-white even:bg-gray-100">
                        <td className="px-2 py-2 font-bold">{index+1}</td>
                        <td >{pro.title}</td>
                        <td className="px-2 py-2">
  {pro.results?.length > 0 && pro.results?.map((res, index) => (
    <ul key={index}>
      <li className="font-bold">{index+1} . {getRegistrationInfo(res, 'name')}</li>
      <li className=" ml-5 text-gray-800">{getRegistrationInfo(res, 'madrasa')}</li>
    </ul>
  ))}
</td>
                    </tr>
                ))}
            </tbody>
    </table>

    <table className="w-full text-left rtl:text-right hidden" ref={tableRef}>
        <thead className="bg-gray-700 text-white">
            <tr>
                <th className="px-2 py-1">Sl.No.</th>
                <th className="px-2 py-1">Programme</th>
                <th className="px-2 py-1">Results</th>
                <th className="px-2 py-1">Madrasa</th>
            </tr>
            </thead>

            <tbody>
                {filterProgrammes.length >0 && filterProgrammes.map((pro,index)=>(
                    <tr key={pro._id} className="odd:bg-white even:bg-gray-100">
                        <td className="px-2 py-2 font-bold">{index+1}</td>
                        <td >{pro.title}</td>
                        <td>
  {pro.results?.length > 0 && pro.results?.map((res, index) => (
      <p className="font-bold" key={index}>{index+1} . {getRegistrationInfo(res, 'name')}</p>
  ))}
</td>
<td>
  {pro.results?.length > 0 && pro.results?.map((res, index) => (
      <p className="font-bold" key={index}>{getRegistrationInfo(res, 'madrasa')}</p>
  ))}
</td>
                    </tr>
                ))}
            </tbody>
    </table>
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
