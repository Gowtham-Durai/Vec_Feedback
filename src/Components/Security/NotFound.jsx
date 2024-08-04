import N404 from '../../assets/5203299.png';
import LazyLoad from 'react-lazyload';


export default function NotFound(){
    return (
        <div className=" h-[88%] max-sm:h-[90%] flex justify-center ">
            <LazyLoad>
            <img src={N404} alt="Not Found" className=' h-full '  />
            </LazyLoad>
        </div>
    );
}