import { useContext, useState } from "react";
import { AppContext } from '../AppProvider';
import { capitalize, checkUserInDivision, divisions, getStat, getUser, sortAllDivisionsByUser } from "../assets";
import SectionDivider from "./SectionDivider";
import BandRegistrationCard from "./BandRegistrationCard";

export default function BandRegistration() {
    const{ userId, loggedIn } = useContext(AppContext);
    if(loggedIn) {
        const [showAll, setShowAll] = useState(false);
        const user = getUser(userId);
        const allDivisions = sortAllDivisionsByUser(user, divisions);
        const cutOff = 4;
        

        return (
            <header className="flex flex-col flex-wrap justify-center items-center ">
                <div className="mt-20" id="divisions">
                    <SectionDivider value="Band Management" />
                </div>

                <div className="flex flex-row">
                    <h1 className={`text-black text-[40px] font-roboto-slab mt-10`}>trending <span className="text-green-500">
                        Band Divisions</span></h1>
                </div>

                <div className="w-full flex flex-col">
                    {
                        allDivisions.length>cutOff?
                            <h1 className="text-gray text-[30px] cursor-pointer font-montserrat-alt ml-9" 
                                onClick={()=>setShowAll(!showAll)}>
                                {showAll?"All": "Some"} Division{allDivisions.length===1?"":"s"}
                            </h1> 
                        : <></>
                    }
                    <div className="flex flex-row flex-wrap justify-between items-center mt-10 gap-6">
                        {
                            allDivisions.map((dv, indx)=>{
                                if(indx<cutOff || showAll){
                                    return <BandRegistrationCard key={indx} data={dv} isJoin={!checkUserInDivision(user, dv.id)} />;
                                }
                            })
                        }
                    </div>
                </div>
                
            </header>
        );
    }
    return <></>
}