import { useLocation, useParams } from "react-router-dom";
import { Star, Users, Calendar, Quote } from "lucide-react";
import { getDateDetails, getFormattedTime, getMean, getUsersByDivision } from "../assets";
import AllUsers from "./AllUsers";
import Navbar from "./Navbar";
import InfoCard from "./InfoCard";
import OverlayDetails from "./OverlayDetails";
import { useState } from "react";
import Pagination from "./Pagination";

export default function Details() {
    const divisionId = parseInt(useParams().id, 10);
    const location = useLocation();
    const item = location.state;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const members = getUsersByDivision(divisionId);
    const paginatedMembers = members?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                        <img 
                            src={item.value}
                            alt={item.name}
                            className="w-full h-full object-contain aspect-square transform transition-transform duration-300 
                            group-hover:scale-105"
                        />
                    </div>
                    
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold text-white font-montserrat">
                            {item.name} 
                            <span className="text-emerald-400 block mt-2">{item.role}</span>
                        </h1>
                        
                        {item.showRating && (
                            <div className="flex items-center gap-4 bg-gray-800/50 p-6 rounded-xl">
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-8 h-8 ${i < getMean(item.ratings) ? 'fill-emerald-400 stroke-emerald-400' : 'stroke-gray-600'}`}
                                        />
                                    ))}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-white">{getMean(item.ratings)}/5</p>
                                    <button className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2">
                                        <Star className="w-5 h-5" />
                                        Rate Now
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {item.shortWords && (
                            <blockquote className="text-2xl text-emerald-300 italic border-l-4 border-emerald-400 pl-4">
                                "{item.shortWords}"
                            </blockquote>
                        )}
                    </div>
                </div>

                {/* Venue Section */}
                {item.showVenue && (
                    <section className="mb-24">
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Calendar className="w-8 h-8 text-emerald-400" />
                            Upcoming Sessions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {item.venue.map((v, indx) => (
                                <OverlayDetails 
                                    key={indx} 
                                    showBtn={false} 
                                    item={(e) => <InfoCard card={v} setIsOpen={e} />} 
                                    size="w-full"
                                    title={`${getDateDetails(v.date).dayName} ${v.place}`}
                                    desc={
                                        <div className="space-y-2">
                                            <p className="text-gray-300">
                                                {getDateDetails(v.date).day} {getDateDetails(v.date).monthName} {getDateDetails(v.date).year}
                                            </p>
                                            <p className="font-medium text-white">
                                                {getFormattedTime(v.from)} - {getFormattedTime(v.to)}
                                            </p>
                                            <p className="text-sm text-emerald-400">{v.role}</p>
                                        </div>
                                    }
                                    bgColor="bg-gray-800"
                                    styles="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Description Section */}
                <section className="mb-24 flex justify-center">
                    <div className="max-w-3xl text-center space-y-8">
                        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                            <Quote className="w-8 h-8 text-emerald-400" />
                            {item.title}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-xl text-gray-300 leading-relaxed">
                                {item.titleDesc}
                            </p>
                            {item.titleQuote && (
                                <p className="text-2xl text-emerald-300 italic">
                                    "{item.titleQuote}"
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Members Section */}
                {item.showUsers && members && (
                    <section className="mb-16">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Users className="w-8 h-8 text-emerald-400" />
                                {item.baseUserModifier} 
                                <span className="text-emerald-400">
                                    {item.baseUser}{members.length === 1 ? "" : "s"} 
                                    <span className="text-gray-400 text-xl ml-2">
                                        ({members.length} total)
                                    </span>
                                </span>
                            </h2>
                            
                        </div>
                        
                        <AllUsers 
                            users={paginatedMembers} 
                            baseName={item.baseUser} 
                            divId={divisionId} 
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                        />

                        
                    </section>
                )}
            </main>
        </div>
    );
}