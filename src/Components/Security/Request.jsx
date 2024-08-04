import axios from "axios";
import Swal from 'sweetalert2';



const ip=window.location.hostname;
const token=import.meta.env.VITE_TOKEN;
export async function Request(Req={input:{}},
    successMsg,onSuccess=()=>{},failureMsg="",onFailure=()=>{},dup="",onDup=()=>{}){
    
    
     await axios.post("http://"+ip+"/Api/"+Req["request"],Req["input"],
        {headers:{"token":token,"Content-Type": "application/json"}}
    ).then((response)=>{
        var Response=response.data;    
        

        
        if(Response["status"]){
            if(successMsg=="")onSuccess(Response);
            else
                Swal.fire({
                        title:successMsg,icon:"success",
                        timer:800,showConfirmButton:false,
                    }).then((Response)=>{onSuccess(Response)});       
            }
        else if(Response["dup"]){
                if(dup=="")onDup();
                else
                Swal.fire({
                    title:dup,
                    icon:"warning",
                    showConfirmButton:false,
                    timer:1000}).then((Response)=>onDup(Response));
        }
     else{         
            if(failureMsg=="")onFailure(Response);
            else
            Swal.fire({title:failureMsg,icon:"warning",
            showConfirmButton:false}).then((Response)=>{onFailure(Response)});
                }
    }).catch((error)=>{
    Swal.fire({
            title: "Error Connecting to Server",
            icon: "error",
            showConfirmButton: false,
          })
          console.log(error);
    });

}


export async function GET(get, onSuccess, except = false) { 
            return axios.post("http://" + ip + "/Api/getData/" + get,"", { headers: { "token": token ,"Content-Type": "application/json"} }) 
                .then(response => { 
                    const Response = response.data; 
                    let swalInstance; 
         
                    if (Response["db"] === false) { 
                        swalInstance = Swal.fire({ 
                            icon: "warning", 
                            title: "Wait until Database Creation", 
                            text: "or Error connecting to Database", 
                            showConfirmButton: false, 
                            allowOutsideClick: false 
                        }); 
                    } else { 
                        onSuccess(Response); 
         
                        if (!except && (Response["course"] === null || Response["course"].length === 0)) { 
                            swalInstance = Swal.fire({ 
                                icon: "warning", 
                                title: "Wait until Course Creation", 
                                showConfirmButton: false, 
                                
                            }); 
                        } 
                    } 
         
                    window.addEventListener('popstate', () => { 
                        if (swalInstance) { 
                            swalInstance.close(); 
                            window.removeEventListener('popstate'); 
                        } 
                    }); 
                }) 
                .catch(error => { 
                    Swal.fire({ 
                        title: "Error connecting to server", 
                        icon: "error", 
                        showConfirmButton: false 
                    }); 
                    console.log(error); 
                }); 
        } 
