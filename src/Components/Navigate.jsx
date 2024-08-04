import { FaChevronLeft } from "react-icons/fa";
import {useNavigate} from "react-router-dom"


export default function Navigate({to,except=false}){
    let navigates=useNavigate();

    const handleClick=(e)=>{
        e.preventDefault();
        navigates("/"+to);

    }

    return <div className="border-[3px] border- bg-white w-fit h-fit p-[10px] mt-1 rounded-lg absolute left-3  z-10 grad-trans" 
        onClick={handleClick}>
        
        <FaChevronLeft className={`${ (except)?'text-orange-500':'text-white' }`}/>
    </div>
}