import { useEffect, useState } from "react";
import { capitalize } from "../assets";
import api from "../Services/api";
import { useUser } from "../state/hooks/ContextUser";
import SectionDivider from "./SectionDivider";

export default function Feedback() {
  const { user } = useUser();
  const loggedIn = !!user;
  const [feedback, setFeedback] = useState([]);

  useEffect(()=>{
    const fetchFeedbacks = async() => {
      try{
        const response = await api.getFeedbacks('');
        setFeedback(response.data.length>0?response.data[response.data.length-1]:[]);
        console.log(response.data);
      } catch(error) {
        console.error(error?.response?.data);
      }
    }
    loggedIn && fetchFeedbacks();
  }, []);


  if(!loggedIn || feedback.length === 0) return null;
  return (
    <main className="flex flex-col flex-wrap justify-center items-center">
      <div className="mt-40">
        <SectionDivider value="Feedback" />
      </div>
  
      <div className="w-full flex flex-row flex-wrap justify-center items-center gap-20 mt-30">
        {/* Text Content Container */}
        <div className="flex flex-col items-center flex-1 max-w-2xl mr-8">
          <h1 className={`text-black text-[30px] font-roboto-slab text-center flex flex-row gap-5`}>
            { feedback.title }
            <span className="text-blue-400"> 
              { feedback.highlighted_title }
              </span>
          </h1>
          <p className="text-gray text-[20px] text-center font-roboto-slab font-normal mt-5">
            {feedback.desc}  
          </p>
          <p className="text-slate-400 text-[18px] text-center font-roboto font-normal italic mt-5">
            {capitalize(`${feedback?.sender_detail?.fname[0]}. ${feedback?.sender_detail?.lname} [admin]`)}  
          </p>
        </div>
  
        
        <div className="flex-shrink-0 relative top-0 right-0">
          {feedback?.user_detail?.profile_picture && 
            <img 
              src={user.profile_picture} 
              alt={`picture of ${user.username}`} 
              className="w-130 h-139 object-contain sticky top-0 " 
            />
          }
        </div>
      </div>
      <div className="mt-20"/>
    </main>
  );

}