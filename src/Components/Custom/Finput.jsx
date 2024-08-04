
import PropTypes from "prop-types"
function FInput(props){

    return (<>
        <input placeholder={props.placeholder}  
            className={
             ` border-2 focus:border-red-400 focus:outline-0  focus:no-underline
            text-xl rounded-md m-2 p-3 shadow-[0px_0px_5px_orange] 
                         shadow-orange-600 placeholder-orange-400 
                          ease-in text-orange-500 ${props.className} `} spellCheck="false"
            onChange={props.onChange}
            onClick={props.onClick}
            autoComplete={props.autoComplete!=""?"ON":"OFF"}
            required
            min={props.min}
            max={props.max}
            title={props.placeholder}
            type={props.type}
            name={props.placeholder}
            disabled={props.disabled}
            value={props.value}
            defaultValue={props.defaultValue}
            
            />
    </>);
}
FInput.propTypes={
    placeholder:PropTypes.string,
    type:PropTypes.string

}
FInput.defaultProps={
    type:"text",
    disabled:false,
    className:"",
    defaultvalue:""
    
}
export default FInput;
