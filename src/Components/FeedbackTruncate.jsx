import img from "../assets/VEC/admin.svg"
import Brand from "./Custom/Brand";
import FInput from "./Custom/Finput";
import FButton from "./Custom/FButton";
import LoginImg from "./Custom/LoginImg";
import FSelect from "./Custom/FSelect";
import { useEffect, useState } from "react";
import { isObjectEmpty, ordinal } from "./Custom/includes";
import Swal from 'sweetalert2';
import AuthenRedirect from "./Security/AuthenRedirect";
import {Request} from "./Security/Request";
import { GET } from "./Security/Request";
import Navigate from "./Navigate";
import { MdDelete } from "react-icons/md";
export default function FeedbackTruncate(){

    const authen=AuthenRedirect("AdminLogin","admin");

const [form,setForm]=useState({ Course:[],Dept:[],Sec:[],Sem:[]});
const [PostForm,setPostForm]=useState({Course:"",Dept:"",Sem:"",Sec:""});
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


function TruncateBySem(e){
    e.preventDefault();
    let { Sec, ...tempPost} = PostForm;

    if(isObjectEmpty(tempPost)){
        let detail=ordinal(PostForm["Sem"])+" Sem "+PostForm["Course"]+" "+PostForm["Dept"];
        Swal.fire({   
            title: "Do you want remove all  Feedbacks of '"+detail+"'",   
               
               icon: "warning",   
               showCancelButton: true,      
               confirmButtonColor: "#DD6B55",   
               confirmButtonText: "REMOVE",   
               cancelButtonText: "CANCEL",   
               customClass: "Custom_Cancel"
            
           
            }).then((result) => { 
                if (result.isConfirmed) { 
                    
                     Request({request:"clearResponseBySem",input:PostForm},
                "Removing Feedback Successful",()=>{window.location.reload()},
                "Error Removing Feedback",()=>{});
    
                } 
            }); 
    
    }
    else{
        Swal.fire({
            icon:"warning",
            timer:900,
            title:"Fill All Fields",
            showConfirmButton:false,
        });
    }
}

function TruncateBySec(e){
    e.preventDefault();
    if(isObjectEmpty(PostForm) ){
        let detail=ordinal(PostForm["Sem"])+" Sem "+PostForm["Course"]+" "+PostForm["Dept"]+"-"+PostForm["Sec"];
        Swal.fire({   
            title: "Do you want remove all  Feedbacks of '"+detail+"'",   
               
               icon: "warning",   
               showCancelButton: true,      
               confirmButtonColor: "#DD6B55",   
               confirmButtonText: "REMOVE",   
               cancelButtonText: "CANCEL",   
               customClass: "Custom_Cancel"
            
           
            }).then((result) => { 
                if (result.isConfirmed) { 
                    
                     Request({request:"clearResponseBySec",input:PostForm},
                "Removing Feedback Successful",()=>{window.location.reload()},
                "Error Removing Feedback",()=>{});
    
                } 
            }); 
    
    }
    else{
        Swal.fire({
            icon:"warning",
            timer:900,
            title:"Fill All Fields",
            showConfirmButton:false,
        });
    }
    
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
            <Navigate to="adminPortal" />
                <div className="border-2 border-orange-300 overflow-hidden max-sm:border-0 bg-white shadow-sm h-full rounded-3xl w-full sm:w-[70%] flex relative grad-trans ">
                    <LoginImg img={img}/>
                    <div className=" w-3/5 p-7 max-sm:p-5 max-md:w-full max-md:absolute flex flex-col justify-center">                    
                            
                            
                            <h1 className="loghead  mb-8 text-5xl text-center text-orange-400">Remove Feedbacks</h1>
                            <div className=" flex flex-col ">
                                
                              
                            <form className=" w-full items-center  " onSubmit={TruncateBySem} method="post">
                                <div className="grid w-full grid-cols-3">
                                    <FSelect placeholder="Course" onChange={handleCourse} list={form["Course"] }/>
                                    <FSelect placeholder="Dept" onChange={handleChange} list={form["Dept"] }/>
                                    <FSelect placeholder="Sem" onChange={handleSem} list={form["Sem"]}/>  
                                </div>
                                
                                <FButton ><MdDelete /></FButton>
                            </form>
                               
                            <form className="w-full items-center grid grid-cols-2  h-20" onSubmit={TruncateBySec} method="post">
                
                                <FSelect placeholder="Sec" onChange={handleChange} list={form["Sec"]}/>
                                <FButton style={{margin:0}}  ><MdDelete /></FButton>
                             </form>
                            </div>
                            
                    </div>
                </div>
                <Brand/>
                    
        </div>)
            );
    


}


