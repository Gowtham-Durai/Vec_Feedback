 function FSelect(props){

   
    

    return (
       
        <select title={props.placeholder} name={props.placeholder}  value={props.value} required onChange={props.onChange}
        className="
        text-nowrap border-2 focus:border-red-400  border-orange-600 
        text-lg rounded-md m-2 p-3   shadow-[0px_0px_5px_orange]
                         shadow-orange-600 placeholder-orange-400 focus:no-underline
                         
                           ease-in text-orange-500 ">
            <option hidden>{props.placeholder}</option>
         {
            props.list&& props.list.map((ele,idx)=>{
               return  <option value={idx} key={idx}>{ele}</option>
                
            })
         }
         
         </select>
        
    );
}


export default FSelect;