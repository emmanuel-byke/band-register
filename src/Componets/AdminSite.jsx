import { useContext, useState } from "react";
import { AppContext } from '../AppProvider';
import { capitalize, getAllDivisions, getAllUsers, getAvgAttendance, getStructuredDivData, getTopAbsenceReason, getUser } from "../assets";
import { Home, Stethoscope, Calendar, Users, Settings, Shield, Menu, Bell, ChevronDown, DollarSign, Heart, FileText, Notebook, Users2, User, UsersIcon, UsersRound, UserSquare, Mic, UserRoundX, Edit, Search } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DropDown from "./DropDown";




export default function AdminSite() {
  const { userId, loggedIn } = useContext(AppContext);

  if (!loggedIn) return <></>;

  const user = getUser(userId);
  const users = getAllUsers();
  const divisions = getAllDivisions();
  const avgAttendance = getAvgAttendance(users).toFixed(1);
  const topAbsentReason = getTopAbsenceReason(users);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [searchUser, setSearchUser] = useState("");
  const [renderedUsers, setRenderedUsers] = useState(users);
  const [timeFrame, setTimeFrame] = useState("monthly");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const handleSearchedUser = (e) =>{
    setSearchUser(e.target.value);
    setRenderedUsers(users.filter(user=>{
      return user.details.firstname === searchUser
    }));
  }

  const filtereUsers = users.filter(user =>
    user.details.firstname.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.details.lastname.toLowerCase().includes(searchUser.toLowerCase())
  );

  // Updated menu items to match the image
  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, id: "dashboard" },
    { name: "Users", icon: <Users className="w-5 h-5" />, id: "users" },
    { name: "Divisions", icon: <Mic className="w-5 h-5" />, id: "divisions" },
    { name: "Schedules", icon: <Edit className="w-5 h-5" />, id: "schedules" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, id: "settings" },
  ];

  // Updated stats with colors and icons from the image
  const stats = [
    { title: "Total Users", value: users.length, change: "+1.7k%", icon: <Users className="w-6 h-6 text-white" />, bg: "bg-gradient-to-r from-pink-500 to-red-400" },
    { title: "Total Divisions", value: divisions.length, change: "+1 new", icon: <Mic className="w-6 h-6 text-white" />, bg: "bg-gradient-to-r from-green-300 to-emerald-500" },
    { title: "Average Attendance", value: `${avgAttendance}%`, change: "+0.3% today", icon: <Calendar className="w-6 h-6 text-white" />, bg: "bg-gradient-to-r from-[#2196F3] to-sky-700" },
    { title: "Top Absence Reason", value: topAbsentReason.name, change: `${topAbsentReason.value} times`, icon: <UserRoundX className="w-6 h-6 text-white" />, bg: "bg-gradient-to-r from-purple-400 to-[#9C27B0]" },
  ];



  const vocalRangeData = [
    { month: 'Jan', soprano: 12, alto: 8, tenor: 6, bass: 4 },
    { month: 'Feb', soprano: 14, alto: 9, tenor: 7, bass: 5 },
    { month: 'Mar', soprano: 16, alto: 10, tenor: 8, bass: 6 },
  ];

  getStructuredDivData();

  return (
    <div className="flex w-full font-open-sans">
      {/* Sidebar */}
      <aside className={`bg-white text-gray-800 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} flex flex-col py-4`}>
        <div className="flex items-center justify-between mb-8 px-4">
          {!isCollapsed && (
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              <h1 className="text-xl font-bold tracking-wide text-green-500">Band Register</h1>
            </div>
          )}
          <button onClick={toggleSidebar} className="p-2 hover:bg-[#66BB6A] rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center py-4 mr-4 cursor-pointer hover:bg-emerald-100 rounded-br-full transition-colors ${
                  activePage === item.id ? "bg-gradient-to-r from-emerald-600 to-emerald-200 font-medium" : ""
                }`}
              >
                <div className="flex flex-row px-4">
                  {item.icon}
                  {!isCollapsed && <span className="ml-3 text-sm">{item.name}</span>}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex flex-col w-full">
        {/* Header */}
        <header className="w-full h-20 flex justify-between items-center bg-white shadow-sm px-10">
          <div className="flex items-center gap-2">
            {menuItems.find((item) => item.id === activePage)?.icon}
            <h1 className="text-gray-800 text-2xl font-bold">{capitalize(activePage)}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <Settings className="w-5 h-5 text-gray-600" />
            <img
              src={user.details.picture}
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover border border-[#4CAF50]"
            />
            <p className="text-gray-800">
              Hello, {user.details.firstname} <ChevronDown className="w-4 h-4 inline ml-1" />
            </p>
          </div>
        </header>

        {/* Main Content */}
        {activePage === "dashboard" && (
          <main className="flex-1 p-8 bg-gray-50">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome to <span className="text-green-400"> Band Register</span> Admin Site
              </h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className={`${stat.bg} p-6 rounded-xl shadow-2xl hover:shadow-emerald-400 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold mb-2">{stat.value}</p>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{stat.change}</span>
                    </div>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-gray-800">Revenue</h3>
                  <select
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    className="bg-green-100 text-green-800 border border-green-300 text-sm rounded-lg px-3 py-1"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg">
                              <h2 className="text-xl font-semibold font-poppins mb-4">Vocal Range Progress</h2>
                              <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={vocalRangeData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="soprano" fill="#F472B6" />
                                    <Bar dataKey="alto" fill="#F59E0B" />
                                    <Bar dataKey="tenor" fill="#3B82F6" />
                                    <Bar dataKey="bass" fill="#10B981" />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-gray-800">Patient Statistic</h3>
                  <select
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    className="bg-green-100 text-green-800 border border-green-300 text-sm rounded-lg px-3 py-1"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                  Patient statistic chart placeholder
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#F57C00] p-6 rounded-xl shadow-sm text-white">
                <h3 className="font-semibold mb-4">Check Your Job Schedule</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Patient Review</p>
                    <p className="text-sm opacity-80">15 pending reviews</p>
                  </div>
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Source Document Effect</h3>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between mb-2">
                    <span>Patient Documents</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
        {activePage === "users" && (
          <main className="flex-1 p-8">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-black text-xl font-bold">Manage All <span className="text-emerald-400">Users</span></h1>

              <div className="relative w-full max-w-md pt-6">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:border-emerald-400 
                  transition-colors focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400">
                  <Search className="w-5 h-5 text-emerald-400 ml-4" />

                  <input
                    type="text"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-3 text-gray-900 bg-transparent outline-none placeholder-gray-400"
                  />
                </div>
              </div>
              
            </div>

            <div className="pt-10 flex flex-row flex-wrap justify-between gap-y-15 gap-x-6">
              {
                filtereUsers.map((u, index)=>(
                  (searchUser !== '' || u.id !==user.id ) && <div className="flex flex-col w-70 h-80 rounded-t-xl 
                    hover:shadow-2xl transform transition-transform duration-600 hover:scale-103"
                    key={index}>
                    <img 
                      src={u.details.picture}
                      alt={u.details.firstname}
                      className="w-70 h-80 object-cover rounded-t-xl shadow-sm"
                    />
                    <div className="w-full flex flex-row items-center justify-between">
                      <div className="w-full flex flex-row items-center gap-1">
                        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        <h2 className="text-[rgb(33,37,49)] font-bold">
                          {capitalize(u.details.firstname)} {capitalize(u.details.lastname)}
                        </h2>
                      </div>
                      <DropDown
                        dalay={2000}
                        onTop={true}
                        chevronSize='w-7 h-7'
                        menuItems={[
                            {label:"Details", onClick: ()=>{}, styles: ""},
                            {label:"Statistics", onClick: ()=>{}, styles: "text-green-400 hover:text-green-600"},
                            {label:"Make Admin", onClick: ()=>{}, styles: ""},
                            {label:"Deactivate Account", onClick: ()=> {}, styles: "text-red-400 hover:text-red-600"},
                            {label:"Delete Account", onClick: ()=> {}, styles: "text-red-400 hover:text-red-600"},
                        ]
                      }
                      />
                    </div>
                  </div>

                ))
              }

            </div>




          </main>
        )}




      </div>
    </div>
  );
}