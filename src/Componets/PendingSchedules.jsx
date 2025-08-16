import { MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { getDateDetails, getFormattedTime } from "../assets";
import api from "../Services/api";
import { useUser } from "../state/hooks/ContextUser";
import InfoCard from "./InfoCard";
import NoRecordsCard from "./NoRecord";
import OverlayDetails from "./OverlayDetails";
import Pagination from "./Pagination";
import SectionDivider from "./SectionDivider";
import VenueRegister from "./VenueRegister";

export default function PendingSchedules() {
    const { user, userUpdator } = useUser();
    const loggedIn = !!user;
    const [ scheduleChanged, setScheduleChanged ] = useState(false);
    const [ pendingSchedule, setPendingSchedule ] = useState([]);
    const [ unregisteredSchedule, setUnregisteredSchedule ] = useState([]);
    const [unregisteredPage, setUnregisteredPage] = useState(1);
    const [pendingPage, setPendingPage] = useState(1);
    const [details, setDetails] = useState({
        pending: 0,
        rejected: 0,
        approved: 0,
    });
    const itemsPerPageUnreg = 3;
    const itemsPerPagePending = 4;

    useEffect(()=>{
        const fetchPendingSchedules = async() => {
            try{
                const params = { params: { search: '', users:user.id } }
                const response = await api.getAllUpcommingDivVenues(params);
                setPendingSchedule(response.data);
            } catch(error) {
                console.error(error?.response?.data);
            }
        }
        loggedIn && fetchPendingSchedules();
    }, [userUpdator, scheduleChanged]);

    useEffect(()=>{
        const fetchUnregisteredSchedules = async() => {
            try{
                const response = await api.getSchedules(user.id);
                setUnregisteredSchedule([...response.data.new, ...response.data.rejected])
                setDetails({
                    pending: response.data.pending.length,
                    approved: response.data.accepted.length,
                    rejected: response.data.rejected.length,
                })
            } catch(error) {
                console.error(error?.response?.data);
            }
        }
        loggedIn && fetchUnregisteredSchedules();
    }, [userUpdator, scheduleChanged]);
    
    
    const pendingDiv = [];
    const unregisteredDiv = [];
    
    const paginatedUnregistered = unregisteredSchedule.slice(
        (unregisteredPage - 1) * itemsPerPageUnreg,
        unregisteredPage * itemsPerPageUnreg
    );
    
    const paginatedPending = pendingSchedule.slice(
        (pendingPage - 1) * itemsPerPagePending,
        pendingPage * itemsPerPagePending
    );

    if(!loggedIn || paginatedPending.length === 0) return null;
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
           
            <div className="text-center mb-16" id="schedules">
                <SectionDivider 
                    value="Schedules"
                    color="bg-blue-600"
                    borderColor="border-blue-100"
                />
                <h1 className="text-4xl font-bold text-gray-900 mt-8 font-lora">
                    Manage All <span className="text-blue-600">Schedules</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-montserrat">
                    Respond to Attendance Register and View Pending Schedule
                </p>
            </div>

            
            <div className="mb-20">
                <div className={`flex flex-col items-center mb-8`}>
                    <div className={`${paginatedUnregistered.length<= 0? 'flex justify-center':'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6 w-full`}>
                        {
                            paginatedUnregistered.length> 0 ? paginatedUnregistered.map((venue, index) => (
                                venue.divisions.map(id=>(
                                    <VenueRegister 
                                        key={`${id}-${index}` }
                                        venue={venue}
                                        divId={id}
                                        username={user.username}
                                        setScheduleChanged={setScheduleChanged}
                                    />
                                ))
                                )) : <NoRecordsCard 
                                        check={true} 
                                        text={'No Records Found'} 
                                        desc='no un registered venues found right now' 
                                        suggest={{text:'Join More Divisions', href: '#divisions'}} />
                        }
                    </div>
                    {unregisteredDiv.length > itemsPerPageUnreg &&  <div className="mt-8">
                        <Pagination
                            currentPage={unregisteredPage}
                            totalPages={Math.ceil(unregisteredDiv.length / itemsPerPageUnreg)}
                            onPageChange={setUnregisteredPage}
                        />
                    </div>}
                </div>

                
                <div className="text-center mt-8">
                    <p className="text-lg text-gray-600 font-medium">
                        Approved: <span className="text-green-600">{details.approved}</span> • 
                        Pending: <span className="text-amber-600">{details.pending}</span> • 
                        Rejected: <span className="text-red-600">{details.rejected}</span>
                    </p>
                </div>
            </div>

            
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Pending <span className="text-blue-500">Schedules</span>
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {paginatedPending.map((v, index) => (
                        <OverlayDetails 
                            key={index} 
                            showBtn={false} 
                            item={(e) => 
                                <InfoCard 
                                    card={v} 
                                    setIsOpen={e} 
                                    altImage={<MapPinned className="h-32 w-32 text-[#36439B]" />} 
                                    
                                />
                            }
                            size="w-full"
                            title={`${getDateDetails(v.date).dayName} @ ${v.place}`}
                            desc={
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        {getDateDetails(v.date).date2} 
                                    </p>
                                    <p className="font-medium">
                                        {getFormattedTime(v.startTime)} - {getFormattedTime(v.endTime)}
                                    </p>
                                    <p className="text-sm text-gray-500">{v.role}</p>
                                </div>
                            }
                            onClick={() => console.log("Confirmed")}
                            bgColor="bg-gradient-to-br from-gray-500 to-slate-500"
                            styles="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
                        />
                    ))}
                </div>
                
                {pendingDiv.length>itemsPerPagePending &&  <div className="w-full flex flex-row justify-center items-center mt-9">
                    <Pagination
                        currentPage={pendingPage}
                        totalPages={Math.ceil(pendingDiv.length / itemsPerPagePending)}
                        onPageChange={setPendingPage}
                    />
                </div>
                }
            </div>
        </section>
    );
}