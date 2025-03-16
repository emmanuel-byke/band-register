import { useEffect, useState } from "react";
import api from "../Services/api";
import Activity from "./Activity";
import Pagination from "./Pagination";



export default function ActivitiesSummary() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [activities, setActivities] = useState([]);
    const totalPages = Math.ceil(activities.length / itemsPerPage);
    const paginatedActivities = activities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const fetchActivities = async () => {
          try {
            const response = await api.getActivities('');
            setActivities(response.data);
          } catch (error) {
            console.error('Error fetching activities:', error?.response?.data);
          }
        };
        fetchActivities();
      }, []);

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