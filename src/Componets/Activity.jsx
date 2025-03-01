import { capitalize, getDateDetails, getFormattedTime } from "../assets";
import OverlayDetails from "./OverlayDetails";
import { ArrowRight } from "lucide-react";

export default function Activity(props) {
    const size = props.size ?? "w-110 h-70";
    const bg = props.bg ?? "bg-gray-900";

    return (
        <article className={`${size} ${bg} rounded-3xl relative overflow-hidden group transition-all duration-300 shadow-xl hover:shadow-2xl`}>
            {/* Image with Gradient Overlay */}
            <div className="absolute inset-0">
                <img 
                    src={props.data.picture} 
                    alt={props.data.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-between p-6">
                {/* Title Section */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-white font-lora leading-tight">
                        {props.data.title}
                    </h1>
                    <p className="text-gray-300 text-sm font-montserrat line-clamp-6">
                        {props.data.desc}
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-4">
                    {/* Date/Time Badge */}
                    <div className="bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                        <p className="text-xs font-medium text-emerald-400">
                            {getDateDetails(props.data.date).date2} • 
                            <span className="text-white ml-1">
                                {getFormattedTime(props.data.time)}
                            </span>
                        </p>
                    </div>

                    {/* Read More Button */}
                    <div className="mt-4 flex justify-end">
                        <OverlayDetails 
                            styles="w-full max-w-[120px] flex items-center justify-between px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors font-semibold text-sm"
                            btnText={
                                <>
                                    Details
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            }
                            onClick={() => console.log("Clicked")}
                            customComponent={true}
                            bgColor="bg-gray-900/90 backdrop-blur-sm"
                            item={() => (
                                <div className="p-4">
                                    {props.data.showPoster && (
                                        <img 
                                            src={props.data.poster}
                                            alt={props.data.title}
                                            className="max-h-[500px] w-auto mx-auto rounded-xl shadow-2xl"
                                        />
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}