import img from "../../assets/VEC/admin.svg"
import Brand from "../Custom/Brand";
import FInput from "../Custom/Finput";
import FButton from "../Custom/FButton";
import LoginImg from "../Custom/LoginImg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenRedirect from "./AuthenRedirect";
import {Request} from "./Request";
import Navigate from "../Navigate";
import {isObjectEmpty} from "../Custom/includes"
import Swal from "sweetalert2";
export default function NewAdmin(){

    AuthenRedirect("AdminLogin","admin");
    const [inputs,setInputs]=useState({});
    const navigate=useNavigate();
    const blocksubmit=(e)=>{
            e.preventDefault();
            
            if(isObjectEmpty(inputs)){
                 if(inputs["New Password"] == inputs["Password Again"]){
                    Request({request:"CreateAdmin",input:inputs},
            "New Admin Access Created",()=>{navigate("/adminPortal")},
            "Failed to Create New Admin Access",()=>{},
             );
          
                 }
                 else{
                    Swal.fire({
                        icon:"warning",
                        title:"Passwords are not same",
                        showConfirmButton:false,
                        
                    })
                 }
            
            }
           
    }
   
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInputs(values=>({...values,[name]:value}));
    }
    
    
    return (
<div className="login  h-[88%] max-sm:h-[90%] p-3 sm:p-3 flex justify-center ">
        <Navigate to="AdminPortal" />
        <div className="border-2 border-orange-300 grad-trans overflow-hidden max-sm:border-0  h-full rounded-3xl w-full sm:w-[70%] flex relative ">
            <LoginImg img={img}/>
            <div className=" w-3/5 p-3 max-sm:p-5 max-md:w-full max-md:absolute ">                    
                    <form action="" onSubmit={blocksubmit}   className="flex flex-col h-full justify-center">
                    <h1 className="loghead mb-5 text-5xl text-center text-orange-400">New Admin Access</h1>
                    <div className="flex flex-col justify-center">
                        
                        <FInput placeholder="New Password"  onChange={handleChange} type="password" autoComplete="ON " />
                        <FInput placeholder="Password Again" type="password" autoComplete="ON " onChange={handleChange} />
                        <FButton >CREATE</FButton>
                    </div>
                    </form>
            </div>
        </div>
        <Brand/>
            
</div>
    );
}


