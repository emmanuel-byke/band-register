import { useLocation, useParams } from "react-router-dom";
import { getDateDetails, getFormattedTime, getMean, getUsersByDivision, icons } from "../assets";
import AllUsers from "./AllUsers";
import Navbar from "./Navbar";
import InfoCard from "./InfoCard";
import OverlayDetails from "./OverlayDetails";

export default function Details() {
    const divisionId = parseInt(useParams().id, 10);
    const location = useLocation();
    const item = location.state;
    const members = getUsersByDivision(divisionId);


    return (
        <header className="w-full bg-[#151719]">
            <nav>
                <Navbar />
            </nav>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-center flex-wrap">
                    <img 
                        src={item.value}
                        alt={item.name}
                        className="w-[500px] h-[500px] object-contain transform transition-transform duration-300 hover:scale-120"
                    />
                    <div className="flex flex-col justify-center items-start gap-7">
                        <h1 className="text-[60px] font-montserrat-alt font-bold">{item.name} <span className="text-red-400">
                            {item.role}</span>
                        </h1>
                        {
                            item.showRating?
                                <div className="flex flex-row items-center gap-5">
                                    <img 
                                        src={icons.starIcon.value}
                                        alt={icons.starIcon.name}
                                        className="w-[50px] h-[50px] object-contain transform transition-transform duration-600 hover:scale-200"
                                    />
                                    <h1 className="text-[40px] h-13">{getMean(item.ratings)}</h1>
                                    <h1 className="text-red-400 text-[50px]">|</h1>
                                    <h1 className="text-[40px] h-13 underline cursor-pointer font-merienda">Rate now</h1>
                                </div>:
                                <></>
                        }
                        
                        <h2 className="text-red-400 text-[30px]">{item.shortWords}</h2>
                    </div>
                </div>
                
                {
                    item.showVenue?
                        <div className="mx-8 flex flex-row flex-wrap justify-center gap-8">
                            {
                                item.venue.map((v, indx)=>(
                                    <OverlayDetails 
                                        key={indx} 
                                        showBtn={false} 
                                        item={(e)=><InfoCard card={v} setIsOpen={e} />} 
                                        
                                        size=" max-w-2xl w-full h-60 "
                                        title={`${getDateDetails(v.date).dayName} ${v.place}`}
                                        desc={`${getDateDetails(v.date).day} ${getDateDetails(v.date).monthName} ${getDateDetails(v.date).year} 
                                            From ${getFormattedTime(v.from)} To ${getFormattedTime(v.to)} ${v.role}`} 
                                        onClick={()=>console.log("Confirmed")}
                                        bgColor=" bg-gradient-to-b from-blue-400 to-gray-950 "
                                        styles={`text-white px-6 py-2 rounded-lg transition-all font-semibold font-montserrat bg-blue-400 hover:bg-blue-700`}
                                    />
                                ))
                            }
                        </div>:<></>
                }
                
                <div className="flex flex-col justify-center items-center mx-30 mt-30 gap-10">
                    <h2 className="text-red-400 text-[45px] font-montserrat-alt">{item.title}</h2>
                    <p className="text-gray-400 text-[30px] font-merienda text-justify">{item.titleDesc}</p>
                    <p className="text-gray-600 text-[30px] font-gvibes">{item.titleQuote}</p>

                </div>
                
                {
                    (item.showUsers && members)?
                        <div className="flex flex-col justify-center items-center mt-30">
                            <h1 className="text-gray-200 text-[50px] font-montserrat">
                                {item.baseUserModifier} <span className="text-blue-500">
                                    {item.baseUser}{members.length===1?"":"s"} </span>
                            </h1>
                            <AllUsers users={members} baseName={item.baseUser} divId={divisionId} />
                        </div>: <></>
                }
            <div className="h-20">

            </div>
            </div>
        </header>
    );
}