import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react"

export default function AddProgrammeForm({
    _id,
    title:existingTitle,
    category:existingCategory,
    description:existingDescription,
    stage:existingStage,
    day:existingDay,
    time:existingTime,
   }){
    const [title, setTitle]=useState(existingTitle || '');
    const [description, setDescription]=useState(existingDescription || '');
    const [stage, setStage]=useState(existingStage || '');
    const [day, setDay]=useState(existingDay || '');
    const [time, setTime]=useState(existingTime || '');
    const [category, setCategory]=useState(existingCategory || '');
    const [gotoProgrammePage, setGotoProgrammePage]=useState(false);

    const router = useRouter();

    async function SubmitHandler(ev){
        ev.preventDefault();
        const data={title, category, description, stage, day, time};
        if(_id){
            await axios.put('/api/addprogramme', {...data,_id});
            setGotoProgrammePage(true)
        }
        else{
            await axios.post('/api/addprogramme', data);
            setCategory('');
            setDescription('');
            setStage('');
            setTitle('');
            setTime('');
            setDay('');
        }
    }

    if(gotoProgrammePage){
        router.push('/programme')
    }

    return(
        <div className="center">
            <form onSubmit={SubmitHandler} className="bg-black bg-opacity-20">
                <h2>Add Programme</h2>
<select id="default" className="border mb-4 rounded-lg 
   p-2.5 bg-gray-700 text-lg border-gray-600 placeholder-gray-400 text-white"
   value={category} onChange={ev=>setCategory(ev.target.value)}
   >
  <option value='' disabled >Choose Category</option>
  <option value="Kids" className="text-lg">kids</option>
  <option value="Children" className="text-lg">Children</option>
  <option value="Sub Junior" className="text-lg">Sub Junior</option>
  <option value="Junior" className="text-lg">Junior</option>
  <option value="Senior" className="text-lg">Senior</option>
</select><br/>
           <label>Programme</label>
           <input type="text" placeholder="Add Programme" value={title} onChange={ev=>setTitle(ev.target.value)}/><br/>
           <label>Description</label>
           <input type="text" placeholder="Description" className="md:text-sm" value={description} onChange={ev=>setDescription(ev.target.value)}/><br/>
           <label>Stage </label>
           <select id="default" className="border mb-2 mr-2 rounded-lg 
   p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" 
    value={stage} onChange={ev=>setStage(ev.target.value)}
   >
  <option value='' disabled >Stage</option>
  <option value="1" className="text-lg hover:bg-gray-900">1</option>
  <option value="2" className="text-lg">2</option>
  <option value="3" className="text-lg">3</option>
  <option value="4" className="text-lg">4</option>
</select><br/>
<label>Day </label>
<select id="default1" className="border mb-2 mr-2 rounded-lg 
   p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" 
    value={day} onChange={ev=>setDay(ev.target.value)}
   >
  <option value='' disabled >Day</option>
  <option value="1" className="text-lg hover:bg-gray-900">1</option>
  <option value="2" className="text-lg">2</option>
</select>
           <label className="ml-2">Time</label>
           <input type="time" placeholder="Starting Time" value={time} onChange={ev=>setTime(ev.target.value)}/><br/>
           <button className="btn-primary" type="submit">Submit</button>
           </form>
        </div>
    )
}