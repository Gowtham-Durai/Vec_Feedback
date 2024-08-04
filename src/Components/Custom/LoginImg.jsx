import wave from "../../assets/VEC/wave.png"
import LazyLoad from 'react-lazyload'; 

export default function LoginImg(props){
    return(
    <div className="h-full w-2/5 relative flex ">
        <LazyLoad>
                <img src={wave} loading="lazy"alt="img"  className={`max-md:hidden  h-full absolute`}/>
        </LazyLoad>
        <LazyLoad>
                <img src={props.img} alt="" className=" max-md:hidden h-full  absolute p-3" />
        </LazyLoad>
        
    </div>);
}