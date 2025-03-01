import { useContext } from "react";
import { AppContext } from '../AppProvider';
import ChooserCard from "./ChooserCard";
import { NavLink } from "react-router-dom";
import { getUser } from "../assets";

export default function ImageChooser() {
    const{ currentInstr, setCurrentInstr, userId } = useContext(AppContext)
    const user = getUser(userId);

    return (
    <header className="max-w-6xl mx-auto p-6 space-y-8">
        
        <div className="group relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 
            hover:shadow-3xl">
            {currentInstr ? (
                <NavLink 
                    to={`/instrument/detail/${currentInstr.id}`} 
                    state={currentInstr}
                    className="block h-full w-full"
                >
                    <img
                        src={currentInstr.value}
                        alt={currentInstr.name}
                        className="h-full w-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 opacity-0 
                        group-hover:opacity-100 transition-opacity">
                        <h3 className="text-3xl font-bold text-white font-lora">
                            {currentInstr.name}
                            <span className="block text-lg text-gray-200 mt-2 font-montserrat">
                                Click for details
                            </span>
                        </h3>
                    </div>
                </NavLink>
            ) : (
                <div className="h-full w-full bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center 
                    gap-6 p-8">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-24 w-24 text-gray-400 animate-float" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <h2 className="text-3xl font-semibold text-gray-600 text-center font-lora">
                        Select Your Instrument <br/>
                        <span className="text-lg text-gray-500 font-montserrat">Choose from your available options below</span>
                    </h2>
                </div>
            )}
        </div>

        
        {user?.divisions && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {Object.values(user.divisions).map((item, index) => (
                    <ChooserCard 
                        key={index}
                        currentImg={currentInstr}
                        setCurrentImg={setCurrentInstr}
                        item={item}
                        className={`transform transition-all duration-300 hover:scale-105 ${
                            currentInstr?.id === item.id 
                                ? 'ring-4 ring-blue-500' 
                                : 'ring-1 ring-gray-200 hover:ring-blue-300'
                        }`}
                    />
                ))}
            </div>
        )}
    </header>
    );
}