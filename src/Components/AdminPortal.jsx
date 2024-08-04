
import img from "../assets/VEC/admin.svg"
import Brand from "./Custom/Brand";
import FButton from "./Custom/FButton";
import LoginImg from "./Custom/LoginImg";
import AccessBtn from "./Custom/AccessBtn";
import { BsDatabaseSlash } from "react-icons/bs";
import AuthenRedirect from "./Security/AuthenRedirect";
import {  useNavigate } from "react-router-dom";
import Navigate from "./Navigate"
import {Request} from "./Security/Request";
import { GoDatabase } from "react-icons/go";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdGroupRemove } from "react-icons/md";


import Swal from "sweetalert2";

const handleReset=()=>{
    Swal.fire({   
        title: "Do you want to Reset DataBase ?",   
           
           icon: "warning",   
           showCancelButton: true,      
           confirmButtonColor: "#DD6B55",   
           confirmButtonText: "RESET",   
           cancelButtonText: "CANCEL",   
           customClass: "Custom_Cancel"
        
       
        }).then((result) => { 
            if (result.isConfirmed) { 
                // Handle confirmation button click 
                 Request({request:"ResetDB"},
            "Reseting Database Completed",()=>{},
            "Error Reseting Database",()=>{});

            }
        }); 


        }

const handleMultiTruncate=()=>{
    Swal.fire({   
        title: "Do you want to Remove All Feedbacks ?",   
           
           icon: "warning",   
           showCancelButton: true,      
           confirmButtonColor: "#DD6B55",   
           confirmButtonText: "REMOVE",   
           cancelButtonText: "CANCEL",   
           customClass: "Custom_Cancel"
        
       
        }).then((result) => { 
            if (result.isConfirmed) { 
                // Handle confirmation button click 
                 Request({request:"clearResponse"},
            "Removing Feedback Successful",()=>{},
            "Error Removing Feedback",()=>{});

            } 
        }); 

}

const blocksubmit=(e)=>e.preventDefault();


 
export default function AdminPortal() { 
    

    
   const authen=AuthenRedirect("AdminLogin","admin");
   const navigate=useNavigate();
   
   const handleView=()=>navigate("/View");
   const StaffAccess=()=>navigate("/newStaff");
   const AdminAccess=()=>navigate("/newAdmin");
   const CreateCD=()=>navigate("/Create");
   const FeedbackResult=()=>navigate("/ResultDetails");
   const handleSingleTruncate=()=>navigate("/FeedTruncate");



    return (
       (authen!=null)&&( <div className="login  h-[88%] max-sm:h-[90%]  sm:p-2 flex justify-center ">
        
        <Navigate to="/mainportal"/>
        <div className="border-2 border-orange-300 grad-trans overflow-hidden max-sm:border-0  h-full rounded-3xl w-full sm:w-[70%] flex relative ">
        
            <LoginImg img={img}/>
            <div className=" w-3/5 p-3 max-sm:p-5 max-md:w-full max-md:absolute ">                    
                    <form action="POST" onSubmit={blocksubmit} className="flex flex-col h-full justify-center gap-3">
                       
                       <AccessBtn  icon ="staff" onClick={StaffAccess}>Create Staff Access</AccessBtn>
                        <AccessBtn  icon="reset" onClick={AdminAccess}>Change Admin Access</AccessBtn>
                        <AccessBtn  icon="add" onClick={CreateCD}>Create Course & Dept</AccessBtn>
                        <div className="grid grid-cols-[70%_13%_13%] gap-2">
                            <AccessBtn  icon="feedback" onClick={FeedbackResult}> Feeedback Result</AccessBtn>
                            <FButton onClick={handleSingleTruncate} > <IoPersonRemoveSharp className=" text-3xl font-semibold" /></FButton>
                            <FButton onClick={handleMultiTruncate} > <MdGroupRemove  className=" text-3xl font-semibold" /></FButton>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-5">
                        <FButton style={{margin:0}}   onClick={handleView}><GoDatabase />VIEW</FButton>
                        <FButton onClick={handleReset} > <BsDatabaseSlash className=" text-3xl font-semibold" /> RESET</FButton>
                      
                        </div>
                    </form>
                    
            </div>
        </div>
        <Brand/>
            
</div>)
    );    
}

