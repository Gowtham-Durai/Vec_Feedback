
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FButton from "./Custom/FButton";
import {Request} from "./Security/Request";
import { convertToRoman, ordinal } from "./Custom/includes";
import exportImg from "./Security/exportImg";
import Navigate from "./Navigate";
import jsPDF from "jspdf";
import Swal from "sweetalert2";

 export default function FeedbackResult(){
 
     
    let value=JSON.parse(sessionStorage.getItem("resultDetails"));
   const navigate=useNavigate();
 //One time data Retrival
    const [respond,setRespond]=useState();
    const [staff,setStaff]=useState([]);
    const [sub,setSub]=useState([]);
    const [academic_year,setAcademic_Year]=useState();
    const contents=[
        "1. PLANNING AND ORGANISATION",
        "1.1 Teacher Comes to the class in time",
        "1.2 Teaching is well planned",
        "1.3 Aims/Objectives made clear",
        "1.4 Subject matter organised in logical sequence",
        "1.5 Teacher comes Well prepared in the Subject",
  
        "2. PRESENTATION / COMMUNICATION",
        "2.1 Teacher speaks clearly and audibly",
        "2.2 Teacher writes and draws legibly",
        "2.3 Teacher provides examples of concepts / principles explanations are clear and effective",
        "2.4 Teacher's pace and level of institution are suited to the attainment of students",
        "2.5 Teacher offers assistance and counselling to the needy students",
  
        "3. STUDENTS PARTICIPATION",
        "3.1 Teacher asks questions to promote interaction and reflective thinking",
        "3.2 Teacher encourages questioning / raising doubts by students and answers them well",
        "3.3 Teacher enxures learner activity and problem solving ability in the class",
        "3.4 Teacher encourages, compliments and praises originality and creativity displayed by the students",
        "3.5 Teacher is courteous and impartial in dealing with the students",
  
        "4. CLASS MANAGEMENT / ASSESSMENT OF STUDENT",
        "4.1 Teacher engages classes regularly and maintains discipline",
        "4.2 Teacher covers the syllabus completely and at appropriate pace",
        "4.3 Teacher hold tests regularly which are helpful to students in building up confidence in their acquistion and application of knowledge",
        "4.4 Teacher's evaluation of scripts is fair and impartial",
        " 4.5 Teacher is prompt in valuing and returning the answer scripts"
      ];

    let [current,setCurrent]=useState(0);
    
    const [responses,setResponses]=useState(null);
    
async function  nextResponses(cur){
    Request({request:"getResponses","input":{...value,"subno":cur,"Sub":sub.length} },
        "",(data)=>{setResponses(data);});
}
function getSubjects(){
    Request({request:"get/getSubject",input:value},"",
        (data)=>{
              
            if(data["sub"].length==0){
                            
                Swal.fire({
                    icon:"warning",
                    title:"No Details Detected",
                    showConfirmButton:false,
                });
                navigate("/ResultDetails");
            }
         
            setSub(data["sub"]);   
            setStaff(data["staff"]);
            })
}
function GetAllResponses(cur){                    
                    Request({request:"getResponses","input":{...value,"subno":cur ,"Sub":sub.length} },
                        "",(data)=>{
                            setResponses(data);
                             
                        });

    }

const Next=()=>{
    if(current+1<sub.length){
        GetAllResponses(current+1);
        setCurrent(cur=>cur+1);
    }
}

const Prev=()=>{
    if(current-1>=0){
        GetAllResponses(current-1);
        setCurrent(cur=>cur-1);
    }
}
useEffect(()=>{
        if(value==null)
            navigate("/admin");
        else{
            Request({request:"get/respond","input":{...value,"Subject":sub[0]} },
                "",(d)=>{ 
                    setRespond(d["respond"]); 
                    if(d["respond"]==0){
                        Swal.fire({
                            icon:"warning",
                            title:"Wait until Student",
                            showConfirmButton:false,
                            timer:2000,
                        });
                        navigate("/ResultDetails");
                    }
                    else{
                            Request({request:"get/year",input:value},"",(data)=>{
                                setAcademic_Year(data["year"])
                        });
                        GetAllResponses(current);
                        getSubjects();
                    }       
                });
        
      }
    },[]);

async function exports(){
    // await nextResponses(0);

        Swal.fire({
            title: "Generating Feedback PDF ",
            allowOutsideClick:false,
            didOpen: async() => {
                Swal.showLoading();
                
                const fetchDataPromise =await _exportPDF();

                try {
                // Wait for both timer and fetchDataPromise to resolve
                await Promise.all([fetchDataPromise]);
                } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error if needed
                } finally {
                Swal.close();
                }
            },
        
            })
                
                
    
}


  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function _exportPDF(imgData) {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
    });
    
    const len = sub.length; // Assuming sub is defined somewhere
  
    for (let i = 0; i < len; i++) {
        setCurrent(i);
        await nextResponses(i);
       
        imgData = await exportImg(); // Assuming exportImg() is an async function
        
      if(i!=0){
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.addPage();
    }
       
        
          
        
        
    }
    // 
    imgData = await exportImg(); // Assuming exportImg() is an async function
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    
    const fileName = `${ordinal(value["Sem"])}_Sem-${value["Course"]}-${value["Dept"]}-${value["Sec"]}.pdf`;
    pdf.save(fileName);

    setCurrent(0); // Assuming setCurrent() does not return a promise
    GetAllResponses(0); // Assuming GetAllResponses() does not return a promise

   
}





