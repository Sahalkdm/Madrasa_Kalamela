import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react"

export default function AddResults({programme}){
    const router=useRouter();
    const [first, setFirst]=useState('');
    const [second, setSecond]=useState('');
    const [third, setThird]=useState('');
    const [gotoProgrammePage, setGotoProgrammePage]=useState(false);

    function AddResultHandler(ev) {
        ev.preventDefault();
        const results=[first, second, third]
        const data={id:programme._id, results}
        axios.put('/api/addresults',data);
        setGotoProgrammePage(true)
    }
    if(gotoProgrammePage){
        router.push('/programme');
    }
    return(
        <div>
            <form onSubmit={AddResultHandler} className="w-fit mx-auto mt-10">
                <h2>Add Results</h2>
                <div className="text-lg font-bold">
                    <p>{programme.category} - {programme.title}</p><br/>
                </div>
                <label>First  </label>
                <input type="text" placeholder="Code No." value={first} onChange={(ev)=>setFirst(ev.target.value)}/><br/>
                <label>Second</label>
                <input type="text" placeholder="Code No." value={second} onChange={(ev)=>setSecond(ev.target.value)}/><br/>
                <label>Third  </label>
                <input type="text" placeholder="Code No." value={third} onChange={(ev)=>setThird(ev.target.value)}/><br/>
                <button className="btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}