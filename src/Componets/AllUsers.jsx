import { useState } from "react";
import UserCard from "./UserCard";

export default function AllUsers(props) {
    const cutOffLength = 4;
    const [showAllUsers, setShowAllUsers] = useState(false);
    const handleShowUsers = (e) => {
        setShowAllUsers(prev=>!prev);
    }
    
    return(
        <header className="flex flex-col gap-8 w-full">
            <div className="">
                {
                    props.users.length>cutOffLength?
                    <h1 className="text-gray text-[30px] cursor-pointer font-montserrat-alt ml-9" 
                        onClick={handleShowUsers}>
                        {showAllUsers?"All": "Some"} {props.baseName}{props.users.length===1?"":"s"}
                    </h1>:<></>
                }
            </div>
            
            <div className={`w-full flex flex-row flex-wrap gap-20 justify-center `}>
                {
                    (!showAllUsers ? props.users.slice(0, cutOffLength) : props.users).map((user, indx)=>(
                        <UserCard key={indx} user={user} userRole={user.divisions.find(d=>d.id===props.divId).userRole} />
                    ))
                }
            </div>
        </header>
    );
}