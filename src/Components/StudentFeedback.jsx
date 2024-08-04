import { useNavigate } from "react-router-dom";
import FButton from "./Custom/FButton";
import { useEffect, useState   } from "react";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {Request} from "./Security/Request";
import { ordinal } from "./Custom/includes";


export default function StudentFeedback(){
  
  let count=0;
  

  function feedbackRating(SubCont){
  
    const selectTag=(idx)=>{
      return (
      <select className="feedselect flex-grow pb-2" name={`op${idx}`} onChange={handleFeeds} >
      <option value="" default hidden></option>
      <option value={5}>5</option>
      <option value={4}>4</option>
      <option value={3}>3</option>
      <option value={2}>2</option>
      <option value={1}>1</option>
    </select>);
    }
                
    const selectElements = [];
    for (let i = 0; i < SubCont; i++) {
      selectElements.push(selectTag(count));
      count++;
    }
  
    return selectElements;
  }
  
  function displayContent(colm,str,idx){
  
    
    if(idx==0 || idx%6==0)
        return( <tr key={idx}>
                 <td><b className=" text-stone-600 w-full">{str} </b></td>
                  </tr>)
    else 
        return (<tr key={idx}>
          <td className="min-w-[400px]"><p>{str}</p></td>
          <td className=" text-center ">
            <div  className="flex flex-grow gap-1">
         
            
          {feedbackRating(colm)}
            </div>
            </td>
          </tr>)
  }
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
      "4.5 Teacher is prompt in valuing and returning the answer scripts"
    ];
   
    
    
    const value=JSON.parse(sessionStorage.getItem("studentDetails"));
    
    const [colm,setcolm]=useState(3);
    const [sub,setsub]=useState([]);
    const [staff,setStaff]=useState([]);
    const [yearStart,setyearStart]=useState();
    const [yearEnd,setyearEnd]=useState();
    const [feedback,setFeedback]=useState({});
    const navigate=useNavigate();
    useEffect(()=>{
      
      if(Cookies.get('name')==undefined ){
        // Swal.fire({
        //   icon: "warning",
        //   title: "Session Expired",
        //   showConfirmButton: false,
        //   timer: 1000
        // }).then(()=>{
        //    navigate("/");
        // });
           
        }
        else if(value!=null){
          Request({request:"get/subCount/getSubject",input:value},
          "",(data)=>{ 
            
            if(data["staff"].length==0){
              Swal.fire({
                icon:"error",
                title:"Wait until staff updation",
                showConfirmButton:false,

              }
            ).then(()=>{
              navigate("/");
            });
            }
            setcolm(parseInt(data["scount"])); 
            setsub(data["sub"]) 
            setStaff(data["staff"]);
            
            setyearStart(data["yearStart"]);
            setyearEnd(data["yearEnd"]);
          });
        }
       
        
      },[]);
          
    function handleFeeds(e){
      let {name,value} = e.target;
      setFeedback(f=>({...f,[name]:value}));
    }
    function blockSubmit(e){
      e.preventDefault();
      if(colm*20==Object.keys(feedback).length)
        
      Request({request:"feedback","input":{value,feedback}},
      "Feedback Completed",()=>{ Cookies.remove('name');sessionStorage.removeItem("studentDetails");navigate("/");},
      "Operation Unsucessful",()=>{}
        );
        
                  
          else{
            
            Swal.fire({
              icon:"warning",
              timer:900,
              title:"Empty Field Detected",
              showConfirmButton:false,
          });
        }
          
    }
    
    return (value!=null)&&(
      <div >
<div className=" feedback-table p-10 pt-5  no-bg">
<div className="text-center">
            <h1 className="text-orange-500 text-3xl">VELAMMAL ENGINEERING COLLEGE</h1>
            <h1 className="text-orange-500 text-xl">STUDENT FEEDBACK FORM</h1> 
            <h1 className="text-orange-500 text-xl">Academic Year : <span className="text-gray-500 text-lg font-sans font-bold">{yearStart}-{yearEnd}</span></h1> <br />
        </div>
  <div className="w-fit flex m-auto gap-2">
 
  <div className="w-fit  mb-4  p-5 ">
    <h1 className="text-orange-500">Rating Points</h1> 
    <div className="grid grid-cols-2">
    <div><span className="feedtext"><span className="feedh">5</span>-Excellent</span></div>
      <div><span className="feedtext"><span className="feedh">4</span>-Very Good</span></div>
      <div><span className="feedtext"><span className="feedh">3</span>-Good</span></div>
      <div><span className="feedtext"><span className= "feedh">2</span>-Fair</span></div>
      <div ><span className="feedtext"><span className="feedh">1</span>-Poor</span></div>
    </div>
  </div>
  <div className="w-fit  mb-4  p-5">
    
    <table className="border-0  border-orange-600 border-collapse  staff text-center ">
      <thead>
      <tr className="bg-orange-500 text-white">
        <th className=" ">Subject</th>
        <th>Staff </th>
      </tr>
      </thead>
    
      <tbody>
          
          {
            sub.map((d,i)=>{
              return (<tr key={i}><td >{d}</td> <td>{staff[i]}</td></tr>);
              
            })
          }
          
      </tbody>
    </table>


</div>
  </div>
  
  <div className="w-full flex justify-center ">
  <h1 className="text-orange-500">
              Welcome {value.Name},&nbsp;
                {value.Course}-{value.Dept} Department&nbsp;,
                <span className=" text-[1.1em]">{ordinal(value.Sem)}</span> Semester
              ,&lsquo;{value.Sec}&rsquo;-Section
              </h1> 
              </div>
              <br />
  <form method="POST" onSubmit={blockSubmit} className="">
  <table className="w-full border-2  border-orange-500 border-collapse overflow-x-auto">
      <thead className="border-3 border-orange-600 text-orange-600">
          <tr>
            <th >Subjects---&gt;</th>
            <th >
              
            <div className={ ` w-full flex occupy gap-2` }>

              {
                sub.map((d,i)=>{
                  return (<th key={i}>{d}</th>)
                  
                })
              }


                </div>  
            </th>
            
          </tr>
      </thead>
      <tbody>
        {contents.map((str,idx)=>{
          return displayContent(colm,str,idx);
        })}

        
      </tbody>
  </table>
  <div className="p-3 w-7/12 m-auto">
    <FButton >SUBMIT</FButton>
  </div>
  
</form>
</div>
    
</div>
    );
}