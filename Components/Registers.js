import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function Registers({programmes, registeration, madrasa}){

    const router=useRouter();

    const [name, setName] = useState(registeration?.name || '');
    const [parent, setParent] = useState(registeration?.parent || '');
    const [classs, setClasss] = useState(registeration?.classs || '');
    const [school, setSchool] = useState(registeration?.school || '');
    const [phone, setPhone] = useState(registeration?.phone || '');
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
 
    /*const handleChange = (e) => {
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
    };*/

    async function SubmitHandler(ev){
        ev.preventDefault();
        const data={category, name, parent, classs, school, phone, programme}
        if(registeration?._id){
            const _id=registeration._id
            await axios.put('/api/register',{...data, _id});
            router.push('/AllRegistrations');
        }else{
            await axios.post('/api/register',data);
            setGotoPage(true)
        }
    }

    if(gotoPage){
        router.push('/');
    }

    return(
        <div className="center">
            {console.log(programme)}
            <form className="text-left shadow-xl" onSubmit={SubmitHandler}>
                <h2 className="text-center text-white shadow-md">Register</h2>
                <select id="default" className="border mb-4 rounded-lg 
   p-2.5 bg-gray-700 text-lg border-gray-600 placeholder-gray-400 text-white"
   value={category} onChange={ev=>OnCategoryChange(ev.target.value)}
   >
  <option value='' disabled >Choose Category</option>
  <option value="Kids" className="text-lg">kids</option>
  <option value="Children" className="text-lg">Children</option>
  <option value="Sub Junior" className="text-lg">Sub Junior</option>
  <option value="Junior" className="text-lg">Junior</option>
  <option value="Senior" className="text-lg">Senior</option>
</select><br/>


<select id="default1" className="border mb-4 rounded-lg 
   p-2.5 bg-gray-700 text-lg border-gray-600 placeholder-gray-400 text-white"
   value={programme} onChange={ev=>setProgramme(ev.target.value)}
   >
  <option value='' disabled >Choose Category</option>
  {filterProgrammes?.length > 0 && filterProgrammes.map(pro=>(
                    <option key={pro._id} className="text-lg" value={pro._id}>{pro.title}</option>
                ))}
  
</select><br/>
                <label>Name</label><br/>
                <input type="text" placeholder="Name" value={name} onChange={ev=>setName(ev.target.value)}/><br/>
                <label>Parent</label><br/>
                <input type="text" placeholder="Parent Name" value={parent} onChange={ev=>setParent(ev.target.value)}/><br/>
                <label>Class </label><br/>
                <input type="number" placeholder="Class" className="w-full" value={classs} onChange={ev=>setClasss(ev.target.value)}/><br/>
                <label>School</label><br/>
                <input type="text" placeholder="School" value={school} onChange={ev=>setSchool(ev.target.value)}/><br/>
                <label>Phone </label><br/>
                <input type="number" placeholder="Phone No." className="w-full" value={phone} onChange={ev=>setPhone(ev.target.value)}/><br/>

                <div className="bg-gray-300 bg-opacity-70 p-2 mt-5 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{category} Programmes</h4>
                <p>Tick Your Programmes</p>
                {filterProgrammes?.length > 0 && filterProgrammes.map(pro=>(
                    <div key={pro._id}>
                        <input type="checkbox" value={''+pro._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                        rounded focus:ring-blue-500 ml-4" onChange={handleChange/*ev=>{setProgramme(current=>[...current,ev.target.value])}*/}/>
                        <label className="ml-2 font-medium text-gray-900">{pro.title}<p className="text-sm ml-10 mb-3 text-gray-600">{pro.description}</p></label>
                    </div>
                ))}
                
                </div>
                {/*console.log(programme)*/}
                <div className="text-center">
                    <button type="submit" className="btn-primary text-center shadow-md">Submit</button>
                </div>
            </form>
        </div>
    )
}