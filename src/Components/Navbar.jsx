import logo from "../assets/VEC/old/velammalold.png"

import { RiLogoutBoxLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";
import  { memo } from "react";


const ImageComponent = memo(({ onClick }) => {
    return (
        <img
            src={logo}
            alt="logo"
            onClick={onClick}
            className="h-full absolute logo top-0"
        />
    );
});

ImageComponent.displayName="ImageComponent";
export default function Navbar(){
    
   
    const navigate=useNavigate();
    function logout(){
    
        sessionStorage.clear();
        Swal.fire({
            icon:"success",
            title:"Logout success",
            timer:1000,
            showConfirmButton:false,
        }).then(()=>{
        navigate("mainportal");
        });
        
    }
    const path = window.location.pathname; 
    const pathSegments = (path.split('/').filter(Boolean)[1] ?? ''); 
   const excludedPaths = ["staff","newstaff","newadmin","staffLogin","staffsubject","create","feedtruncate","adminportal","resultdetails","result","view","Create"];
   const loc=excludedPaths.includes(pathSegments.toLocaleLowerCase());
   
    
    return (
        <div title="Logout" className="nav p-[0.3rem] shadow-sm shadow-orange-300 h-[12%] relative bg-white
                        max-sm:h-[10%]  w-full inline-flex justify-between align-middle items-center grad-trans nav-no rounded-none">
             <LazyLoad>
                <ImageComponent src={logo} onClick={()=>{navigate("/")}}/>
             </LazyLoad>
             {loc&&(<button onClick={logout} className=" h-fit bg-white p-2 text-orange-500 shadow-md  rounded-md tracking-wider">
             <RiLogoutBoxLine  className=" text-xl"/> 
             </button>)}
        </div>
        );}