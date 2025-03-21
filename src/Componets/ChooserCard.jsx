import { useEffect, useState } from "react";
import api from "../Services/api";

export default function ChooserCard({currentImg, setCurrentImg, divId}) {
    const [division, setDivision] = useState([]);

    useEffect(()=>{
        const getDiv = async(divId) => {
            try {
                const response = await api.getDivision(divId);
                setDivision(response.data);
            } catch (error) {
               console.error(error?.response?.data);
            }
        }
        getDiv(divId);
    }, []);

    const handleClick = (e, division) => {
        e.preventDefault();
        if(!currentImg || currentImg.value!==division.value) {
            setCurrentImg(division);
        }
    }

    return(
        <div
        className={`relative flex items-center justify-center cursor-pointer
            w-14 h-14 p-1.5 rounded-lg border-2
            ${
                currentImg?.value === division.value
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 bg-white hover:border-gray-300"
            }`
        }
        onClick={(e) => handleClick(e, division)}
    >
        <div className="relative w-full h-full flex items-center justify-center">
            <img
                src={division.value}
                alt={division.name}
                className="w-full h-full object-contain rounded-sm"
            />
            
            {/* Selected Indicator */}
            {currentImg?.value === division.value && (
                <div className="absolute -top-2 -right-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-3 w-3 text-white" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                                12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
}