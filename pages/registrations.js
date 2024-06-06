import Test from "@/Components/Test";
import { mongooseConnect } from "@/lib/mongoose";
import { Programme } from "@/models/Programmes";
import { useEffect, useRef, useState } from "react"
import { Registrations } from "@/models/Registrations";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

export default function RegistrationsPage(){

    const router = useRouter();
  const data = router.query;
    const tableRef = useRef(null);
    const [category, setCategory]=useState(data.category || '');
    const [programme, setProgramme]=useState(data.programme || '');
    const [filterProgrammes, setFilterProgrammes]=useState([]);
    const [filterRegistrations, setFilterRegistrations]=useState([]);
    const [search, setSearch]=useState('');
    const [attendance, setAttendance]=useState('');
    const [searchRegistrations, setSearchRegistrations]=useState([]);
    const [attendanceArray, setAttendanceArray]=useState([]);
    const [programmes, setProgrammes]=useState([]);
    const [registrations, setRegistrations]=useState([]);

    useEffect(()=>{
        axios.get('/api/register').then(response=>{
            setProgrammes(response.data.programmes);
            setRegistrations(response.data.registrations);
            if(category!=''){
                const filetredProgrammes=response.data.programmes.filter(obj=>obj.category===category);
                setFilterProgrammes(filetredProgrammes);
                if(programme!=''){
                    const FilteredRegistrations = response.data.registrations.filter(obj => {
                        return obj.category === category && obj.programme.some(program => program.programme === '' + programme);
                      });
                      setFilterRegistrations(FilteredRegistrations)
                      FilteredRegistrations.map((reg, index)=>{
                        setAttendanceArray((prevAttendanceArray) => {
                            const newArray = [...prevAttendanceArray];
                            newArray[index] = {_id:reg._id, attendance:reg.programme.find(obj=>obj.programme===programme)?.attendance};
                            return newArray;
                    })
                    console.log(attendanceArray);
                    //setAttendanceArray((prevAttendanceArray) => [...prevAttendanceArray, datas]);
                })
                }
            }
        })
    },[])

    function OnchangeHandler(ev){
        setCategory(ev.target.value)
        setProgramme('');
        const filetredProgrammes=programmes.filter(obj=>obj.category===ev.target.value);
        setFilterProgrammes(filetredProgrammes);
        
    }

    function OnProgrammeChangeHandler(value){
        setProgramme(value);
        const FilteredRegistrations = registrations.filter(obj => {
            return obj.category === category && obj.programme.some(program => program.programme === '' + value);
          });
          setFilterRegistrations(FilteredRegistrations)
          FilteredRegistrations.map((reg, index)=>{
            setAttendanceArray((prevAttendanceArray) => {
                const newArray = [...prevAttendanceArray];
                newArray[index] = {_id:reg._id, attendance:reg.programme.find(obj=>obj.programme===value)?.attendance};
                return newArray;
        })
        //setAttendanceArray((prevAttendanceArray) => [...prevAttendanceArray, datas]);
    })
    }

    function SearchHandler(v){
        setSearch(v);
        const searchedRegistrations = filterRegistrations.filter(obj => {
            return obj.name.toLowerCase().includes('' + v.toLowerCase());
          });
          setSearchRegistrations(searchedRegistrations);
    }

    async function MarkAttendanceHandler(attendance,_id, i, pro){
        const data={attendance, programme, _id};
        await axios.put('/api/markAttendance', data)
        setAttendanceArray((prevAttendanceArray) => {
            const newArray = [...prevAttendanceArray];
            const index = newArray.findIndex(x => x._id ===_id);
            newArray[index] = {_id:_id, attendance:attendance}
            return newArray;
    })

        /*filterRegistrations[i].programme.find(obj=>obj.programme===programme).attendance=attendance;
        setFilterRegistrations(filterRegistrations)*/
        setAttendance(attendance);
       // attendanceArray.find(obj=>obj.id===_id).attendance=attendance;
        //setAttendanceArray(attendanceArray)
    }

    function OnSubmitHandler(ev){
        ev.preventDefault();
        router.push('/programme')
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
    
            <select id="default" className="border mb-4 rounded-lg 
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

            {programme && (
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
            <button className="btn-primary w-1/2 md:w-1/5"> <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   Export excel 

                </DownloadTableExcel></button>
                </div>)}
            </div>
            
            <div className="relative overflow-x-auto shadow-md rounded-md m-1">
            {programme && (<><table className="w-full text-left rtl:text-right">
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="px-2 py-1">Sl No</th>
                        <th className="px-2 py-1 font-bold">Code</th>
                        <th className="px-2 py-1">Grade</th>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Class</th>
                        <th className="px-2 py-1">Madrasa</th>
                    </tr>
                </thead>
                <tbody>
                    {(search ?  searchRegistrations:filterRegistrations).length > 0 && (search ?searchRegistrations:filterRegistrations).map((reg,index)=>(
                        <tr key={reg._id} className="odd:bg-white even:bg-gray-50">
                            <td className="px-2 py-1">{index+1}</td>
                            <td className="px-2 py-1">{reg.code}</td>
                            <td className="px-2 py-1">
                            <select id="default" value={attendanceArray.find(obj=>obj._id===reg._id)?.attendance || ''}
                               onChange={ev=>MarkAttendanceHandler(ev.target.value, reg._id, index, reg.programme)
                            } 
                            className="border rounded-lg p-2 border-gray-600 placeholder-gray-400 text-white bg-gray-700" 
                        >
  <option value='' disabled >Grade</option>
  <option value="A" className={""} >A</option>
  <option value="B" className="">B</option>
  <option value="C" className="">C</option>
  <option value="" className="">None</option>
</select><br/>
                        </td>
                            <td className="px-2 py-1">{reg.name}</td>
                            <td className="px-2 py-1">{reg.classs}</td>
                            <td className="px-2 py-1">{reg.madrasa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form className="w-fit p-0 border-none bg-opacity-0 fixed" onSubmit={OnSubmitHandler}>
            <button type="submit" className="btn-primary w-1/2">Save</button>
        </form></>)}
          </div>
    


          <table className="w-full text-left rtl:text-right hidden" ref={tableRef}>
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="px-2 py-1">Sl No</th>
                        <th className="px-2 py-1">Code</th>
                        <th className="px-2 py-1">Grade</th>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Class</th>
                        <th className="px-2 py-1">Madrasa</th>
                    </tr>
                </thead>
                <tbody>
                    {(search ?  searchRegistrations:filterRegistrations).length > 0 && (search ?searchRegistrations:filterRegistrations).map((reg,index)=>(
                        <tr key={reg._id} className="odd:bg-white even:bg-gray-50">
                            <td className="px-2 py-1">{index+1}</td>
                            <td className="px-2 py-1">{reg.code}</td>
                            <td className="px-2 py-1">{attendanceArray.find(obj=>obj._id===reg._id)?.attendance || ''}
                            </td>
                            <td className="px-2 py-1">{reg.name}</td>
                            <td className="px-2 py-1">{reg.classs}</td>
                            <td className="px-2 py-1">{reg.madrasa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect();
    const programmes=await Programme.find();
    const registrations= await Registrations.find();
    return{
        props:{
            programmes:JSON.parse(JSON.stringify(programmes)),
            registrations:JSON.parse(JSON.stringify(registrations)),
        },
};
}