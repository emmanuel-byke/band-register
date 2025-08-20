import { ImSpinner2 } from "react-icons/im";


export const SpinnerBtn = ({type='submit', loading=false, label}) => {

    return (
        <button
            type={type}
            disabled={loading}
            className="w-full py-4 mt-12 text-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-emerald-500 
            rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] 
            hover:from-sky-600 hover:to-emerald-600 active:scale-95 flex flex-row justify-center items-center gap-3"
        >
            {loading && <ImSpinner2 className='w-5 h-5 animate-spin' />}
            <span className={loading ? 'opacity-80' : ''}>
                {loading ? 'Processing...' : label}
            </span>
        </button>
    );
}

export const PrimaryButton = ({ onClick, children, disabled = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ onClick, children, disabled = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium 
                 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {children}
    </button>
  );
};