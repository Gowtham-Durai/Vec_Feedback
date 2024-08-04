export default function FButton({onClick,children,style,classstyle}){
        
    
    return (
       <button className={` text-white bg-[#FF6E01] p-3 text-2xl tracking-wider rounded-md
        transition-all w-full 
        hover:scale-105 hover:transition-all active:transition-all flex  gap-2  items-center justify-center 
        ${classstyle}`}  style={style} type="submit" onClick={onClick}>{children}</button>

    );
}