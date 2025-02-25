import { useState, useRef, useEffect } from "react";
import { ChevronDown } from 'lucide-react';


export default function DropDown(props) {
    const delay = props.dalay?? 300;
    const showDropDownIcon = props.showDropDownIcon?? true;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        }, []);

        const handleMouseEnter = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    
        const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, delay); // Delay before closing to make it feel smoother
    };

    return (
        <div 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
            <div onClick={() => setIsOpen(!isOpen)} >
                {
                    props.component
                }
                {
                    showDropDownIcon?<ChevronDown className="w-4 h-4 ml-2" /> : <></>
                }                
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div 
                        className="py-1" 
                        role="menu" 
                        aria-orientation="vertical" 
                        aria-labelledby="dropdown-button"
                    >
                        {props.menuItems.map((item, index) => (
                        <h1
                            key={index}
                            className={`${item.styles} w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                                hover:text-gray-900 text-[17px] font-montserrat`}
                            role="menuitem"
                            onClick={() => {
                            item.onClick?.();
                            setIsOpen(false);
                            }}
                        >
                            {item.label}
                        </h1>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}