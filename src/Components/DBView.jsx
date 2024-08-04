import AuthenRedirect from "./Security/AuthenRedirect";
import FSelect from "./Custom/FSelect";
import { useState,useEffect } from "react";
import { GET } from "./Security/Request";
import FButton from "./Custom/FButton";
import { GoDatabase } from "react-icons/go";
import Swal from 'sweetalert2';
import { isObjectEmpty } from "./Custom/includes";
import { Request } from "./Security/Request";
import Navigate from "./Navigate";
export default function DBView(){
    const authen=AuthenRedirect("AdminLogin","admin");
    const [form,setForm]=useState({ Course:[],Dept:[],Sem:[]});
    const [PostForm,setPostForm]=useState({ Course:"",Dept:"",Sem:""});
    const [sem,setSem]=useState([]);
    const [view,setView]=useState({});

    const handleChange = (e) => {
        var name=e.target.name;
        var value=e.target.value;
       
        if(name=="Dept"){
            
            let s = [...Array(parseInt(sem[1][value]))].map((_, index) => index + 1);
            
            setForm(f=>{return {...f ,Sem:s}});
            
        }
        value=form[name][value];
        setPostForm(f=>{return {...f ,[name]:value}});
}
function handleCourse(e){
    GET("dept-"+form[e.target.name][e.target.value],
        (data)=>{data=data["dept-"+form[e.target.name][e.target.value]];
                setSem( [data[0],data[1]]);
                setPostForm(f=>{return {...f ,"Course":form["Course"][e.target.value], Dept:"",Sem:""}});
                setForm(values => {return { ...values, Dept:[],Sem:[]};});  
            },true)
}
useEffect(()=>{
    
if(sem.length > 0 && form["Dept"].length==0){
    setForm(values => {return { ...values, Dept:sem[0] };});   
}
},[sem]);             

function getDetails(e){
    e.preventDefault();
    
    if(isObjectEmpty(PostForm)){
        Request({request:"get/getView",input:PostForm},
        "",(data)=>{setView(data["view"])},
        "Error",()=>{}
         );
    
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
            GET("course",
                (data)=>{setForm(values => {return { ...values, Course: data["course"] };});                        }
            );
        
             },[authen]);

    return authen &&(
   <div className=" w-full flex flex-col items-center">
    
     <div >
     
       <form className="flex w-fit items-center  h-20" onSubmit={getDetails} method="post">
       <Navigate to="AdminPortal" />
        <FSelect placeholder="Course" onChange={handleCourse} list={form["Course"] }/>
            <FSelect placeholder="Dept" onChange={handleChange} list={form["Dept"] }/>
            <FSelect placeholder="Sem" onChange={handleChange} list={form["Sem"]}/>  
            <FButton style={{margin:0}}  ><GoDatabase /></FButton>
       </form>
                               
    </div>
        
    <div className="flex w-[88%] flex-wrap justify-center">
   {
    Object.keys(view).map((sec,idx)=>{
        return <table key={idx} className="shadow-sm shadow-orange-300 w-96 text-center bg-white text-slate-500 viewtable">
        <thead className=" ">
         <tr className="bg-orange-500 text-white"  >
            <th className="p-2" colSpan={2}>{sec}</th>
         </tr>
         <tr className=" text-red-600 spec">
            <th className="p-2 " >Subject</th>
            <th className="p-2" >Staff</th>
         </tr>
        </thead>
        <tbody>
            {
                view[sec].map((row,idx)=>{
                return <tr key={idx}>

                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                </tr>
                })
            }
          
        </tbody>
    </table>
    })

   }

        

       

    </div>
   </div>
    );
}