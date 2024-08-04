import { useNavigate } from "react-router-dom";
import FButton from "./Custom/FButton";
import FInput from "./Custom/Finput";
import { useEffect, useState } from "react";
import { ordinal } from "./Custom/includes";
import {Request} from "./Security/Request";
import Navigate from "./Navigate";




export default function StaffSubjects(){
   
   
   const navigate=useNavigate();
   let value=JSON.parse(sessionStorage.getItem("subjectDetail"));
   const [subjects,setSubjects]=useState({});
   
   const [staffs,setStaffs]=useState({});
   const [yearStart,setyearStart]=useState();
   const [yearEnd,setyearEnd]=useState();



   useEffect(()=>{
    
    if(value==null)navigate("/staff");
    else{
        
        if(value["retrive"]==true){
            
            
        
            Request({request:"get/anySub",input:value},
            "",(data)=>{

                let tem={};
              
                data["sub"].map((item, index) => (tem[index] = item));              
                setSubjects(tem);
                setyearStart(data["yearStart"]);
                setyearEnd(data["yearEnd"]);
                
            }
             );
    
            }
        else{
                setyearStart(2020);
                setyearEnd(2024);
                let t={}
                for(var i=0;i<value["No of Subjects"];i++){
                    t[i]="";
                }
                setSubjects(t);
            }
    }
   },[]);

    
    function handleSubject(e,idx){
           setSubjects({...subjects,[idx]:e.target.value});
           
    }
    function handleStaff(e,idx){
        setStaffs({...staffs,[idx]:e.target.value}); 
    }    
    
    function handleYearStart(e){
        let val=e.target.value;
        if(val.trim()!=""){
            setyearStart(val);
        }
        else{
            setyearStart(0);
        }
        
        
    }
       
    function handleYearEnd(e){
        let val=e.target.value;
        
        if(val.trim()!="")
            setyearEnd(val);
        else setyearEnd(0);
    }
    function blockSubmit(e){
        e.preventDefault();

        
        const inputs={"Details":value,"Subjects":subjects,"Staffs":staffs,"yearStart":yearStart ,"yearEnd":yearEnd,
            "No of Subjects":subjects.length,
        };
        
        Request({request:"UpdateStaff",input:inputs},
        "Subject Updation Completed",()=>{ navigate("/staff");},
        "Operation unsuccessful",()=>{navigate("/staff");}
         );
               
    }

    return (
        (value!=null )&&(<div className="flex flex-col items-center pt-5 no-bg defaultClass ">
            <Navigate to="staff" /> 
            <h1 className="text-orange-500 text-3xl">VELAMMAL ENGINEERING COLLEGE</h1>
             <h1 className=" text-2xl">Staff and Subjects Updation</h1><br />

            

            <table className="text-left table-auto ">
                <thead className="subjectDetals">
                    <tr>
                        <th >Course:</th>
                        <th>{value["Course"]}</th>
                    </tr>
                    
                </thead>
                <tbody className="subjectDetals">
                <tr>
                        <td className="pr-10">Department:</td>
                        <td>{value["Dept"]}</td>
                    </tr>
                    <tr>
                        <td>Semester</td>
                        <td>{ordinal(value["Sem"])}</td>
                    </tr>
                    <tr>
                        <td>Section:</td>
                        <td>{value["Sec"]}</td>
                    </tr>
                    <tr>
                        <td>No of Subjects:</td>
                        <td>{value["No of Subjects"]}</td>
                    </tr>
                </tbody>
            </table>
        <br />
    <form action="POST" className=" m-auto  grid" onSubmit={blockSubmit}>
       <div className="flex justify-center">
            <div className="flex flex-row items-center">
            <h1 className="text-xl">Academic Year : </h1>
           <FInput placeholder="Year-Start" onChange={handleYearStart} min="2020" max="2100" type="number" 
                    value={yearStart} className=" shadow-none border-2 border-orange-500 "/>
            </div>
                
            <div className="flex flex-row items-center">
            <FInput placeholder="Year-End" onChange={handleYearEnd} min="2020" max="2100" type="number" 
                    value={yearEnd} className=" shadow-none border-2 border-orange-500 "/>
           
            </div>
       </div>

        <br />  
      
                    <div className="grid grid-cols-2">
                        <th className="text-xl">Subject Name</th>
                        <th className="text-xl">Staff Name</th>
                    </div>
                    { 
    Object.keys(subjects).map((v, i) => ( 
        <div key={i} className="grid grid-cols-2"> 
            <FInput 
                
                placeholder={`Subject-Name-${i + 1}`} 
                value={subjects[i] || ''} 
                onChange={(e) => handleSubject(e, i)} 
            /> 
            <FInput 
                placeholder={`Staff-Name-${i + 1}`} 
                value={staffs[i] || ''} 
                onChange={(e) => handleStaff(e, i)} 
            /> 
        </div> 
    )) 
} 
 
                
            <br />
            <div className="w-1/2 m-auto">
            <FButton style={{margin:"10px"}}>SUBMIT</FButton>
            </div>
        </form>

        </div>
    ));
}