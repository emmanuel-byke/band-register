import { Check, SearchIcon } from "lucide-react";


const NoRecordsCard = ({check, text, desc, suggest}) => {
  return (
    <div className="max-w-md mx-auto bg-white border-1 border-blue-600 rounded-lg shadow-2xl hover:shadow-blue-400 p-8">
      <div className="flex flex-col items-center text-center">
        {/* Icon Container */}
        <div className="p-3 bg-gray-50 rounded-full mb-4">
            {
                check
                ? <Check className="w-24 h-24 text-blue-600" />
                : <SearchIcon className="w-24 h-24 text-blue-600" />
            }
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold font-poppins text-gray-900 mb-2">
          {text}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4">
          {desc}
        </p>

        {/* Optional Action */}
        {suggest && <a className="text-blue-600 hover:text-blue-700 text-sm transition-colors" href={suggest?.href??'#'}>
            {suggest?.text}
        </a>}
      </div>
    </div>
  );
};

export default NoRecordsCard;