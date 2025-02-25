import { useContext } from "react";
import { AppContext } from '../AppProvider';
import { capitalize, getStat, getUser } from "../assets";
import SectionDivider from "./SectionDivider";
import ColorDisplay from "./ImageColorExtractor";

export default function Feedback() {
    const{ userId, loggedIn } = useContext(AppContext);

    if(loggedIn) {
        const user = getUser(userId);

        return (
            <header className="flex flex-col flex-wrap justify-center items-center">
              <div className="mt-40">
                <SectionDivider value="Feedback" />
              </div>
          
              <div className="w-full flex flex-row justify-between items-center mt-30">
                {/* Text Content Container */}
                <div className="flex flex-col items-center flex-1 max-w-2xl mr-8">
                  <h1 className={`text-black text-[30px] font-roboto-slab text-center`}>
                    {user.feedback.title}
                    <span className="text-blue-400"> {user.feedback.highlitedTitle}</span>
                  </h1>
                  <p className="text-gray text-[20px] text-center font-roboto-slab font-normal mt-5">
                    {user.feedback.desc}
                  </p>
                </div>
          
                
                <div className="flex-shrink-0 relative top-0 right-0">
                  <img 
                    src={user.details.picture} 
                    alt={`picture of ${user.details.username}`} 
                    className="w-130 h-139 object-contain sticky top-0 " 
                  />
                </div>
              </div>
            </header>
          );
    }
    return <></>
}