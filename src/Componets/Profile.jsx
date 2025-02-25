import { useContext, useState } from "react";
import { AppContext } from '../AppProvider';
import { getUser } from "../assets";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Profile() {
    const{ userId, loggedIn } = useContext(AppContext)
    if(loggedIn) {
        const user = getUser(userId);
        const [isEdit, setIsEdit] = useState(true);

        const handleSave = ()=> {
            setIsEdit(!isEdit);
        }

        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-roboto">

                <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
                    <div>
                        <h1 className="text-xl text-gray-800 font-bold font-poppins">My Profile</h1>
                        <p className="text-gray-500">Band Register membership portal</p>
                    </div>

                    <div className="flex flex-row justify-center gap-10">
                        <NavLink
                            to={'/'}>
                            Home
                        </NavLink>
                        <a className="text-pink-500">Profile</a>
                        <a>Settings</a>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <p className="text-gray-600 font-lora font-bold">{user.details.firstname} {user.details.lastname}</p>
                        <img
                            src={user.details.picture}
                            alt="User avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                </header>

                <div className="flex flex-1">
                    <aside className="w-64 bg-white shadow-sm p-6">
                        <nav className="flex flex-col space-y-4">
                            <a
                                href="#dashboard"
                                className="text-pink-500 font-medium hover:text-pink-600"
                                >
                                Overview
                            </a>
                            <a
                                href="#accounts"
                                className="text-gray-600 hover:text-pink-500"
                                >
                                Accounts
                            </a>
                            
                            <a
                                href="#complaints"
                                className="text-gray-600 hover:text-pink-500"
                                >
                                Complaints
                            </a>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-6 relative">                

                    {/* Two-column layout for cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

                        <div className="bg-white rounded-2xl shadow-2xl hover:shadow-gray-600 ">
                            <div className="flex flex-col items-center  ">
                                <img
                                    src={user.details.picture}
                                    alt="User avatar"
                                    className="w-130 h-50 object-cover rounded-t-2xl cursor-pointer"
                                />
                                <div className="grid grid-cols-2 px-5 pt-5 w-full">
                                    <h1 className="text-gray-800 font-bold font-poppins text-xl">My Profile</h1>
                                    <div className="grid grid-cols-1 justify-items-end">
                                        <p className="text-gray">username@bandregister</p>
                                        <p className="text-gray">Member</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 px-5 w-full gap-14">
                                    <div className="relative mt-4">
                                        <input
                                            type="text"
                                            id="firstname"
                                            placeholder=" "
                                            className="block w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-600 
                                                appearance-none focus:outline-none focus:ring-0 focus:border-pink-500
                                                text-gray-900 transition-colors peer"
                                        />
                                        <label
                                            htmlFor="firstname"
                                            className="absolute left-3 -top-3.5 text-gray-500 text-sm transition-all
                                                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                                    peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-pink-500
                                                    peer-focus:text-sm"
                                        >
                                            First Name
                                        </label>
                                    </div>
                                    <div className="relative mt-4">
                                        <input
                                            type="text"
                                            id="lastname"
                                            placeholder=" "
                                            className="block w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-600 
                                                appearance-none focus:outline-none focus:ring-0 focus:border-pink-500
                                                text-gray-900 transition-colors peer"
                                        />
                                        <label
                                            htmlFor="lastname"
                                            className="absolute left-3 -top-3.5 text-gray-500 text-sm transition-all
                                                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                                    peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-pink-500
                                                    peer-focus:text-sm"
                                        >
                                            Last Name
                                        </label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 px-5 w-full gap-14">
                                    <div className="relative mt-4">
                                        <input
                                            type="text"
                                            id="phonenumber"
                                            placeholder=" "
                                            className="block w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-600 
                                                appearance-none focus:outline-none focus:ring-0 focus:border-pink-500
                                                text-gray-900 transition-colors peer"
                                        />
                                        <label
                                            htmlFor="phonenumber"
                                            className="absolute left-3 -top-3.5 text-gray-500 text-sm transition-all
                                                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                                    peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-pink-500
                                                    peer-focus:text-sm"
                                        >
                                            Phone Number
                                        </label>
                                    </div>
                                    <div className="relative mt-4">
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder=" "
                                            className="block w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-600 
                                                appearance-none focus:outline-none focus:ring-0 focus:border-pink-500
                                                text-gray-900 transition-colors peer"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-3 -top-3.5 text-gray-500 text-sm transition-all
                                                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                                                    peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-pink-500
                                                    peer-focus:text-sm"
                                        >
                                            Password
                                        </label>
                                    </div>
                                </div>
                                

                            </div>
                            <div className="grid grid-cols-1 justify-items-center pb-5">
                                <button
                                    type='submit'
                                    className={`max-w-2xl py-1 px-6 mt-8 text-[22px] text-white font-roboto-slab  rounded-4xl
                                                bg-gradient-to-r ${isEdit?"from-orange-400 to-pink-500": 
                                                "from-purple-500 to-blue-400"}
                                                transform transition-all duration-200 hover:scale-105
                                                active:scale-95 shadow-lg hover:shadow-xl active:shadow-md cursor-pointer`}
                                    onClick={handleSave}
                                    >
                                    {isEdit?"Edit":"Save"}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            
                            <div className="bg-white rounded-xl shadow-2xl px-6 pt-2 hover:shadow-gray-600 ">
                                <div className="flex items-center justify-center mb-4">
                                    <h2 className="text-xl text-gray-900 font-bold font-poppins">Account Details</h2>
                                </div>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="text-sm text-gray-900">Account is Active</p>
                                        <p className="text-xs text-gray-700 py-1 px-3 rounded-2xl bg-emerald-300">Yes</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="text-sm text-gray-900">Date Created</p>
                                        <p className="text-xs text-gray">19 February, 2025</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="text-sm text-gray-900">Warnings Received</p>
                                        <p className="text-xs text-gray">0</p>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-700 font-semibold">Uniform Fee</span>
                                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                                            Paid
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-700 font-semibold">Registration Fee</span>
                                        <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                                            Pending
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white px-6 pt-2 rounded-2xl shadow-2xl hover:shadow-gray-600 ">
                                <div className="flex items-center justify-center mb-4">
                                    <h2 className="text-xl text-gray-900 font-bold font-poppins">Quick Stat</h2>
                                </div>

                                {/* Example status badges */}
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="text-sm text-gray-900">Divisions Registered</p>
                                        <p className="text-xs text-gray">3</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="text-sm text-gray-900">Pending Register</p>
                                        <p className="text-xs text-gray">1</p>
                                    </div>
                                </div>

                                {/* List of bills/dues with status pills */}
                                <ul className="space-y-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-700 font-semibold">Total Practice Hours</span>
                                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                                            127h
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-700 font-semibold">Admin Rating</span>
                                        <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                                            good member
                                        </span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    </main>
                </div>
            </div>
        );
    }
    return <></>
};


{/* <div className="flex items-center justify-between mb-6">
                                <span className="text-gray-700">SMS alerts activation</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-pink-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                            </div> */}