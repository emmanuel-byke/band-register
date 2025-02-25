import { useState } from "react";
import UserCard from "./UserCard";
import InfoCard from "./InfoCard";

export default function AllInfoCards(props) {
    const [showAllInfoCards, setShowAllInfoCards] = useState(false);
    const handleShowUsers = (e) => {
        setShowAllInfoCards(prev=>!prev);
    }
    
    return(
        <header className="flex flex-col gap-8">
            {
                props.cards.length>props.col?
                <h1 className="text-gray text-[30px] cursor-pointer font-montserrat-alt" 
                    onClick={handleShowUsers}>
                    {showAllInfoCards?"All": "Some"} {props.baseName}{props.cards.length===1?"":"s"}
                </h1>:<></>
            }
            
            <div className={`grid grid-cols-3 gap-20 justify-center`}>
                {
                    (!showAllInfoCards ? props.cards.slice(0, props.col||3) : props.cards).map((card, indx)=>(
                        <InfoCard key={indx} card={card} />
                    ))
                }
            </div>
        </header>
    );
}