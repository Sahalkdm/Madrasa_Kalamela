import axios from "axios"
import { useEffect, useState } from "react"


export default function Stage({stage, day, programmes, user}){

    const [program, setProgram]=useState([]);

    useEffect(()=>{
        setProgram(programmes);
    },[programmes, ])

    async function StageHandler(_id, active){
        const data={_id, active:active?false:true}
        await axios.put('/api/programme',data).then(response=>{
            setProgram(response.data)
        })
    }


    function sortObjectsByTime(stage, day) {
        const compareTimes = (a, b) => {
          const timeA = a.time.split(":").map(Number);
          const timeB = b.time.split(":").map(Number);
      
          if (timeA[0] !== timeB[0]) {
            return timeA[0] - timeB[0]; // Compare hours
          } else {
            return timeA[1] - timeB[1]; // Compare minutes if hours are equal
          }
        };
      
        return program.filter(obj=>obj.stage===stage && obj.day===day).slice().sort(compareTimes);
      }
    
    
    return(
        <div>
            <div className="w-full max-w-md p-2 border border-gray-200 rounded-lg shadow sm:p-5 bg-gray-800 border-gray-700 h-full">
    <div className="flex items-center justify-center mb-4">
        <h5 className="text-xl font-bold leading-none text-white">Stage {stage}</h5>
   </div>
   <div className="flow-root bg-gray-700 rounded-md">
        <ul role="list" className="divide-y divide-gray-500">
   {sortObjectsByTime(''+stage, ''+day)?.length >0 && sortObjectsByTime(''+stage, ''+day)?.map((pro, index)=>
    (
    
    <li className={""+(pro.active?"bg-green-500":"")} key={pro._id}>
    <div className={"flex items-center py-3"+(user?.email ? "sm:flex-row flex-col":"")}>
        <div className="flex-1 min-w-0 ms-4">
          <table>
            <tr>
              <td className="break-words p-1 text-white text-lg align-top">{index+1})</td>
              <td className="break-words p-1 text-white text-lg">{pro.title} - {pro.category}</td>
            </tr>
          </table>
            
        </div>
        {!user?.email ? (<div className="inline-flex items-center text-base font-semibold text-white ml-4 mr-2">
           {pro.active && 'Now'}
        </div>):
        (<>{pro.active?(<button className="bg-blue-700 text-white px-2 py-1 mr-2 rounded-md" onClick={()=>StageHandler(pro._id, pro.active)}>End Programme</button>):(<button onClick={()=>StageHandler(pro._id, pro.active)} className="bg-red-700 text-white px-2 py-1 mr-2 rounded-md">Start Programme</button>)}</>)}
    </div>
    <div className="bg-gray-400" style={{paddingTop:'1px'}}></div>
</li>
   )
   )}
</ul>
   </div>       
</div>
        </div>
    )
}

