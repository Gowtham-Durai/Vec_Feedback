import img from "../assets/VEC/admin.svg"
import Brand from "./Custom/Brand";
import FInput from "./Custom/Finput";
import FButton from "./Custom/FButton";
import LoginImg from "./Custom/LoginImg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Request} from "./Security/Request";
import Navigate from "./Navigate";
export default function AdminLogin(){

    const [inputs,setInputs]=useState({});
    const navigate=useNavigate();
    const authen=sessionStorage.getItem("AdminLogin")=="true";

    useEffect(()=>{
        if(authen)
            navigate("/adminPortal");
    },[authen,navigate]);

    const blocksubmit=(e)=>{
            e.preventDefault();

            Request({request:"Adminlogin",input:inputs},
                    "Admin Login Success",()=>{sessionStorage.setItem("AdminLogin",true);navigate("/adminPortal");},
                    "Invalid User",()=>{sessionStorage.setItem("AdminLogin",false);}
            );
            


        }

    
   
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInputs(values=>({...values,[name]:value}));

    }
    
    
    return (!authen)&&(
<div className="login  h-[88%] max-sm:h-[90%] p-3 sm:p-3 flex justify-center ">
    <Navigate to="/mainportal"/>
        <div className="border-2 border-orange-300 overflow-hidden max-sm:border-0 grad-trans h-full rounded-3xl w-full sm:w-[70%] flex relative ">
            <LoginImg img={img}/>
            <div className=" w-3/5 p-10 max-sm:p-5 max-md:w-full max-md:absolute ">                    
                    <form action="" onSubmit={blocksubmit}   className="flex flex-col h-full">
                    <h1 className="loghead mb-5 text-5xl text-center text-orange-400">Admin Login</h1>
                    <div className="h-full flex flex-col justify-center">
                        
                        <FInput placeholder="Username" onChange={handleChange} autoComplete="ON " />
                        <FInput placeholder="Password" type="password" autoComplete="ON " onChange={handleChange} />
                        <FButton >LOGIN</FButton>
                    </div>
                    </form>
            </div>
        </div>
        <Brand/>
            
</div>
    );
}


