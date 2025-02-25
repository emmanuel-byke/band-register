import { useState } from 'react';

export default function OverlayDetails(props) {
  const showBtn = props.showBtn??true;
  const size = props.size??' max-w-md w-full ';
  const bgColor = props.bgColor??' bg-gradient-to-r from-purple-600 to-blue-500 ';


  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <header>
      {
        showBtn ? <button
          onClick={() => setIsOpen(true)}
          className={props.styles}>
            {props.btnText}
        </button> : props.item(setIsOpen)
      }

      {isOpen && !props.customComponent && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div 
            className={`${bgColor} p-8 rounded-xl shadow-2xl ${size} mx-4 relative 
              flex flex-col flex-wrap justify-center items-center`}
            onClick={(e) => e.stopPropagation()}>

            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-4" >
                {props.title}
              </h2>
              <p className="text-gray-100 text-lg">
                {props.desc}
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleClose}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={()=>{
                    handleClose();
                    props.onClick();
                  }}
                  className={props.styles}
                  >
                  Confirm
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 p-2">
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {
        isOpen && props.customComponent && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleClose}>
            <div 
              className={`${bgColor} p-8 rounded-xl shadow-2xl ${size} mx-4 relative 
                flex flex-col flex-wrap justify-center items-center`}
              onClick={(e) => e.stopPropagation()}>
              <div className="absolute top-0 right-0">
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-white hover:rounded-tr-xl hover:bg-red-500 px-3 py-1 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
                {props.item()}
            </div>
          </div>
        )
      }
    </header>
  );
};
