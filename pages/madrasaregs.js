import Test from "@/Components/Test";
import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { useEffect, useRef, useState } from "react"
import { Registrations } from "@/models/Registrations";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import axios from "axios";
import Head from "next/head";
import { Madrasa } from "@/models/Madrasa";
import Link from "next/link";
import { parse } from "cookie";

export default function RegistrationsPage({madrasas, madrasaname}){

    const tableRef = useRef(null);
    const [category, setCategory]=useState('');
    const [programme, setProgramme]=useState('');
    const [filterProgrammes, setFilterProgrammes]=useState([]);
    const [filterRegistrations, setFilterRegistrations]=useState([]);
    const [search, setSearch]=useState('');
    const [madrasa, setMadrasa]=useState(madrasaname.username || '');
    const [searchRegistrations, setSearchRegistrations]=useState([]);
    const [programmes, setProgrammes]=useState([]);
    const [registrations, setRegistrations]=useState([]);

    useEffect(()=>{
        axios.get('/api/register').then(response=>{
            setProgrammes(response.data.programmes);
            setRegistrations(response.data.registrations);
            if(madrasaname?.email){
                setFilterRegistrations(response.data.registrations)
            }else if(madrasaname?.username){
              const FilteredRegistrations = response.data.registrations.filter(obj=>obj.madrasa.toLowerCase()===madrasaname?.username?.toLowerCase());
              setFilterRegistrations(FilteredRegistrations);  
            }else{
                setFilterRegistrations([]);
            }   
        })
    },[madrasaname,])

    function OnMadrasaChangeHandler(v){
        setMadrasa(v);
        const FilteredRegistrations = registrations.filter(obj=>obj.madrasa===v);
        setFilterRegistrations(FilteredRegistrations);
        setCategory('');
        setProgramme('');
    }

    function OnchangeHandler(ev){
        setCategory(ev.target.value)
        setProgramme('');
        const filetredProgrammes=programmes.filter(obj=>obj.category===ev.target.value);
        setFilterProgrammes(filetredProgrammes);
        if(madrasa!=""){
            var FilteredRegistrations1 = registrations.filter(obj => {
                return obj.madrasa.toLowerCase() === madrasa.toLowerCase()
              });
        }else{
            var FilteredRegistrations1 = registrations
        }
        const FilteredRegistrations = FilteredRegistrations1.filter(obj => {
            return obj.category === ev.target.value
          });
          setFilterRegistrations(FilteredRegistrations)
    }

    function OnProgrammeChangeHandler(value){
        setProgramme(value);
        if(madrasa!=""){
            var FilteredRegistrations1 = registrations.filter(obj => {
                return obj.madrasa.toLowerCase() === madrasa.toLowerCase()
              });
        }else{
            var FilteredRegistrations1 = registrations
        }
        const FilteredRegistrations = FilteredRegistrations1.filter(obj => {
            return obj.category === category && obj.programme.some(program => program.programme === '' + value);
          });
          setFilterRegistrations(FilteredRegistrations)
        //setAttendanceArray((prevAttendanceArray) => [...prevAttendanceArray, datas]);
    }

    
    function SearchHandler(v){
        setSearch(v);

        const searchedRegistrations = filterRegistrations.filter(obj => {
            return obj.name.toLowerCase().includes('' + v.toLowerCase())
          });
          setSearchRegistrations(searchedRegistrations);
    }

    return(
        <div>
             <Head>
            <title>Registrations</title>
          </Head>
            <Test />
            <div className="flex items-center flex-col">
                <h4 className="text-2xl font-bold my-2">Registrations</h4>
            <div className="flex bg-gray-300 w-fit rounded-md pt-4 px-4 flex-col md:flex-row md:gap-5">

            {madrasas && madrasaname?.email && (<select id="default" className="border mb-4 rounded-lg 
   p-2.5 bg-gray-700 text-lg border-gray-600 placeholder-gray-400 text-white"
   value={madrasa} onChange={ev=>OnMadrasaChangeHandler(ev.target.value)}
   >
  {<option value='' disabled >Choose Madrasa</option>}
  
  {madrasas.length >0 && madrasas.map(pro=>(
    <option key={pro._id} value={pro.madrasa} className="text-lg">{pro.madrasa}</option>
  ))}
</select>)}


            <select id="default" className="border mb-4 rounded-lg 
                p-2.5 bg-gray-700 text-lg border-gray-600 placeholder-gray-400 text-white"
                value={category} onChange={ev=>OnchangeHandler(ev)}
            >
  <option value='' disabled >Choose Category</option>
  <option value="Kids" className="text-lg">kids</option>
  <option value="Children" className="text-lg">Children</option>
  <option value="Sub Junior" className="text-lg">Sub Junior</option>
  <option value="Junior" className="text-lg">Junior</option>
</select>

{category && (<select id="default" className="border mb-4 rounded-lg 
   p-2.5 bg-gray-700 text-lg border-gray-600 placeholder-gray-400 text-white"
   value={programme} onChange={ev=>OnProgrammeChangeHandler(ev.target.value)}
   >
  {<option value='' disabled >Choose Programme</option>}
  
  {filterProgrammes.length >0 && filterProgrammes.map(pro=>(
    <option key={pro._id} value={pro._id} className="text-lg">{pro.title}</option>
  ))}
</select>)}
            </div>

            {filterRegistrations.length > 0 && (
                <div className="flex flex-col-reverse md:flex-row w-screen px-3 md:justify-between">
                    <div className="">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" value={search} onChange={ev=>SearchHandler(ev.target.value)} id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 
            border-2 border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for name"/>
        </div>
    </div>
            <button className="btn-primary w-1/2 md:w-1/5"><DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                    Export excel 

                </DownloadTableExcel></button>
                </div>)}
            </div>
            
            <div className="relative overflow-x-auto shadow-md rounded-md m-1">
            {filterRegistrations.length > 0 && (<table className="w-full text-left rtl:text-right">
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="px-2 py-1">Sl No</th>
                        <th className="px-2 py-1">Code No.</th>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Category</th>
                        <th className="px-2 py-1">Class</th>
                        <th className="px-2 py-1">Madrasa</th>
                        <th className="px-2 py-1">Programmes</th>
                        <th className="px-2 py-1">edit</th>
                    </tr>
                </thead>
                <tbody>
                    {(search ?  searchRegistrations:filterRegistrations).length > 0 && (search ?searchRegistrations:filterRegistrations).map((reg,index)=>(
                        <tr key={reg._id} className="odd:bg-white even:bg-gray-100">
                            <td className="px-2 py-1">{index+1}</td>
                            <td className="px-2 py-1">{reg.code}</td>
                            <td className="px-2 py-1">{reg.name}</td>
                            <td className="px-2 py-1">{reg.category}</td>
                            <td className="px-2 py-1">{reg.classs}</td>
                            <td className="px-2 py-1">{reg.madrasa}</td>
                            <td><ul>{reg.programme.map(pro=>
                               (<li key={pro.programme}>{programmes.find(obj=>obj._id===pro.programme).title}</li>) 
                            )}</ul></td>
                            <td><Link href={`/registrations/edit/${reg._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>)}
          </div>



          <table className="w-full text-left rtl:text-right hidden" ref={tableRef}>
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="px-2 py-1">Sl No</th>
                        <th className="px-2 py-1">Code No.</th>
                        <th className="px-2 py-1">Name</th>
                        <td className="px-2 py-1">Category</td>
                        <th className="px-2 py-1">Class</th>
                        <th className="px-2 py-1">Madrasa</th>
                        <th className="px-2 py-1">Programmes</th>
                    </tr>
                </thead>
                <tbody>
                    {(search ?  searchRegistrations:filterRegistrations).length > 0 && (search ?searchRegistrations:filterRegistrations).map((reg,index)=>(
                        <tr key={reg._id} className="odd:bg-white even:bg-gray-50">
                            <td className="px-2 py-1">{index+1}</td>
                            <td className="px-2 py-1">{reg.code}</td>
                            <td className="px-2 py-1">{reg.name}</td>
                            <td className="px-2 py-1">{reg.category}</td>
                            <td className="px-2 py-1">{reg.classs}</td>
                            <td className="px-2 py-1">{reg.madrasa}</td>
                            <td>{reg.programme.map(pro=>
                               (<li key={pro.programme}>{programmes.find(obj=>obj._id===pro.programme).title}</li>) 
                            )}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect();
    const cookies = parse(context.req?.headers.cookie || '');
    const madrasa = JSON.parse(cookies.session || '{}');
    const programmes=await Programme.find();
    const madrasas=await Madrasa.find();
    const registrations= await Registrations.find();
    return{
        props:{
            programmes:JSON.parse(JSON.stringify(programmes)),
            registrations:JSON.parse(JSON.stringify(registrations)),
            madrasas:JSON.parse(JSON.stringify(madrasas)),
            madrasaname:JSON.parse(JSON.stringify(madrasa)),
        },
};
}