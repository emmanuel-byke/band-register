export const ProgressBar = ({ currentStep, totalSteps, className = '' }) => {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};