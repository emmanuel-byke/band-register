import { useContext } from "react";
import { AppContext } from '../AppProvider';
import { getDateDetails, getDivisionToRegister, getFormattedTime, getUser, selectVenueByDate } from "../assets";
import SectionDivider from "./SectionDivider";
import InfoCard from "./InfoCard";
import VenueRegister from "./VenueRegister";
import OverlayDetails from "./OverlayDetails";




export default function PendingSchedules() {
    const{ userId, loggedIn } = useContext(AppContext)
    if(loggedIn) {
        const user = getUser(userId);
        const pendingDiv = selectVenueByDate(user.divisions, 4);
        const unregisteredDiv = getDivisionToRegister(user, 3);


        return (
            <header className="flex flex-col w-full">
                <div className="mt-40" id="schedules">
                    <SectionDivider value="Schedules" />
                </div>

                <div className="flex flex-row flex-wrap justify-center items-center mt-10 ">
                    {
                        unregisteredDiv.map(v=>(
                            v.availableVenue.map((available, index)=>(
                                <VenueRegister key={index} data={available} name={v.divName} img={v.img} />
                            ))
                        ))
                    }
                </div>
                <div className="flex flex-row justify-center items-center mt-5">
                    <p className="text-gray text-[20px] font-montserrat">
                        Approved: 5, Pending: 3, Rejected: 1 
                    </p>
                </div>

                <div className="flex justify-center items-center mt-20">
                    <h1 className="text-[60px] text-black font-montserrat-alt">
                        Pending <span className="text-blue-400">Schedules</span>
                    </h1>
                </div>

                <div className="flex flex-row items-center justify-center gap-8 flex-wrap mt-15">
                    {
                        pendingDiv.map((v, indx)=>(
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
                </div>         
            </header>
        );
    }
    return <></>;

}