let count=-1;
function displayContent(str,idx){
    if(idx==0 || idx%6==0)
        return( <tr key={idx}>
                <td colSpan={10}>{str}</td>
                </tr>)
    else {
    count+=1;
    return (
        <tr key={idx}>
            <td className="min-w-[400px]"><p>{str}</p></td> 
            <td><p>{respond}</p></td>
            <td><p>{responses && responses[`${count}${0}`]}</p></td>
            <td><p>{responses && responses[`${count}${1}`]}</p></td>
            <td><p>{responses && responses[`${count}${2}`]}</p></td>
            <td><p>{responses && responses[`${count}${3}`]}</p></td>
            <td><p>{responses && responses[`${count}${4}`]}</p></td>
            <td><p>{responses && responses[`${count}${5}`]}</p></td>
            <td></td>
            <td></td>
        </tr>
    );
            }
    
    }
   return (value!=null)&&(
    <div>
         <Navigate to="ResultDetails" except="true" />
       <div className="absolute w-full no-bg">
            {(current!=0 )&&<FButton  classstyle="ml-5 mt-10  text-sm p-2 float-left" style={{width:"fit-content"}} onClick={Prev}>PREVIOUS</FButton>  }
            {(current!=sub.length-1 ) && <FButton  classstyle="mr-5 mt-10  text-sm p-2 float-right " style={{width:"fit-content"}} onClick={Next}>NEXT</FButton>  }
       </div>
   <div className="overflow-x-auto grid  defaultClass " id="capture">
  
        <div className="p-10">
        <div className="text-center ">
            <h1 className=" text-3xl ">VELAMMAL ENGINEERING COLLEGE</h1>
            <h1 className="text-2xl">FEEDBACK PUBLICATION</h1> 
            <h1 className="text-xl ">DEPARTMENT OF {value["Dept"]}</h1>
            <h1 className="text-md">({(value["Sem"]%2==0)?"EVEN":"ODD"  } SEMESTER / {academic_year} )</h1>

        </div>
        <div className="w-full p-10 flex justify-center gap-10 items-center">
    {/* Feedback subject information left */}
        <table className="h-fit text-xl">
        <thead >
          
            </thead>
            <tbody>
            <tr>
            <td className="pr-2">Subject Name:</td>
            <td>{sub[current]}</td>
            </tr>
            <td>Year:</td>
            <td  ><span className="font-serif">{convertToRoman(Math.ceil(value["Sem"]/2))}</span> - {value["Sec"]}</td>
            

            </tbody>
        </table>

    {/* Feedback subject information right */}
        <table className="h-fit  text-xl" >
                    
            <tbody>
                <tr>
                <td className="pr-2">Staff Name:</td>
                <td>{staff[current]}</td>
                    
                </tr>
                <tr>
                <td>Semester:</td>
                <td>{value["Sem"]}</td>
            </tr>
         
            </tbody>
            
        </table>


    {/* Feed points */}
    <div className=" rounded-md border-orange-300 border-2 shadow  shadow-orange-400 p-3">
    <table className="wa-table" >
        <thead>
            <tr>
                <th className="text-center">Weighted Average</th>
                <th className="text-end">Rating</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td >1</td>
                <td>Poor</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Fair</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Good</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Very Good</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Excellent</td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
    {/* Feedback Response */}
    <div className="w-full ">
        <table className="feedback-table resultFeed">
            <thead>
                <tr>
                    <th rowSpan={2}>Details</th>
                    <th rowSpan={2} >No of Students Responded</th>
                    <th colSpan={5}>Frequency of Student response</th>
                    <th rowSpan={2} title="Weighted Average">W.A</th>
                    <th rowSpan={2} title="Self Evaluation">S.E</th>
                    <th rowSpan={2}>Deviation</th>
                </tr>
                <tr>
            
                    <th>5</th>
                    <th>4</th>
                    <th>3</th>
                    <th>2</th>
                    <th>1</th>
                </tr>
            </thead>
            <tbody>
            {contents.map((str,idx)=>{
          return displayContent(str,idx);
        })}
               
            </tbody>
        </table>
        </div>

    {/* Final Responses */}
        <div className="w-full text-center m-5"> 
        Overall Weighted Average = <p className="inline-block text-slate-500 font-sans font-bold">{responses&&responses["Avg_wa"]}</p>
        </div>
        
    {/* Final WA responses*/}

       
	
        </div>
   </div>

<div className="flex justify-center w-full">
<FButton style={{margin:"10px",width:"30%"}} onClick={exports}>Export</FButton>
</div>

</div>
   ); 
}