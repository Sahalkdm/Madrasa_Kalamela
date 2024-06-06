import axios from "axios";
import { useRouter } from "next/router";

export default function DeleteProductPage() {
    const router=useRouter();
    //const [productInfo, setProductInfo]=useState();
    const {id}=router.query;
    /*useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response =>{
            setProductInfo(response.data)
        });
    },[id])*/
    function goBack(){
        router.push('/programme')
    }
    async function deleteProduct() {
        await axios.delete('/api/addprogramme?id='+id);
        console.log('hello');
        goBack()
    }
    return (
        <div className="w-fit sm:m-auto bg-gray-700 p-5 sm:mt-5 mt-5 rounded-lg text-white mx-1">
            <h1 className="text-center">Do you Realy want to delete this programme?</h1>
                <div className="flex gap-2 justify-center pt-3">
            <button onClick={deleteProduct} className="bg-red-500 text-white px-3 py-1 hover:bg-red-600 rounded-md">Yes</button>
            <button className="bg-gray-400 text-white px-3 py-1 hover:bg-gray-500 rounded-md" onClick={goBack}>No</button>
            </div>
        </div>
    )
}