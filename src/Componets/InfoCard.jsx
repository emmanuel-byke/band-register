import { Image } from "lucide-react";
import { getDateDetails, getFormattedTime, subtractDates } from "../assets";

export default function InfoCard(props) {
    const date = getDateDetails(props.card.date);
    const fromTime = getFormattedTime(props.card.startTime);
    const endTime = getFormattedTime(props.card.endTime);
    const dateSub = subtractDates(props.card.date)

    return (
        <div 
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border 
                border-gray-100 overflow-hidden"
            onClick={() => props.setIsOpen(prev => !prev)}
        >
            <div className="flex h-full items-center justify-center">
                {/* Image Section */}
                <div className="relative w-32 flex-shrink-0">
                    {
                        props.card.img
                        ?   <img 
                                src={props.card.img} 
                                alt={props.card.place} 
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        : props.altImage? props.altImage
                        : <Image className="h-32 w-32 text-[#36439B]" />
                    }
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center p-5 flex-grow">
                    {/* Date & Status */}
                    <div className="flex items-center justify-between mb-2">

                        <h1 className="text-sm font-medium font-montserrat text-blue-600">
                            {props.divName} {props.divRole && <span>{`${props.divRole} on `}</span>}  {date.dayName}
                        </h1>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                            {dateSub}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {props.card.place}
                    </h3>

                    {/* Time & Role */}
                    <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-4">
                            🕒 {fromTime} - {endTime}
                        </span>
                        <span className="flex items-center">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 mr-1 text-gray-400" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 
                                    2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
                                    clipRule="evenodd" />
                            </svg>
                            {props.card.role}
                        </span>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="flex items-center mr-4">
                            📍 {date.day} {date.monthName}
                        </span>
                        <span className="flex items-center">
                            👤 Many Participants
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}