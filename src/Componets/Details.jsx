import { Calendar, MapPinned, Quote, Star, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppProvider";
import {
  getDateDetails,
  getFormattedTime,
  icons
} from "../assets";
import { detailsNavHeaders } from "../assets/constants";
import { useDivision, useUser } from "../state/hooks/ContextUser";
import AllUsers from "./AllUsers";
import Contact from "./Contact";
import InfoCard from "./InfoCard";
import Navbar from "./Navbar";
import OverlayDetails from "./OverlayDetails";

export default function Details() {
  const { id } = useParams();
  const divisionId = parseInt(id, 10);

  const {renderedInstr} = useContext(AppContext);
  const item = renderedInstr;
  const [filledStars, setFilledStars] = useState(0);
  const { getDivisionRatings, getUserDivisionRatings, rateDivision } = useDivision();
  const [ratings, setRatings] = useState({avg: 0, user: 0});
  const { user } = useUser();
  const { divUsers } = useDivision();


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [members, setMembers] = useState([]);
  const paginatedMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await divUsers(divisionId);
        setMembers(response.data);
      } catch (error) {
        console.error(error?.response?.data);
      }
    };
    fetchMembers();
  }, [divisionId]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const divRatingsresponse = await getDivisionRatings(divisionId);
        const userRatingsresponse = await getUserDivisionRatings();
        setRatings({ avg: divRatingsresponse.data, user: userRatingsresponse.data });
        console.log("Ratings:", divRatingsresponse.data, userRatingsresponse.data);
      } catch (error) {
        console.error(error?.response?.data);
      }
    };
    fetchRatings();
  }, [divisionId]);

  const rateInstrument = async (rating) => {
    setFilledStars(rating);
    try {
      await rateDivision({ division: item.id, value: rating });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <Navbar 
        navHeaders={detailsNavHeaders}
        mainIcon={{ name: item?.name, value: item?.value, href: "/" }}
        userIcon={icons.userIcon}
        bgColor="bg-gradient-to-r from-slate-900 to-slate-100"
        fontColor="text-white hover:text-gray-300"
      />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src={item?.value}
              alt={item?.name}
              className="w-full h-full object-contain aspect-square transform transition-transform duration-300 
                group-hover:scale-105"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white font-montserrat flex flex-row flex-wrap items-center gap-x-6">
              {item?.name} 
              <span className="text-emerald-400 block mt-2"> {item?.role}</span>
            </h1>
            
            {item?.showRatings && (
              <div className="flex items-center gap-4 bg-gray-800/50 p-6 rounded-xl">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < filledStars
                          ? "fill-emerald-400 stroke-emerald-400" 
                          : "stroke-gray-600"
                      }`}
                      onClick={() => rateInstrument(i + 1)}
                    />
                  ))}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">
                    {filledStars}/5
                  </p>
                </div>
              </div>
            )}
            
            {item?.shortWords && (
              <blockquote className="text-2xl text-emerald-300 italic border-l-4 border-emerald-400 pl-4">
                "{item?.shortWords}"
              </blockquote>
            )}
          </div>
        </div>

        {/* Venue Section */}
        {item?.showVenue && (
          <section className="mb-24" id="all-sessions">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-emerald-400" />
              All Sessions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item?.venue_data && item?.venue_data.length > 0 ? (
                item?.venue_data.map((venue, indx) => (
                  <OverlayDetails 
                    key={indx} 
                    showBtn={false} 
                    item={(setIsOpen) => 
                      <InfoCard card={venue} setIsOpen={setIsOpen} altImage={<MapPinned className="h-32 w-32 text-[#36439B]" />} />} 
                    size="w-full"
                    title={`${getDateDetails(venue.date).dayName} ${venue.place}`}
                    desc={
                      <div className="space-y-2">
                        <p className="text-gray-300"> {getDateDetails(venue.date).date2} </p>
                        <p className="font-medium text-white">
                          {getFormattedTime(venue.startTime)} - {getFormattedTime(venue.endTime)}
                        </p>
                        <p className="text-sm text-emerald-400">{venue.role}</p>
                      </div>
                    }
                    bgColor="bg-gray-800"
                    styles="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                  />
                ))
              ) : (
                <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border 
                  border-emerald-400 text-white overflow-hidden h-30 flex justify-center items-center">
                  <p className="text-2xl font-bold italic">No Scheduled Sessions</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Description Section */}
        <section className="mb-24 flex justify-center" id="mission">
          <div className="max-w-3xl text-center space-y-8">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Quote className="w-8 h-8 text-emerald-400" />
              {item?.title}
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                {item?.titleDesc}
              </p>
              {item?.titleQuote && (
                <p className="text-2xl text-emerald-300 italic">
                  "{item?.titleQuote}"
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Members Section */}
        {item?.showUser && members.length > 0 && (
          <section className="mb-16" id="available-members">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Users className="w-8 h-8 text-emerald-400" />
                {item?.baseUserModifier} 
                <span className="text-emerald-400">
                  {item?.baseUser}
                  {members.length === 1 ? "" : "s"} 
                  <span className="text-gray-400 text-xl ml-2">
                    ({members.length} total)
                  </span>
                </span>
              </h2>
            </div>
            
            <AllUsers 
              users={paginatedMembers} 
              baseName={item?.baseUser} 
              divId={divisionId} 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            />
          </section>
        )}
      </main>
      
      {/* Contact Section */}
      <footer id="contact-us">
        <Contact />
      </footer>
    </div>
  );
}
