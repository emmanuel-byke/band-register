import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { checkUserInDivision } from "../assets";
import api from "../Services/api";
import { useUser } from "../state/hooks/ContextUser";
import BandRegistrationCard from "./BandRegistrationCard";
import SectionDivider from "./SectionDivider";

export default function BandRegistration() {
    const { user } = useUser();
    const loggedIn = !!user;
    
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    
    const [divisions, setDivisions] = useState([])
    const [refresh, setRefresh] = useState(true)
    const totalPages = Math.ceil(divisions.length / itemsPerPage);
    const paginatedDivisions = divisions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(()=>{
        const fetchAllDivisions = async() => {
            const response = await api.getDivisions('');
            setDivisions(response.data);
        }
        fetchAllDivisions()
    }, [refresh]);

    
    if(!loggedIn || divisions.length === 0) return null;
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16" id="divisions">
                <SectionDivider 
                    value="Band Management"
                    color="bg-blue-600"
                    borderColor="border-blue-100"
                />
                <h1 className="text-4xl font-bold text-gray-900 mt-8 font-lora">
                    Explore <span className="text-blue-600">Band Divisions</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-montserrat">
                    Discover and manage your musical collaborations across various band divisions
                </p>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {paginatedDivisions.map((dv, index) => (
                        <BandRegistrationCard 
                            key={index} 
                            division={dv} 
                            user={user}
                            setRefresh={setRefresh}
                            isJoin={!checkUserInDivision(user, dv.id)}
                        />
                    ))}
                </div>

                {divisions.length > itemsPerPage && (
                    <div className="mt-12 flex items-center justify-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-200 hover:border-blue-500 disabled:opacity-50 disabled:hover:border-gray-200"
                        >
                            <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
                        </button>

                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    currentPage === idx + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {idx + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-200 hover:border-blue-500 disabled:opacity-50 disabled:hover:border-gray-200"
                        >
                            <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}