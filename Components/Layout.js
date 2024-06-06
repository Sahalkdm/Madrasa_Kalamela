import Test from "./Test";

export default function Layout({children, user}){
    return(
        <div className="h-screen">
            <Test user={user}/>
            <div className="">
                {children}
            </div>           
        </div>
    )
}