import img from "../assets/VEC/student.svg"
import Brand from "./Custom/Brand";
import FInput from "./Custom/Finput";
import FButton from "./Custom/FButton";
import LoginImg from "./Custom/LoginImg";
import FSelect from "./Custom/FSelect";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";

import { isObjectEmpty } from "./Custom/includes";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { GET } from "./Security/Request";
import { useCallback } from "react";
import { Request } from "./Security/Request";
export default function StudentLogin(){

const navigate=useNavigate();
const [form,setForm]=useState({Name:"", Course:"",Dept:"",Sec:"",Sem:""});
const [PostForm,setPostForm]=useState({ Name:"",Course:"",Dept:"",Sec:"",Sem:""});
const [semsec,setSemSec]=useState([]);

const handleChange = useCallback((e) => {
    var name=e.target.name;
    var value=e.target.value;
  
    
    if(name!="Name"){
        if(name=="Dept"){
            let sem = [...Array(parseInt(semsec[1][value]))].map((_, index) => index + 1);
            
            let sec = [...Array(parseInt(semsec[2][value]))].map((_, index) => String.fromCharCode(65 + index));

            setForm(f=>{return {...f ,Sem:sem,Sec:sec}});
            
        }
        value=form[name][value];
       
    }
    
    
    setPostForm(f=>{return {...f ,[name]:value}});
},[form,semsec]);
const blocksubmit=(e)=>{
    
    e.preventDefault();
    
      if(isObjectEmpty(PostForm)){
        
        Request({request:"get/subCount",input:PostForm},"",
            (data)=>{
                if(parseInt(data["scount"])==0){
                    Swal.fire({
                        icon: "warning",
                        title: "Wait Until Subject Updation",
                        showConfirmButton: false,
                        timer: 3000
                    }).then(()=>{
                     window.location.reload();
                    });
                    
                }
                else{
             Swal.fire({
                    icon: "success",
                    title: "You are loging in",
                    showConfirmButton: false,
                    timer: 1000
                }).then(()=>{
                    var expire = new Date(); 
                    expire.setTime(expire.getTime() + (4 * 60 * 1000)); // 4 minutes Set expiration time to 2 minutes from now 
                    Cookies.set('name', PostForm["Name"], { expires: expire }); 
                    sessionStorage.setItem("studentDetails",JSON.stringify(PostForm));
                    // +PostForm["Name"]+"/"+PostForm["Course"]+"/"+PostForm["Sem"]+"/"+PostForm["Dept"]+"/"+PostForm["Sec"]
                    navigate("/feedback");
                });
                }

            }
        );
      
        
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Fill all your details",
            showConfirmButton: false,
            timer: 1000
          })
    }
       
}

function handleCourse(e){
        GET("dept-"+form[e.target.name][e.target.value],
            (data)=>{data=data["dept-"+form[e.target.name][e.target.value]];
                    setSemSec( [data[0],data[1],data[2]]);
                    setPostForm(f=>{return {...f ,"Course":form["Course"][e.target.value]}});
                    setForm(values => {return { ...values, Dept:[],Sem:[],Sec:[] };}); 
                    
                },true)
    }
  useEffect(()=>{
        
    if(semsec && semsec.length > 0 && form["Dept"].length==0){
        setForm(values => {return { ...values, Dept:semsec[0] };});   
        
      
    }
  },[semsec]);                  

useEffect(()=>{
        GET("course",
        (data)=>{setForm(values => {return { ...values, Course: data["course"] };});                        }
            );       
         },[]);

         
        
    return (
        <div className="login  h-[88%] max-sm:h-[90%]  sm:p-2 flex justify-center">
            
                <div className="border-2 border-orange-300 grad-trans overflow-hidden max-sm:border-0 h-full rounded-3xl w-full sm:w-[70%] flex relative ">
                    <LoginImg img={img}/>
                    <div className=" w-3/5 p-3 max-sm:p-5 max-md:w-full max-md:absolute ">                    
                            <form action="POST" onSubmit={blocksubmit} className="flex flex-col justify-center h-full  ">
                            
                            <h1 className="loghead  mb-5 text-5xl text-center text-orange-400 ">Student Login</h1>
                            <div className=" flex flex-col  ">
                                <FInput placeholder="Name" onChange={handleChange}/>
                                <FSelect placeholder="Course"  onChange={handleCourse} list={form["Course"] }/>
                                <div className="grid grid-cols-3">
                                <FSelect placeholder="Dept" onChange={handleChange} list={form["Dept"]}/>
                                <FSelect placeholder="Sec"  onChange={handleChange} list={form["Sec"]}/>
                                <FSelect placeholder="Sem" onChange={handleChange} list={form["Sem"]}/>  
                                </div>
                                <FButton >LOGIN</FButton>
                            </div>
                            </form>
                    </div>
                </div>
                <Brand/>
                    
        </div>
            );
}