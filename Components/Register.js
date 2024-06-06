import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function Register({programmes, registeration, madrasaa}){

    const router=useRouter();

    const [name, setName] = useState(registeration?.name || '');
    const [classs, setClasss] = useState(registeration?.classs || '');
    const [madrasa, setMadrasa] = useState(registeration?.madrasa || madrasaa?.username);
    const [category, setCategory] = useState(registeration?.category || '');
    const [programme, setProgramme]=useState(registeration?.programme || []);
    const [gotoPage, setGotoPage] = useState(false);
    const [filterProgrammes, setFilterProgrammes]=useState([]);

    useEffect(()=>{
      if(category){
        const filetredProgrammes = programmes.filter(obj => {
            return obj.category===category;
          });
          setFilterProgrammes(filetredProgrammes);
          console.log(filetredProgrammes);
      }  
    },[category, programmes, ]);

    function OnCategoryChange(v){
        setCategory(v);
        setProgramme([])
    }
 
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
 
        console.log(`${value} is ${checked}`);
 
        // Case 1 : The user checks the box
        if (checked) {          
                setProgramme([...programme, {programme:value,attendance:''}])
            }
        // Case 2  : The user unchecks the box
        else {
            setProgramme(programme.filter(
                    (e) => e.programme !== value
                ))
        }
        console.log(programme);
    };

    async function SubmitHandler(ev){
        ev.preventDefault();
        const data={category, name, classs, madrasa, programme}
        if(registeration?._id){
            const _id=registeration._id
            await axios.put('/api/register',{...data, _id});
            setGotoPage(true);
        }else{
            await axios.post('/api/register',data);
            setCategory('');
            setClasss('');
            setName('');
            setProgramme([]);
            setFilterProgrammes([]);
        }
    }

    if(gotoPage){
        router.push('/madrasaregs');
    }

    return(
        <div className="center">
            {console.log(programme)}
            
            <form className="text-left shadow-xl" onSubmit={SubmitHandler}>
                <h2 className="text-center text-white shadow-md">Register</h2>
                <h3 className="text-xl font-bold">{madrasa}</h3>
                {registeration?._id ?<p className="font-bold text-xl">Category: {registeration?.category}</p> :(<select id="default" className="border mb-4 rounded-lg 
   p-2.5 bg-gray-700 text-lg border-gray-600 placeholder-gray-400 text-white"
   value={category} onChange={ev=>OnCategoryChange(ev.target.value)}
   >
  <option value='' disabled >Choose Category</option>
  <option value="Kids" className="text-lg">kids</option>
  <option value="Children" className="text-lg">Children</option>
  <option value="Sub Junior" className="text-lg">Sub Junior</option>
  <option value="Junior" className="text-lg">Junior</option>
  <option value="Senior" className="text-lg">Senior</option>
</select>)}<br/>
                <label>Name</label><br/>
                <input type="text" placeholder="Name" value={name} onChange={ev=>setName(ev.target.value)}/><br/>
                <label>Class </label><br/>
                <input type="number" placeholder="Class" className="w-full" value={classs} onChange={ev=>setClasss(ev.target.value)}/><br/>
                <div className="bg-gray-300 bg-opacity-70 p-2 mt-5 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{category} Programmes</h4>
                <p>Tick Programmes</p>
                {filterProgrammes?.length > 0 && filterProgrammes.map(pro=>(
                    <div key={pro._id}>
                        <input type="checkbox" checked={programme.some(obj=>obj.programme.includes(pro._id))} value={''+pro._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                        rounded focus:ring-blue-500 ml-4" onChange={handleChange/*ev=>{setProgramme(current=>[...current,ev.target.value])}*/}/>
                        <label className="ml-2 font-medium text-gray-900">{pro.title}</label>
                    </div>
                ))}
                
                </div>
                {/*console.log(programme)*/}
                {madrasa?(<div className="text-center">
                    <button type="submit" className="btn-primary text-center shadow-md">Submit</button>
                </div>):<Link href={'/madrasaLogin'} className="text-red-800">Pls Login to Register</Link>}
            </form>
        </div>
    )
}
