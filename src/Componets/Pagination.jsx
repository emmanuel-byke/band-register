import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange, className }) {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-2 rounded-md bg-gray-700 text-gray-300 hover:bg-emerald-500 hover:text-white transition-colors 
                    disabled:opacity-50"
            >
                <ChevronLeft className="w-9 h-9 text-white" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i+1}
                    onClick={() => onPageChange(i+1)}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === i+1 
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-emerald-500/50'
                    } transition-colors`}
                >
                    {i+1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-2 rounded-md bg-gray-700 text-gray-300 hover:bg-emerald-500 hover:text-white transition-colors 
                    disabled:opacity-50"
            >
                <ChevronRight className="h-9 w-9 text-white" />
            </button>
        </div>
    );
}