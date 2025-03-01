import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { capitalize, getDateDetails, getFormattedTime } from '../assets';

export default function VenueRegister(props) {
    const day = getDateDetails(props.data.date);
    const startTime = getFormattedTime(props.data.from);
    const endTime = getFormattedTime(props.data.to);

    const [isOpen, setIsOpen] = useState(false);
    const [attended, setAttended] = useState(null);
    const [selectedReason, setSelectedReason] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleResponse = (response) => {
        if (response) {
            setAttended(true);
            setHasSubmitted(true);
            setTimeout(() => setIsOpen(false), 1500);
        } else {
            setAttended(false);
        }
    };

    const handleReasonSubmit = () => {
        setHasSubmitted(true);
        setTimeout(() => {
            setIsOpen(false);
            setAttended(null);
            setSelectedReason('');
            setHasSubmitted(false);
        }, 2000);
    };

    return (
        <div className="group relative cursor-pointer">
            {/* Card Design */}
            <div 
                onClick={() => setIsOpen(true)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100"
            >
                <div className="flex flex-col items-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                        {capitalize(props.data.place)}
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
                        {capitalize(`${props.name} ${props.data.role}`)}
                    </p>
                </div>
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div 
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="relative h-48 bg-gray-100">
                            <img
                                src={props.img}
                                alt={props.name}
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                            
                            <div className="absolute bottom-4 left-4 text-white">
                                <h2 className="text-xl font-bold">{capitalize(props.name)}</h2>
                                <p className="text-sm text-gray-200">{capitalize(props.data.role)}</p>
                            </div>
                            
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-emerald-200 hover:bg-red-400 transition-colors 
                                    text-gray-600 hover:text-white"
                            >
                                <X className="w-5 h-5 " />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {!hasSubmitted ? (
                                attended === null ? (
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <p className="text-gray-600 mb-2">
                                                {capitalize(`${day.dayName}, ${day.day} ${day.monthName} ${day.year}`)}
                                            </p>
                                            <p className="font-medium text-gray-800">
                                                {startTime} - {endTime}
                                            </p>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-center text-gray-800">
                                                Confirm your attendance
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    onClick={() => handleResponse(true)}
                                                    className="p-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                                                >
                                                    Present
                                                </button>
                                                <button
                                                    onClick={() => handleResponse(false)}
                                                    className="p-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-colors"
                                                >
                                                    Absent
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="">
                                        <button
                                            onClick={() => setAttended(null)}
                                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                                        >
                                            <ArrowLeft className="w-5 h-5 mr-2" />
                                            Back
                                        </button>

                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Reason for absence
                                            </h3>
                                            <div className="space-y-2">
                                                {['Work/Study', 'Health', 'Family', 'Travel', 'Others'].map((reason) => (
                                                    <label
                                                        key={reason}
                                                        className={`flex items-center px-4 py-3 rounded-lg border ${
                                                            selectedReason === reason 
                                                                ? 'border-emerald-500 bg-emerald-50'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                        } transition-all cursor-pointer`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="absence-reason"
                                                            value={reason}
                                                            checked={selectedReason === reason}
                                                            onChange={(e) => setSelectedReason(e.target.value)}
                                                            className="hidden"
                                                        />
                                                        <span className={`flex items-center justify-center w-5 h-5 rounded-full border mr-3 ${
                                                            selectedReason === reason 
                                                                ? 'border-emerald-500 bg-emerald-500'
                                                                : 'border-gray-300'
                                                        }`}>
                                                            {selectedReason === reason && (
                                                                <span className="w-2 h-2 bg-white rounded-full" />
                                                            )}
                                                        </span>
                                                        <span className="text-gray-700">{reason}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            
                                            <button
                                                onClick={handleReasonSubmit}
                                                disabled={!selectedReason}
                                                className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="text-center py-8 space-y-4">
                                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Thank you!
                                    </h3>
                                    <p className="text-gray-600">
                                        Your response has been recorded
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}