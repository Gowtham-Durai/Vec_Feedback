import img from "../assets/VEC/staff.svg"
import Brand from "./Custom/Brand";
import FInput from "./Custom/Finput";
import FButton from "./Custom/FButton";
import LoginImg from "./Custom/LoginImg";
import FSelect from "./Custom/FSelect";
import { useEffect, useState } from "react";
import { isObjectEmpty } from "./Custom/includes";
import Swal from 'sweetalert2';
import AuthenRedirect from "./Security/AuthenRedirect";
import { useNavigate } from "react-router-dom";
import {Request} from "./Security/Request";
import { GET } from "./Security/Request";
import Navigate from "./Navigate";
export default function StudentLogin(){

const authen= AuthenRedirect("StaffLogin","staffLogin");
const navigate=useNavigate();
const [form,setForm]=useState({ Course:[],Dept:[],Sec:[],Sem:[]});
const [PostForm,setPostForm]=useState({ "No of Subjects":"",Course:"",Dept:"",Sem:"",Sec:""});
const [semsec,setSemSec]=useState([]);

const handleChange = (e) => {
    var name=e.target.name;
    var value=e.target.value;
    let sem,sec,temp;
    switch(name){
        case "Dept":
            sem = [...Array(parseInt(semsec[1][value]))].map((_, index) => index + 1);
            sec = [...Array(parseInt(semsec[2][value]))].map((_, index) => String.fromCharCode(65 + index));

            
            setSemSec(f=>{return {...f ,newsem:sem,newsec:sec}});
            setForm(f=>{return {...f ,Sem:[],Sec:[],Subject:[]}});
            temp=form[name][value];
            break;
        case "Subject":
            setPostForm(f=>{return {...f ,subno:value}});
            temp=form[name][value];
            break;    
        case "No of Subjects":temp=value;break;
        default: temp=form[name][value];
    }

    
      
    setPostForm(f=>{return {...f ,[name]:temp}});
}
const blocksubmit=(e)=>{
    
    e.preventDefault();
    
    if(isObjectEmpty(PostForm)){
        
        Request({request:"CheckStaffUpdate",input:PostForm},
        "",(data)=>{
            
            switch(data["msg"]){
                case 0:
                    sessionStorage.setItem("subjectDetail",JSON.stringify({...PostForm,overrite:false}));
                    navigate("/StaffSubject");
                    break;
                case 1:
                    Swal.fire({   
                        title: "Subjects Already Updated",   
                           text: "Do you want to Override ?",   
                           icon: "warning",   
                           showCancelButton: true,      
                           confirmButtonColor: "#DD6B55",   
                           confirmButtonText: "Override",   
                           cancelButtonText: "Cancel",   
                           customClass: "Custom_Cancel"
                        
                       
                        }).then((result) => { 
                            if (result.isConfirmed) { 
                                // Handle confirmation button click 
                                
                                // Request({request:"StaffUpdateConform",input:PostForm},
                                // "Overriting Subject",()=>{
                                    
                                    sessionStorage.setItem("subjectDetail",JSON.stringify({...PostForm,overrite:true }));
                                    navigate("/StaffSubject")
                                    // },);
                                
                            } else if (result.dismiss === Swal.DismissReason.cancel) { 
                                // Handle cancel button click 
                                window.location.reload();
                            } 
                        }); 
                    break;
                case 2:
                    PostForm["retrive"]=true;
                    sessionStorage.setItem("subjectDetail",JSON.stringify({...PostForm,overrite:false}));
                    navigate("/StaffSubject");
                    break;
       
           
        }
    }
         );
        
            
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
const handleSem=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    let temp=form[name][value];
    let temp2=form["Sec"];
    setPostForm(f=>{return {...f ,[name]:temp}});

    
    setForm(values => {return { ...values,Sec:[],Subject:[]};});  
    setSemSec(values => {return { ...values,newsec:temp2}});
    
}
useEffect(()=>{
        
    if(semsec && semsec.length > 0 && form["Dept"].length==0){
        setForm(values => {return { ...values, Dept:semsec[0] };});   
      
    }
    else if( form["Dept"].length!=0 && form["Sem"].length==0){
        
        setForm(f=>{return {...f ,Sem:semsec["newsem"],Sec:semsec["newsec"]}});
    
    }
    else if( form["Sem"].length!=0 && form["Sec"].length==0){
        
        setForm(f=>{return {...f ,Sec:semsec["newsec"]}});  
      
    }
    
  },[semsec]);             
           
useEffect(()=>{
            GET("course",
                (data)=>{setForm(values => {return { ...values, Course: data["course"] };});                        }
            );
        
             },[authen]);
    
    return (
        (authen!=null)&&(<div className="login  h-[88%] max-sm:h-[90%]  sm:p-2 flex justify-center ">
            <Navigate to="mainportal" />
                <div className="border-2 border-orange-300 overflow-hidden max-sm:border-0 bg-white shadow-sm h-full rounded-3xl w-full sm:w-[70%] flex relative grad-trans ">
                    <LoginImg img={img}/>
                    <div className=" w-3/5 p-7 max-sm:p-5 max-md:w-full max-md:absolute ">                    
                            <form action="POST" onSubmit={blocksubmit} className="flex flex-col h-full">
                            
                            <h1 className="loghead  mb-2 text-5xl text-center text-orange-400">Staff Updation</h1>
                            <div className=" h-full flex flex-col justify-center ">
                                
                                <FInput placeholder="No of Subjects" onChange={handleChange} type="number" min="1" max={25} />
                                <div className="grid grid-cols-2">
                                <FSelect placeholder="Course" onChange={handleCourse} list={form["Course"] }/>
                                <FSelect placeholder="Dept" onChange={handleChange} list={form["Dept"] }/>
                                <FSelect placeholder="Sem" onChange={handleSem} list={form["Sem"]}/>  
                                <FSelect placeholder="Sec" onChange={handleChange} list={form["Sec"]}/>
                                </div>
                                <FButton >
                            
                                UPDATE
                            
                            
                                    
                                    </FButton>
                            </div>
                            </form>
                    </div>
                </div>
                <Brand/>
                    
        </div>)
            );
    


}


