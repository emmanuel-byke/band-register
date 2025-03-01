import { useContext, useState } from "react";
import { AppContext } from '../AppProvider';
import { getUser } from "../assets";
import { NavLink } from "react-router-dom";
import { Settings, User, Bell, CreditCard, Activity, Shield } from "lucide-react";

export default function Profile() {
    const { userId, loggedIn } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(true);
    
    if(!loggedIn) return null;
    
    const user = getUser(userId);
    const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            {/* Header */}
            <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back, {user.details.firstname}!</p>
                </div>
                
                <div className="flex items-center gap-6">
                    <nav className="flex gap-6">
                        <NavLink to="/" className="text-gray-600 hover:text-indigo-600 flex items-center gap-2">
                            <Activity className="w-5 h-5" /> Home
                        </NavLink>
                        <button className="text-indigo-600 flex items-center gap-2">
                            <User className="w-5 h-5" /> Profile
                        </button>
                        <button className="text-gray-600 hover:text-indigo-600 flex items-center gap-2">
                            <Settings className="w-5 h-5" /> Settings
                        </button>
                    </nav>
                    
                    <div className="flex items-center gap-4 ml-6">
                        <div className="text-right">
                            <p className="font-medium text-gray-900">{user.details.firstname} {user.details.lastname}</p>
                            <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                        <img 
                            src={user.details.picture} 
                            alt="Avatar" 
                            className="w-12 h-12 rounded-full border-2 border-indigo-100 object-cover"
                        />
                    </div>
                </div>
            </header>

            <div className="flex gap-8 p-8 max-w-7xl mx-auto">
                {/* Sidebar */}
                <aside className="w-64 flex flex-col gap-2">
                    <nav className="bg-white rounded-xl p-4 shadow-sm">
                        {[
                            { icon: User, label: 'Profile', active: true },
                            { icon: CreditCard, label: 'Billing' },
                            { icon: Bell, label: 'Notifications' },
                            { icon: Shield, label: 'Security' }
                        ].map((item, index) => (
                            <button 
                                key={index}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg 
                                    ${item.active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                    
                    <div className="bg-indigo-50 rounded-xl p-4 mt-4">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-indigo-600" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Membership Status</p>
                                <p className="text-xs text-indigo-600">Premium Member</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                            <button 
                                onClick={() => setIsEdit(!isEdit)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all
                                    ${isEdit ? 
                                        'bg-indigo-600 text-white hover:bg-indigo-700' : 
                                        'bg-green-500 text-white hover:bg-green-600'}`}
                            >
                                {isEdit ? 'Edit Profile' : 'Save Changes'}
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user.details.firstname}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        disabled={isEdit}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user.details.lastname}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        disabled={isEdit}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    defaultValue={user.email}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    disabled
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        defaultValue={user.details.phone}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        disabled={isEdit}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Member Since</label>
                                    <input
                                        type="text"
                                        defaultValue={memberSince}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Overview</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-indigo-50 rounded-xl">
                                    <p className="text-sm text-gray-600">Active Divisions</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl">
                                    <p className="text-sm text-gray-600">Practice Hours</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">127h</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Membership Status</span>
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">Active</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Account Verified</span>
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">Verified</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {[
                                    { label: 'Last Login', value: '2 hours ago' },
                                    { label: 'Upcoming Events', value: '3 sessions' },
                                    { label: 'Pending Requests', value: '1 approval' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">{item.label}</span>
                                        <span className="font-medium text-gray-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}