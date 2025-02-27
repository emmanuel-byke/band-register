import {getUser, getUserHeader, icons} from "../assets/index";
import { navHeaders } from "../assets/constants";
import { AppContext } from '../AppProvider';
import { useContext } from "react";
import DropDown from "./DropDown";
import { useNavigate, NavLink } from "react-router-dom";


export default function Navbar(props) {
    const{ setLoggedIn, loggedIn } = useContext(AppContext)
    const{ userId, setUserId } = useContext(AppContext)
    const{ user, setUser } = useContext(AppContext)
    const profileNavigator = useNavigate();
    const adminNavigator = useNavigate();

    const handleProfileNavigation = () => {
        profileNavigator('userprofile');
    }
    const handleAdminNavigation = () => {
        adminNavigator('admin');
    }

    return(
        <header className="w-full h-25 px-8 py-2 bg-black/50">
            <nav className="flex justify-between items-center">
                <a href={icons.mainIcon.href}>
                    <img 
                        src={icons.mainIcon.value}
                        width={77}
                        height={77}
                        alt={icons.mainIcon.name}
                    />
                </a>
                <ul className={`flex justify-center items-center gap-10 text-gray text-[20px] font-montserrat-alt font-bold`}>
                    {
                        navHeaders.map((header, index)=>{
                            if(!header.loginCheck || (header.loginCheck && loggedIn)) {
                                return (<li key={index}>
                                    <a href={header.href} className={`hover:text-white`}>
                                        {header.name}
                                    </a>
                                </li>);
                            }
                        })
                    }
                </ul>
                <div>
                    {
                        loggedIn
                        ?<div className={`w-13 h-13 border-gray hover:border-white border-2 rounded-full 
                            flex justify-center items-center cursor-pointer`}
                        >
                            <DropDown component={
                                    <img 
                                        src={icons.userIcon.value}
                                        alt={icons.userIcon.name}
                                        width={40}
                                        height={40}
                                    />
                                } 
                                showDropDownIcon={false}  
                                menuItems={[
                                    {label:"Profile", onClick: ()=>{handleProfileNavigation()}, styles: ""},
                                    {label:"Admin", onClick: ()=>{handleAdminNavigation()}, styles: "text-green-400 hover:text-green-600"},
                                    {label:"Settings", onClick: ()=>{}, styles: ""},
                                    {label:"Log Out", onClick: ()=>
                                        {
                                            setLoggedIn(false); 
                                            setUserId(null); 
                                            setUser(null);
                                        }, 
                                        styles: "text-red-400 hover:text-red-600"},
                                ]
                            }
                            />

                        </div>
                        :<div className="flex flex-row justify-center items-center gap-5">
                            

                            <DropDown component={
                                <button className={`border-1 border-gray-300 hover:border-b-2 hover:border-r-1 hover:border-l-0 hover:border-t-0
                                    hover:border-blue-500 hover:text-white hover:bg-gray-900 bg-gray-600 text-gray-300 rounded-xl 
                                        px-6 py-2 cursor-pointer font-montserrat font-bold`}
                                >
                                    Log In
                                </button>
                                } 
                                showDropDownIcon={false}  
                                menuItems={
                                    getUserHeader().map(u=>({
                                        label:`${u.username} (${u.name})`, 
                                        onClick: ()=>{
                                            setLoggedIn(true);
                                            setUserId(u.id);
                                            setUser(getUser(u.id));
                                        }, 
                                        styles:"" 
                                    }))
                                }
                            />
                            <NavLink 
                                to="/auth" 
                                className="text-gray-300 hover:text-green-300 text-[17px] font-bold font-montserrat cursor-pointer">
                                    Sign Up
                            </NavLink>
                        </div>
                    }
                </div>
            </nav>
        </header>
    );
}