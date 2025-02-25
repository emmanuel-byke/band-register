import { ArrowLeft, Check, CheckCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { capitalize, getDateDetails, getFormattedTime } from '../assets';

export default function VenueRegister(props) {
    const day = getDateDetails(props.data.date);
    const startTime = getFormattedTime(props.data.from);
    const endTime = getFormattedTime(props.data.to);

    const [isOpen, setIsOpen] = useState(false);
    const [attended, setAttended] = useState(null);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleResponse = (response) => {
        if (response) {
            setAttended(true);
            setHasSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                handleReasonSubmit();
            }, 1500);
        } else {
        setAttended(false);
        }
    };

    const handleReasonSubmit = () => {
        setHasSubmitted(true);
        setTimeout(() => {
        setIsOpen(false);
        // Reset states for next use
        setAttended(null);
        setSelectedReasons([]);
        setHasSubmitted(false);
        }, 2000);
    };


    return (
        <header className="p-8 flex justify-center">
            <div className={`bg-[#282A30] hover:bg-[#5a5b5f] p-1 border-1 border-emerald-200 transition-all shadow-2xl 
                hover:shadow-emerald-200 w-65 h-50 flex justify-center items-center cursor-pointer`}
                onClick={() => setIsOpen(true)}>
                    <div className='flex flex-col justify-around items-center w-full h-full border-gray hover:border-1'>
                        <CheckCircle className="h-15 w-15 text-emerald-400" />
                        <h1 className='text-emerald-400 text-[20px] text-center font-bold font-lora'>
                            {capitalize(`${props.data.day} ${props.name} ${props.data.role} ${props.data.place}`)}   
                        </h1>
                    </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)} >
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`absolute top-4 right-4 text-red-500 bg-gray hover:text-white hover:bg-red-500
                                transition-colors z-10 rounded-full`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    <div className="relative">
                        <div className={`bg-cover bg-center relative flex items-center justify-center`}>
                            <img 
                                src={props.img} 
                                alt={props.name}
                                className="w-[500px] h-[250px] object-contain "
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h2 className="text-2xl font-bold">{capitalize(`${props.name} ${props.data.role} ${props.data.place}`)}</h2>
                                <p className="text-gray-200">{capitalize(day.dayName)}</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">





                            {!hasSubmitted ? 
                                (attended === null ? (
                                    <div className="text-center">
                                        <p className="text-gray-600 text-lg mb-2">
                                            {capitalize(`${day.dayName}, ${day.day} ${day.monthName} ${day.year}`)}<br />
                                            {capitalize(`${startTime} - ${endTime}`)}
                                        </p>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                                            Were you present at this session?
                                        </h3>
                                        <div className="flex gap-4 justify-center pb-4">
                                            <button
                                                onClick={() => handleResponse(true)}
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl transition-all transform hover:scale-105 flex-1 max-w-[200px]">
                                                Yes, I was there
                                            </button>
                                            <button
                                                onClick={() => handleResponse(false)}
                                                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl transition-all transform hover:scale-105 flex-1 max-w-[200px]">
                                                No, I wasn't
                                            </button>
                                        </div>
                                    </div>
                                    ) : (
                                    <div className="space-y-4">
                                        <div className='flex flex-row justify-around items-center'>
                                            <ArrowLeft className="h-6 w-6 text-emerald-400 cursor-pointer" onClick={() => setAttended(null)} />
                                            <p className="text-gray-600 text-md text-center font-merienda">
                                                Please select reason(s) for <span className='font-bold'>absence</span>
                                            </p>

                                        </div>
                                        <div className="">
                                            {['Work/Study', 'Health', 'Family', 'Travel', 'Others'].map((reason) => (
                                            <label 
                                                key={reason}
                                                className="flex items-center px-7 pt-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="selection-reason"
                                                    checked={selectedReasons === reason}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedReasons(reason);
                                                        } 
                                                    }}
                                                    className="form-radio h-5 w-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                                                    id={reason}/>
                                                <span className="ml-3 text-gray-700">{reason}</span>
                                            </label>
                                        
                                            ))}
                                        </div>
                                        <button
                                            onClick={handleReasonSubmit}
                                            disabled={selectedReasons.length === 0}
                                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                                Submit Response
                                        </button>
                                    </div>
                                    )
                                ) : 

                                (
                                    <div className="text-center py-6">
                                        <p className="text-emerald-600 font-semibold text-lg mb-2">
                                            🎉 Thanks for your feedback!
                                        </p>
                                        <p className="text-gray-600">
                                            Your response has been recorded
                                        </p>
                                        </div>
                                )
                            }















                            
                            


                        </div>
                    </div>
                    </div>
                </div>
            )}
        </header>
    );
};



