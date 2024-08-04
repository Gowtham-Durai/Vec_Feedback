import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function AuthenRedirect(session,redirect){

    const history = useNavigate(); 
 
    const login_valid = sessionStorage.getItem(session); 
 
    useEffect(() => { 
        if (login_valid != "true"  ) { 
            let di="/"+redirect;
            history(di); 
        } 
    }, [login_valid,history,redirect]); 
 
    if (login_valid !== "true") { 
        return null; // Do not render the component if login is not valid 
    } 
    return true;


}