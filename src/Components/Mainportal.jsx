import Brand from "./Custom/Brand";
import teacher from "../assets/VEC/teach.svg"
import admin from "../assets/VEC/adm.svg"
import { useNavigate } from "react-router-dom";
export default function Mainportal(){

    const navigate=useNavigate();
    const navigateStaff=()=>navigate("/staffLogin");
    const navigateAdmin=()=>navigate("/admin");


    return (
        <div className="login  h-[88%] max-sm:h-[90%] p-3 sm:p-10 flex justify-center overflow-hidden">
             
        <div className=" max-sm:border-0  h-full
             w-full sm:w-[70%] grid grid-cols-2 gap-8 relative ">
            
            <div className="flex align-middle  flex-col justify-center p-2
                 bg-white grad-trans
                 rounded-xl
                 shadow shadow-orange-300
                 hover:scale-110 transition-all  border-orange-600" title="Staff Login" onClick={navigateStaff}>
            
                    <h1 className="mr-auto ml-auto loghead text-4xl drop-shadow-[0_1.2px_1.2px_rgba(249,115,22,0.2)]">Staff</h1>
                    <img src={teacher} alt="Teacher" className="z-10 " />    
                        
            </div>
            
            <div className="flex align-middle bg-white p-2  flex-col justify-center
             rounded-xl grad-trans
            shadow shadow-orange-300
            hover:scale-110 transition-all" title="Admin Login" onClick={navigateAdmin}>
                <h1 className="mr-auto ml-auto loghead text-4xl drop-shadow-[0_1.2px_1.2px_rgba(249,115,22,0.2)]
                ">Admin</h1>
                    <img src={admin} alt="Admin" className="z-10 " />
            </div>
            
            
        </div>
        <Brand/>
            
</div>
    );
}