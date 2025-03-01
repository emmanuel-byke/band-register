import { useState } from "react";
import { pendingActivities, selectActivityByDate, selectVenueByDate } from "../assets";
import Activity from "./Activity";
import Pagination from "./Pagination";



export default function ActivitiesSummary() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const allActivities = selectActivityByDate(pendingActivities, itemsPerPage * 3);
    const totalPages = Math.ceil(allActivities.length / itemsPerPage);
    const paginatedActivities = allActivities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <section className="flex flex-col justify-center items-center gap-8 mt-10" id="activities">
            <div className="flex justify-center items-center mt-10">
                <h1 className="text-[60px] text-black font-montserrat-alt">
                    Pending <span className="text-green-400">Activities</span></h1>
            </div>

            <div className={`flex flex-row flex-wrap  items-start gap-8`}>
                {
                    paginatedActivities.map((act, indx)=>{
                        const size = indx==0?` w-100 h-130` : ` w-100 h-130 `;
                        return <Activity key={indx} data={act} size={size} />;
                    })
                }
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        className="bg-white shadow-lg rounded-full px-6 py-3"
                    />
                </div>
            )}
        </section>
    );
}