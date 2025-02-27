import { useState, useRef, useEffect } from "react";
import { ChevronDown } from 'lucide-react';

export default function DropDown(props) {
    const delay = props.dalay ?? 300; // Note: Keeping original prop name spelling
    const showDropDownIcon = props.showDropDownIcon ?? true;
    const chevronSize = props.chevronSize?? 'w-5 h-5'

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
        }, delay);
    };

    return (
        <div 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative inline-block"
        >
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center cursor-pointer ${props.triggerStyles || 'p-2 hover:bg-gray-50 rounded-lg'}`}
            >
                {props.component}
                {showDropDownIcon && (
                    <ChevronDown 
                        className={`${chevronSize} ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                )}
            </div>

            {isOpen && (
                <div className={`absolute ${props.onTop ? 'bottom-full mb-2' : 'mt-2'} right-0 z-50 min-w-[200px] origin-top-right rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 focus:outline-none`}>
                    <div 
                        className="py-1"
                        role="menu" 
                        aria-orientation="vertical" 
                        aria-labelledby="dropdown-button"
                    >
                        {props.menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={`${item.styles} w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100/80 active:bg-gray-100 transition-colors duration-200 rounded-md font-medium font-inter outline-none hover:text-gray-900`}
                                role="menuitem"
                                onClick={() => {
                                    item.onClick?.();
                                    setIsOpen(false);
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}