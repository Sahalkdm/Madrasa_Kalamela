import Layout from "@/Components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Madrasa } from "@/models/Madrasa";
import { Programme } from "@/models/Programmes";
import { Registrations } from "@/models/Registrations";
import { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { parse } from "cookie";

export default function ResultPage({programmes, registrations, madrasas, user}){

    const tableRef = useRef(null);
    const [category,setCategory]=useState('');
    const [category1,setCategory1]=useState('');
    const [filterProgrammes, setFilterProgrammes]=useState([]);
    const [madrasass, setMadrasass]=useState([]);
    const [filterRegistrations, setFilterRegistrations]=useState([]);

    function OnchangeHandler(ev){
        setCategory(ev.target.value)
        const filetredProgrammes=programmes.filter(obj=>obj.category===ev.target.value);
        const filteredRegistrations=registrations.filter(obj=>obj.category===ev.target.value).sort((a, b) => b.point - a.point);
        setFilterProgrammes(filetredProgrammes);
        setFilterRegistrations(filteredRegistrations);
        if(ev.target.value==="Sub Junior"){
            setCategory1("SubJunior")
            madrasas.sort((a, b) => b.point?.['SubJunior'] - a.point?.['SubJunior']);
        }else{
            setCategory1(ev.target.value)
            madrasas.sort((a, b) => b.point?.[''+ev.target.value] - a.point?.[''+ev.target.value]);
        }
        setMadrasass(madrasas)
    }

    const getRegistrationInfo = (code, property) => {
        const registration = registrations.find(obj => obj.code === code);
        return registration ? registration[property] : '';
      };
//pro.results && (<p>1. {pro?.results?.first}<br/>2. {pro?.results?.second} <br/>3. {pro?.results?.third} </p>)
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
            {category && madrasass?.map((results,index)=>
                (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                    {results?.point?.[""+category1] >0 && (<><td className="px-2 py-2 font-bold">{index+1}</td>
                    <td className="px-2 py-2 font-bold">{results.madrasa}</td>
                    <td className="px-2 py-2 font-bold">{results?.point?.[""+category1]}</td></>)}
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
            {category && filterRegistrations?.map((results,index)=>
                index < 5 && results?.point >0 && (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="px-2 py-2 font-bold">{index+1}</td>
                    <td className="px-2 py-2 font-bold">
                        {results.name}
                        <p className="font-normal">{results.madrasa}</p>
                        </td>
                    <td className="px-2 py-2 font-bold">{results?.point}</td>
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
    await mongooseConnect();
    const cookies = parse(context.req?.headers.cookie || '');
    const user = JSON.parse(cookies.session || '{}');
    const programmes=await Programme.find();
    const registrations = await Registrations.find();
    const madrasas=await Madrasa.find();
    return{
        props:{
            programmes:JSON.parse(JSON.stringify(programmes)),
            registrations:JSON.parse(JSON.stringify(registrations)),
            madrasas:JSON.parse(JSON.stringify(madrasas)),
            user:user,
        },
};
}
