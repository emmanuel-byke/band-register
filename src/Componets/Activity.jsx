import { capitalize, getDateDetails, getFormattedTime } from "../assets";
import OverlayDetails from "./OverlayDetails";


export default function Activity(props) {
    const size = props.size?? " w-110 h-70 ";
    const bg = props.bg?? " bg-[#26292A] "

    return(
        <header className={`${size} ${bg} rounded-4xl relative overflow-hidden  hover:border-b-4 hover:border-l-1 border-blue-500`}>

            <div className="absolute inset-0">
                <img 
                    src={props.data.picture} 
                    alt={props.data.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/93" /> 
            </div>
      
            <div className="relative h-full flex flex-col justify-between items-center mx-3 gap-10">
                <h1 className="text-[33px] font-lora font-bold text-white text-center flex flex-wrap mt-5">{props.data.title}</h1>
                <p className="text-white text-[15px] text-justify font-montserrat flex flex-wrap">{props.data.desc}</p>
                
                <p className="text-gray text-[12px] font-montserrat flex flex-wrap flex-row items-start justify-end">
                    {getDateDetails(props.data.date).date2} From {getFormattedTime(props.data.time)}
                </p>
                <div className="w-full flex flex-row justify-end mb-1 pr-3">
                <OverlayDetails styles={`w-24 h-9 text-white text-[14px] font-montserrat font-bold bg-green-400 hover:bg-green-700 
                    rounded-md cursor-pointer`}
                    btnText='Read More'
                    onClick={()=>console.log("Clicked")}
                    customComponent={true}
                    bgColor="bg-gradient-to-t from-gray-700 to-white"
                    item={()=>
                    <div className="shadow-2xl hover:shadow-emerald-500">
                            { 
                                props.data.showPoster && (
                                    <img 
                                        src={props.data.poster}
                                        alt={props.data.title}
                                        className="max-h-130"
                                    />
                                )
                            }
                            
                    </div>
                    }
                />
                </div>
            </div>
        </header>
    );
}