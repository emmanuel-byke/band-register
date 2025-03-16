import { useContext, useState } from "react";
import { AppContext } from '../AppProvider';
import { useNavigate, NavLink } from "react-router-dom";

import DropDown from "./DropDown";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CogIcon, LogOut, UserIcon } from "lucide-react";
import { logout } from "../Services/auth";
import useAuth from "../Services/useAuth";

export default function Navbar({ navHeaders, mainIcon, userIcon, bgColor, fontColor }) {
    const { setLoggedIn, loggedIn, setUserId, setUser, user } = useContext(AppContext);
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };
    const [activeRef, setActiveRef] = useState('Home')

    return(
        <header className={`w-full ${bgColor||'bg-white border-gray-100'} border-b  shadow-sm`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <NavLink to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                        <img 
                            src={mainIcon.value}
                            className="w-14 h-14 object-contain"
                            alt={mainIcon.name}
                        />
                    </NavLink>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex space-x-8 items-center">
                        {navHeaders.map((header, index) => {
                            if(!header.loginCheck || (header.loginCheck && loggedIn)) {
                                return (
                                    <li key={index}>
                                        <a
                                            href={header.href}
                                            className={ 
                                                `px-3 py-2 ${fontColor||'text-gray-700 hover:text-blue-500'} font-medium transition-colors
                                                ${activeRef===header.name && 'border-b-3 border-blue-500'}`
                                            }
                                            onClick={()=>setActiveRef(header.name)}
                                        >
                                            {header.name}
                                        </a>
                                    </li>
                                );
                            }
                        })}
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${fontColor||
                                'text-gray-600 hover:text-blue-500'} focus:outline-none`}
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center gap-6">
                        {loggedIn ? (
                            <div className="relative group">

                                <DropDown
                                    component={
                                        <div className="flex items-center space-x-2 cursor-pointer">
                                            <img 
                                                src={userIcon.value}
                                                alt={userIcon.name}
                                                className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-400 
                                                    transition-colors"
                                            />
                                        </div>
                                    }
                                    font='font-poppins'
                                    menuItems={[
                                        { 
                                            label: "Profile", 
                                            onClick: () => handleNavigation('userprofile'),
                                            icon: <UserIcon className="h-5 w-5 mr-2 text-gray-500" />,
                                            styles: "hover:bg-gray-50 text-gray-700"
                                        },
                                        {
                                            label: "Admin",
                                            onClick: () => handleNavigation('admin'),
                                            icon: <CogIcon className="h-5 w-5 mr-2 text-green-500" />,
                                            styles: "text-green-600 hover:bg-green-50"
                                        },
                                        {
                                            label: "Settings",
                                            onClick: () => {},
                                            icon: <CogIcon className="h-5 w-5 mr-2 text-gray-500" />,
                                            styles: "hover:bg-gray-50 text-gray-700"
                                        },
                                        {
                                            label: "Log Out",
                                            onClick: () => {
                                                logout();
                                                refreshUser();
                                            },
                                            icon: <LogOut className="h-5 w-5 mr-2 text-red-500" />,
                                            styles: "text-red-600 hover:bg-red-50"
                                        },
                                    ].filter(item=>item.label==='Admin'?user.is_admin:true)}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-5">
                                <NavLink
                                    to="/auth"
                                    state={{isLogin:true}}
                                    className="text-gray-600 hover:text-blue-500 font-medium cursor-pointer transition-colors"
                                >
                                    Log In
                                </NavLink>
                                
                                <NavLink
                                    to="/auth"
                                    state={{isLogin:false}}
                                    className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium transition-colors"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 bg-white">
                        <ul className="space-y-2">
                            {navHeaders.map((header, index) => {
                                if(!header.loginCheck || (header.loginCheck && loggedIn)) {
                                    return (
                                        <li key={index}>
                                            <NavLink
                                                to={header.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={({ isActive }) => 
                                                    `block px-4 py-2 text-gray-700 font-medium
                                                    ${isActive ? 'text-blue-600 bg-blue-50' : 'hover:text-blue-500 hover:bg-gray-50'}`
                                                }
                                            >
                                                {header.name}
                                            </NavLink>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            {loggedIn ? (
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleNavigation('userprofile')}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            setLoggedIn(false);
                                            setUserId(null);
                                            setUser(null);
                                        }}
                                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <NavLink
                                        to="/auth"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}