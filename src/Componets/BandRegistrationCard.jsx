import { Star } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppProvider";
import { useUser } from "../state/hooks/ContextUser";
import OverlayDetails from "./OverlayDetails";


export default function BandRegistrationCard({ division, user, isJoin, setRefresh }) {
    const totalStars = 5;
    const filledStars = division.average_rating??3;
    const textColor = isJoin ? "text-black" : "text-red-500";
    const bgColor = isJoin ? "hover:bg-green-500" : "hover:bg-red-500";
    const { refreshUser } = useUser();
    const { setRenderedInstr } = useContext(AppContext);
    const { userAddDiv, userRemoveDiv } = useUser();

    const handleJoin = async(e) => {
        try{
            const response = isJoin
                ? await userAddDiv( user.id, {division_id: division.id }) 
                : await userRemoveDiv( user.id, {division_id: division.id })
            refreshUser();
            setRefresh(prev=>!prev);
        } catch(error) {
            console.error(error?.response?.data)
        }
    }

    return (
        <header className="w-70 h-83  flex flex-col  gap-3 group">
            <div className="relative flex flex-col  w-full h-70 bg-gray-300">
                <NavLink 
                    to={`/instrument/detail/${division.id}`} 
                    className="absolute top-0 left-0 w-full h-full"
                    onClick={()=>setRenderedInstr(division)}
                    > 
                        <button className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 m-2 p-2 bg-blue-500 hover:bg-green-500
                                text-white font-montserrat font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                cursor-pointer z-10`}>
                            Details
                        </button>
                </NavLink>

                <div className="flex mt-3 ml-3">
                    {
                        division.showRatings? [...Array(totalStars)].map((_, index) => (
                            <span key={index} className="text-2xl">
                            {index < filledStars ? (
                                <Star className={`h-4 w-4 fill-green-500 text-green-500 
                                    transform transition-transform duration-300 hover:scale-150`} />
                            ) : (
                                <Star className="h-4 w-4 text-gray-500 transform transition-transform duration-300 hover:scale-160" />
                            )}
                            </span>
                        )) : <></>
                }
                </div>

                <div className="flex justify-center items-center transform transition-transform duration-300 hover:scale-105">
                    <img 
                        src={division.value} 
                        alt={`${division.name} division`} 
                        className="content-center h-60 object-scale-down"
                    />
                </div>
                
            </div>

            <div className="flex flex-col items-center gap-1">
                <h1 className="text-black text-[16px] font-montserrat-alt">{division.name} Division</h1>

                <OverlayDetails 
                    styles={`${textColor} text-[20px] font-bold font-montserrat opacity-0 group-hover:opacity-100 transition-opacity 
                        duration-300 cursor-pointer rounded-sm ${bgColor} hover:text-white p-2`} 
                    btnText={isJoin? "Join now" : "De-Register"} 
                    onClick={handleJoin}
                    title={isJoin? `Join ${division.name} now` : `De-Register from ${division.name} Division`}
                    desc={`Are you sure you want to ${isJoin? "Join" : "De-Register"} ${division.name} Division now?`}/>
                
            </div>
        </header>
    );
}