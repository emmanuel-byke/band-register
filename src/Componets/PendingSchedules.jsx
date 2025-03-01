import { useContext, useState } from "react";
import { AppContext } from '../AppProvider';
import { getDateDetails, getDivisionToRegister, getFormattedTime, getUser, selectVenueByDate } from "../assets";
import SectionDivider from "./SectionDivider";
import InfoCard from "./InfoCard";
import VenueRegister from "./VenueRegister";
import OverlayDetails from "./OverlayDetails";
import Pagination from "./Pagination";


export default function PendingSchedules() {
    const { userId, loggedIn } = useContext(AppContext);
    const [unregisteredPage, setUnregisteredPage] = useState(1);
    const [pendingPage, setPendingPage] = useState(1);
    const itemsPerPageUnreg = 3;
    const itemsPerPagePending = 4;

    if(!loggedIn) return null;

    const user = getUser(userId);
    const pendingDiv = selectVenueByDate(user.divisions, null);
    const unregisteredDiv = getDivisionToRegister(user, null);

    const paginatedUnregistered = unregisteredDiv.slice(
        (unregisteredPage - 1) * itemsPerPageUnreg,
        unregisteredPage * itemsPerPageUnreg
    );

    const paginatedPending = pendingDiv.slice(
        (pendingPage - 1) * itemsPerPagePending,
        pendingPage * itemsPerPagePending
    );

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
                <div className="flex flex-col items-center mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {paginatedUnregistered.map((v, index) => (
                            <VenueRegister 
                                key={`${v.divName}-${index}`} 
                                data={v.availableVenue[0]} 
                                name={v.divName} 
                                img={v.img} 
                            />
                        ))}
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
                        Approved: <span className="text-green-600">5</span> • 
                        Pending: <span className="text-amber-600">3</span> • 
                        Rejected: <span className="text-red-600">1</span>
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
                            item={(e) => <InfoCard card={v} setIsOpen={e} />}
                            size="w-full"
                            title={`${getDateDetails(v.date).dayName} @ ${v.place}`}
                            desc={
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        {getDateDetails(v.date).date2} 
                                    </p>
                                    <p className="font-medium">
                                        {getFormattedTime(v.from)} - {getFormattedTime(v.to)}
                                    </p>
                                    <p className="text-sm text-gray-500">{v.role}</p>
                                </div>
                            }
                            onClick={() => console.log("Confirmed")}
                            bgColor="bg-gradient-to-br from-blue-50 to-white"
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