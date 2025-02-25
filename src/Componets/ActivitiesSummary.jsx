import { pendingActivities, selectActivityByDate, selectVenueByDate } from "../assets";
import Activity from "./Activity";



export default function ActivitiesSummary() {
    const activities = selectActivityByDate(pendingActivities, 3);

    return (
        <header className="flex flex-col justify-center items-center gap-8 mt-10" id="activities">
            <div className="flex justify-center items-center mt-10">
                <h1 className="text-[60px] text-black font-montserrat-alt">
                    Pending <span className="text-green-400">Activities</span></h1>
            </div>

            <div className={`flex flex-row flex-wrap  items-start gap-8`}>
                {
                    activities.map((act, indx)=>{
                        const size = indx==0?` w-100 h-130` : ` w-100 h-130 `;
                        return <Activity key={indx} data={act} size={size} />;
                    })
                }
            </div>
        </header>
    );
}