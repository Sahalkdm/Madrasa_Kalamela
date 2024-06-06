import Stage from "./Stage";

export default function StageManage({programmes, user}){

    return(
        <div>
            <h3 className="text-2xl font-bold text-center">Day 1</h3>
            <div className="flex gap-5 md:flex-row flex-col m-1 md:justify-center mb-4">
                <Stage stage={1} programmes={programmes} user={user} day={1}/>
                <Stage stage={2} programmes={programmes} user={user} day={1}/>
                <Stage stage={3} programmes={programmes} user={user} day={1}/>
                <Stage stage={4} programmes={programmes} user={user} day={1}/>
            </div>
            <h3 className="text-2xl font-bold text-center">Day 2</h3>
            <div className="flex gap-5 md:flex-row flex-col m-1 md:justify-center mb-4">
                <Stage stage={1} programmes={programmes} user={user} day={2}/>
                <Stage stage={2} programmes={programmes} user={user} day={2}/>
                <Stage stage={3} programmes={programmes} user={user} day={2}/>
                <Stage stage={4} programmes={programmes} user={user} day={2}/>
            </div>
        </div>
    )
}

