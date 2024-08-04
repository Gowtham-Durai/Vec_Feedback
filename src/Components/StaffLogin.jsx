import img from "../assets/VEC/staff.svg"
import Brand from "./Custom/Brand";
import FInput from "./Custom/Finput";
import FButton from "./Custom/FButton";
import LoginImg from "./Custom/LoginImg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Request} from "./Security/Request";
import Navigate from "./Navigate";
export default function StaffLogin(){
    
    const [inputs,setInputs]=useState({});
    const navigate = useNavigate();
    const authen=sessionStorage.getItem("StaffLogin")=="true";

    const blocksubmit=(e)=>{
            e.preventDefault();

            Request({request:"Stafflogin",input:inputs},
            "Staff Login Success",()=>{sessionStorage.setItem("StaffLogin",true);navigate("/staff");},
            "Invalid User",()=>{sessionStorage.setItem("StaffLogin",false);}
             );

    }

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInputs(values=>({...values,[name]:value}));
        
    }
    useEffect(()=>{
        if(authen)
            navigate("/staff");
    },[navigate,authen]);
return (!authen)&&(
        <div className="login  h-[88%] max-sm:h-[90%] p-3 sm:p2 flex justify-center ">
                <Navigate to="/mainportal"/>
                <div className="border-2 border-orange-300 overflow-hidden max-sm:border-0 h-full grad-trans rounded-3xl w-full sm:w-[70%] flex relative ">
                
                    <LoginImg img={img}/>
                    <div className=" w-3/5 p-10 max-sm:p-5 max-md:w-full max-md:absolute ">                    
                            <form method="POST" onSubmit={blocksubmit} className="flex flex-col h-full">
                            <h1 className="loghead mb-5 text-5xl text-center text-white">Staff Login</h1>
                            <div className="h-full flex flex-col justify-center">
                                <FInput placeholder="Username" onChange={handleChange}/>
                                <FInput placeholder="Password" type="password" onChange={handleChange}/>
                                <FButton >LOGIN</FButton>
                            </div>
                            </form>
                    </div>
                </div>
                <Brand/>
                    
        </div>
            );
}