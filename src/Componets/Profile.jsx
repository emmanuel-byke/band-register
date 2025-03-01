import { useContext, useState } from "react";
import { AppContext } from '../AppProvider';
import { getUser } from "../assets";
import { NavLink } from "react-router-dom";
import { Settings, User, Bell, CreditCard, Activity, Shield, Upload, Clock, Calendar, AlertCircle } from "lucide-react";

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

    const [previewImage, setPreviewImage] = useState(null);

    if(!loggedIn) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-poppins">
        {/* Header */}
        <header className="bg-white shadow-lg px-8 py-4 flex items-center justify-between border-b border-gray-200">
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    Member Dashboard
                </h1>
                <p className="text-gray-600 mt-1 text-sm">Welcome back, <span className="font-semibold text-gray-800">{user.details.firstname}</span>!</p>
            </div>
            
            <div className="flex items-center gap-6">
                <nav className="flex gap-6">
                    <NavLink to="/" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors group">
                        <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Home</span>
                    </NavLink>
                    <button className="flex items-center gap-2 text-indigo-600 group">
                        <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Profile</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors group">
                        <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Settings</span>
                    </button>
                </nav>
                
                <div className="flex items-center gap-4 ml-6">
                    <div className="text-right">
                        <p className="font-semibold text-gray-900">{user.details.firstname} {user.details.lastname}</p>
                        <p className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{user.role}</p>
                    </div>
                    <div className="relative group">
                        <img 
                            src={user.details.picture} 
                            alt="Avatar" 
                            className="w-12 h-12 rounded-full border-2 border-indigo-100 object-cover shadow-sm hover:border-indigo-200 transition-colors"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </header>

        <div className="flex gap-8 p-8 max-w-7xl mx-auto">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col gap-2">
                <nav className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    {[
                        { icon: User, label: 'Profile', active: true },
                        { icon: CreditCard, label: 'Billing' },
                        { icon: Bell, label: 'Notifications' },
                        { icon: Shield, label: 'Security' }
                    ].map((item, index) => (
                        <button 
                            key={index}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl 
                                ${item.active ? 
                                    'bg-indigo-600 text-white shadow-indigo-sm' : 
                                    'text-gray-600 hover:bg-indigo-50 transition-colors'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
                
                <div className="bg-indigo-600/10 rounded-xl p-4 mt-4 border border-indigo-100">
                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-indigo-600" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Membership Tier</p>
                            <p className="text-xs text-indigo-600 font-semibold">Premium Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
                        </div>
                        <button 
                            onClick={() => setIsEdit(!isEdit)}
                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-[1.02]
                                ${isEdit ? 
                                    'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-sm' : 
                                    'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-sm'}`}
                        >
                            {isEdit ? 'Edit Profile' : 'Save Changes'}
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group group">
                            <img 
                                src={previewImage || user.details.picture} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-full border-4 border-indigo-100 object-cover shadow-lg hover:border-indigo-200 transition-colors"
                            />
                            {!isEdit && (
                                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all">
                                    <Upload className="w-5 h-5 text-indigo-600" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    defaultValue={user.details.firstname}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                                    disabled={isEdit}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    defaultValue={user.details.lastname}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                                    disabled={isEdit}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    defaultValue={user.username}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                                    disabled={isEdit}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    defaultValue={user.details.sex}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 appearance-none bg-select-arrow bg-no-repeat bg-[length:20px] bg-[right_1rem_center]"
                                    disabled={isEdit}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Contact Number</label>
                            <input
                                type="tel"
                                defaultValue={user.details.phone}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                                disabled={isEdit}
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Overview</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-indigo-100 rounded-xl">
                                        <User className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Active Divisions</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <Activity className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Practice Hours</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">127h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <span className="text-gray-700 font-medium">Membership Status</span>
                                <span className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">Active</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <span className="text-gray-700 font-medium">Verification Status</span>
                                <span className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Last Login', value: '2 hours ago', icon: Clock },
                                { label: 'Upcoming Events', value: '3 sessions', icon: Calendar },
                                { label: 'Pending Requests', value: '1 approval', icon: AlertCircle }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-5 h-5 text-gray-500" />
                                        <span className="text-gray-700 font-medium">{item.label}</span>
                                    </div>
                                    <span className="text-gray-900 font-semibold">{item.value}</span>
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