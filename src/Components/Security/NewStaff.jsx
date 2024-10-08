import img from "../../assets/VEC/staff.svg"
import Brand from "../Custom/Brand";
import FInput from "../Custom/Finput";
import FButton from "../Custom/FButton";
import LoginImg from "../Custom/LoginImg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenRedirect from "./AuthenRedirect";
import {Request} from "./Request";
import Navigate from "../Navigate";
export default function NewStaff(){
    AuthenRedirect("AdminLogin","admin");
    // staff name and pwd will be stored in this     
    const [inputs,setInputs]=useState({});
    const navigate=useNavigate();

    // blocking the sumission and sended to 
    const blocksubmit=(e)=>{
            e.preventDefault();
                
            Request({request:"CreateStaff",input:inputs},
            "New Staff Access Created",()=>{navigate("/adminPortal")},
            "Failed to Create New Staff Access",()=>{}
             );
               
                    
        }

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInputs(values=>({...values,[name]:value}));
        
    }
return (
        <div className="login  h-[88%] max-sm:h-[90%] p-3 sm:p2 flex justify-center  ">
            <Navigate to="AdminPortal" />
                <div className="border-2 border-orange-300 grad-trans overflow-hidden max-sm:border-0 h-full rounded-3xl w-full sm:w-[70%] flex relative ">
                    <LoginImg img={img}/>
                    <div className=" w-3/5 p-3 max-sm:p-5 max-md:w-full max-md:absolute ">                    
                            <form method="POST" onSubmit={blocksubmit} className="flex flex-col h-full justify-center ">
                            <h1 className="loghead mb-5 text-5xl text-center text-orange-400">New Staff Access</h1>
                            <div className=" flex flex-col justify-center">
                                <FInput placeholder="Username" onChange={handleChange}/>
                                <FInput placeholder="Password" type="password" onChange={handleChange}/>
                                <FButton >CREATE</FButton>
                            </div>
                            </form>
                    </div>
                </div>
                <Brand/>
                    
        </div>
            );
}