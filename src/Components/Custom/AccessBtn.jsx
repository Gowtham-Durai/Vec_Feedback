
import { useMemo } from "react"; 
import LinkIcon from "./LinkIcon";
function AccessBtn({ className, style, children, icon, onClick }) { 
    const iconComponent = useMemo(() => LinkIcon(icon), [icon]); 
 
    return ( 
        <button 
            style={style} 
            className={` text-orange-500 border-[3px] border-orange-600 bg-white p-3 text-xl tracking-wider rounded-md 
                         transition-all flex gap-3 
                         hover:scale-105 hover:transition-all 
                          text-ellipsis overflow-hidden whitespace-nowrap 
                        ${className}`} 
            type="submit" 
            onClick={onClick} 
        > 
            <div className="w-fit"> 
                {iconComponent} 
            </div> 
            <div> 
                {children} 
            </div> 
        </button> 
    ); 
} 
 
AccessBtn.defaultProps = { 
    style: {}, 
    children: {}, 
    icon: "" 
}; 
 
export default AccessBtn; 