import img from "../assets/VEC/admin.svg"
import FSelect from "./Custom/FSelect";
import Brand from "./Custom/Brand";
import FInput from "./Custom/Finput";
import FButton from "./Custom/FButton";
import LoginImg from "./Custom/LoginImg";
import { IoSchoolOutline } from "react-icons/io5"
import { TbHierarchy2 } from "react-icons/tb";
import { useEffect } from "react";
import {isObjectEmpty} from "./Custom/includes"
import { useState } from "react";
import Swal from "sweetalert2";
import AuthenRedirect from "./Security/AuthenRedirect";
import { GET,Request} from "./Security/Request";
import Navigate from "./Navigate";
export default function CreateCourseDept(){
    
    const authen=AuthenRedirect("AdminLogin","admin");
    //get Courses from db
    const [course,setCourse]=useState([]);
    //some states needed
    const [input,setInputs]=useState({Course:""});
    const [createCourse,setCreateCourse]=useState({});

    const blocksubmit=(e)=>{
        e.preventDefault();
        if(isObjectEmpty(input)){
            
            Request({request:"NewDept",input:input},
            "Dept Created successfully",()=>{window.location.reload();},
            "Error Creating Dept",()=>{sessionStorage.setItem("StaffLogin",false);}
             );
        }
       else{
        Swal.fire({
            icon:"warning",
            timer:900,
            title:"Empty Field Detected",
            showConfirmButton:false,
        });
       }
   
}

function handleCourse(e){
    let cname=e.target.name;
    let cvalue=e.target.value;
    setCreateCourse(values=>({...values,[cname]:cvalue}));
}
function NewCourse(e){   
    
    e.preventDefault();
    if(isObjectEmpty(createCourse)){

        Request({request:"NewCourse",input:createCourse},
        "Course Created successfully",()=>{window.location.reload();},
        "Failed to Create Course",()=>{},
        "Duplicate Course",()=>{window.location.reload();}
         );
 }  
 else{
    Swal.fire({
        icon:"warning",
        timer:900,
        title:"Empty Field Detected",
        showConfirmButton:false,
    });
 }
}
useEffect(()=>{
    GET("course",(data)=>{setCourse(data["course"]);},true);
},[authen]);
const handleChange=(e)=>{
    
    const name=(e.target.name).replaceAll(" ","");
    let value=e.target.value;
    if(name=="Course"){
        value=course[value];
    }
    setInputs(values=>({...values,[name]:value}));
    
}
    return (
        <div className="login  h-[88%] max-sm:h-[90%] p-3 sm:p-3 flex justify-center gradi ">
            <Navigate to="AdminPortal" />
                <div className=" overflow-hidden grad-trans h-full rounded-3xl w-full sm:w-[70%] flex relative ">
                    <LoginImg img={img}/>
                    <div className=" w-3/5  pl-3 pr-3  max-sm:p-5 max-md:w-full max-md:absolute flex flex-col justify-center  ">                    
                           
                            <h1 className=" loghead mb-5 text-5xl text-center text-orange-400 text-ellipsis overflow-hidden whitespace-nowrap	"> Course & Dept</h1>
                            <div className="grid gap-0">
                            
                            <form action="POST" onSubmit={NewCourse}   className="h-full grid grid-cols-2  ">
                                    <FInput  placeholder="Course" onChange={handleCourse}  />
                                    <div className="m-auto w-full"><FButton ><IoSchoolOutline />COURSE</FButton></div>
                            </form>
                            
                            <form action="" onSubmit={blocksubmit}   className="grid">
                                <div className="grid grid-cols-3 ">
                                    
                                <FSelect placeholder="Course" onChange={handleChange} list={course}/>
                                <FInput placeholder="Semesters"  onChange={handleChange}  className="mr-0 ml-0" type="number" min={1} max={30} />
                                <FInput placeholder="Sections"   onChange={handleChange} className="ml-1" type="number" min={1} max={10} />
                                </div>
                                <div className=" grid grid-cols-2 w-full">   
                                    <FInput placeholder="Dept Full name" onChange={handleChange}  />
                                    <FInput placeholder="Dept Abre" onChange={handleChange}  />
                                </div>

                            <div className="h-5"><FButton ><TbHierarchy2 />DEPT</FButton></div>
                            </form>

                            </div>
                            
                    </div>
                </div>
                <Brand/>
                    
        </div>
            );
}










 
                             