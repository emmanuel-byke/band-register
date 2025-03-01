import React, { cloneElement, useContext, useState } from "react";
import { AppContext } from '../AppProvider';
import { addS, allVenues, capitalize, countUsersInDiv, getAllDivisions, getAllUsers, getAvgAttendance, getDateDetails, getDiv, getFormattedTime, getStructuredDivData, getTop5Users, getTopAbsenceReason, getUser, getVenue, pendingActivities, pendingRequest } from "../assets";
import { Home, Stethoscope, Calendar, Users, Settings, Shield, Menu, Bell, ChevronDown, DollarSign, Heart, FileText, 
  Notebook, Users2, User, UsersIcon, UsersRound, UserSquare, Mic, UserRoundX, Edit, Search, Plus, 
  X, 
  Trash,
  Image,
  Lamp,
  Pen,
  LogOut,
  CalendarCheck,
  Activity,
  MoreVertical,
  MessageSquare,
  Lock,
  Trash2} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DropDown from "./DropDown";
import { GiMagicLamp, GiMagicPortal } from "react-icons/gi";



const SectionWithPagination = ({ 
  title, 
  items, 
  page, 
  setPage, 
  itemsPerPage, 
  renderItem,
  className 
}) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className={`mt-12 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{title} ({items.length})</h2>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Page {page} of {totalPages}</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg p-6 text-center text-slate-500">
          No items found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderItem(item)}
              </React.Fragment>
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
              onPrev={() => setPage(p => Math.max(1, p - 1))}
              onNext={() => setPage(p => Math.min(totalPages, p + 1))}
              className="mt-8"
            />
          )}
        </>
      )}
    </section>
  );
};


const PaginationControls = ({ currentPage, totalPages, onPrev, onNext, className }) => (
  <div className={`flex justify-center items-center gap-4 ${className}`}>
    <button
      onClick={onPrev}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <span className="text-slate-700 text-sm">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
);

const UserCard = ({ user, currentUserId, onDetails, onMakeAdmin, onDeactivate, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
    {/* User Image */}
    <div className="relative aspect-square bg-slate-100">
      <img
        src={user.details.picture}
        alt={`${user.details.firstname} ${user.details.lastname}`}
        className="w-full h-full object-cover object-center"
      />
      {/* Online Status */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-xs">
        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        <span className="text-slate-600">Online</span>
      </div>
    </div>

    {/* User Info */}
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-slate-800">
            {capitalize(user.details.firstname)} {capitalize(user.details.lastname)}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {user.role === 'admin' && (
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs">
                Administrator
              </span>
            )}
          </p>
        </div>

        {/* Actions Dropdown */}
        {user.id !==currentUserId && (
          <DropDown
            onTop={true}
            trigger={
              <button className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50">
                <MoreVertical className="w-6 h-6" />
              </button>
            }
            menuItems={[
              {
                label: "View Details",
                icon: <User className="w-4 h-4 mr-2" />,
                onClick: onDetails
              },
              {
                label: "Usage Statistics",
                icon: <Activity className="w-4 h-4 mr-2 text-emerald-600" />,
                onClick: () => {}
              },
              {
                label: user.role === 'admin' ? "Revoke Admin" : "Make Admin",
                icon: <Shield className="w-4 h-4 mr-2" />,
                onClick: onMakeAdmin
              },
              {
                label: "Send Message",
                icon: <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />,
                onClick: () => {}
              },
              {
                type: 'divider'
              },
              {
                label: "Deactivate Account",
                icon: <Lock className="w-4 h-4 mr-2 text-amber-600" />,
                onClick: onDeactivate,
                className: "text-amber-700 hover:bg-amber-50"
              },
              {
                label: "Delete Account",
                icon: <Trash2 className="w-4 h-4 mr-2 text-red-600" />,
                onClick: onDelete,
                className: "text-red-700 hover:bg-red-50"
              }
            ]}
            position="right"
          />
        )}
      </div>
    </div>
  </div>
);

const ScheduleCard = ({ item, type, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <div className="p-4 border-b border-slate-100">
      <div className="aspect-video bg-slate-50 rounded-lg flex items-center justify-center">
        {item.img || item.poster ? (
          <img 
            src={type === 'activity' ? item.poster: item.img}
            alt={type === 'activity' ? item.title : item.place}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-slate-400 p-6">
            <Image className="w-8 h-8" />
          </div>
        )}
      </div>
    </div>
    
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">
            {type === 'activity' ? item.title : `${item.role} - ${item.place}`}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {type === 'activity' 
              ? getDateDetails(item.date).date2
              : `${getDateDetails(item.date).date2} | ${getFormattedTime(item.from)} - ${getFormattedTime(item.to)}`
            }
          </p>
        </div>
        
        <DropDown
          onTop={true}
          menuItems={[
            {
              label: "Edit",
              icon: <Edit className="w-4 h-4 mr-2" />,
              onClick: onEdit,
            },
            {
              label: "Delete",
              icon: <Trash className="w-4 h-4 mr-2 text-red-500" />,
              onClick: onDelete,
              className: "text-red-600 hover:bg-red-50",
            }
          ]}
        />
      </div>
    </div>
  </div>
);

const AttendanceCard = ({ request, onApprove, onReject }) => {
  const user = getUser(request.userId);
  const venue = getVenue(request.venueId);
  const division = getDiv(request.divId);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-slate-500 text-lg font-medium">
              {user.details.firstname[0]}{user.details.lastname[0]}
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">
            {user.details.firstname} {user.details.lastname}
          </h4>
          <p className="text-sm text-slate-500">
            {capitalize(division.name)} {capitalize(division.role)} on {getDateDetails(venue.date).date2}
          </p>
        </div>
      </div>
      
      <div className="flex gap-3 mt-4">
        <button
          onClick={onApprove}
          className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm font-medium"
        >
          Approve
        </button>
        <button
          onClick={onReject}
          className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
        >
          Reject
        </button>
      </div>
    </div>
  );
};


export default function AdminSite() {
  const { userId, loggedIn } = useContext(AppContext);

  if (!loggedIn) return <></>;

  const user = getUser(userId);
  const users = getAllUsers();
  const divisions = getAllDivisions();
  const avgAttendance = getAvgAttendance(users).toFixed(1);
  const topAbsentReason = getTopAbsenceReason(users);

  const activities = pendingActivities;
  const venues = allVenues;
  const pendingReq = pendingRequest;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDivCreateForm, setShowDivCreateForm] = useState(false);
  const [showScheduleCreate, setShowScheduleCreate] = useState(false);
  const [isActivity, setIsActivity] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [searchUser, setSearchUser] = useState("");
  const [searchSchedule, setSearchSchedule] = useState("");
  const [searchDivsion, setSearchDivsion] = useState("");
  const [currentPageActivities, setCurrentPageActivities] = useState(1);
  const [currentPageVenues, setCurrentPageVenues] = useState(1);
  const [registersPerPage, setRegistersPerPage] = useState(3)
  const [currentPageRegisters, setCurrentPageRegisters] = useState(1)
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  

  const filtereUsers = users.filter(user =>
    user.details.firstname.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.details.lastname.toLowerCase().includes(searchUser.toLowerCase())
  );
  const filtereDivisions = divisions.filter(division =>
    division.name.toLowerCase().includes(searchDivsion.toLowerCase())
  );
  const filtereActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchSchedule.toLowerCase()) ||
    activity.time.toLowerCase().includes(searchSchedule.toLowerCase()) ||
    getDateDetails(activity.date).date2.toLowerCase().includes(searchSchedule.toLowerCase())
  );
  const filtereVenues = venues.filter(venue =>
    venue.role.toLowerCase().includes(searchSchedule.toLowerCase()) ||
    venue.place.toLowerCase().includes(searchSchedule.toLowerCase()) ||
    getFormattedTime(venue.from).toLowerCase().includes(searchSchedule.toLowerCase()) ||
    getFormattedTime(venue.to).toLowerCase().includes(searchSchedule.toLowerCase()) ||
    getDateDetails(venue.date).date2.toLowerCase().includes(searchSchedule.toLowerCase())
  );

  const handleEditActivity = (e) =>{
    console.log(e);
  }
  const handleDeleteActivity = (e) =>{
    console.log(e);
  }
  const handleEditVenue = (e) =>{
    console.log(e);
  }
  const handleDeleteVenue = (e) =>{
    console.log(e);
  }
  const handleApproveAttendance = (e) =>{
    console.log(e);
  }
  const handleRejectAttendance = (e) =>{
    console.log(e);
  }

  const handleUserDetails = (userId) => {
    console.log(userId);
  }
  const handleMakeAdmin = (userId) => {
    console.log(userId);
  }
  const handleDeactivate = (userId) => {
    console.log(userId);
  }
  const handleDeleteUser = (userId) => {
    console.log(userId);
  }

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



  const totalHoursAttended = getStructuredDivData().map(item => {
    const result = { month: item.month };
    item.div.forEach(d => {
      result[d.name] = d.value;
    });
    return result;
  });

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];


  return (
    <div className="flex w-full font-open-sans">
  
      <aside className={`bg-white border-r border-slate-100 transition-[width] duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"} flex flex-col`}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 mb-4 border-b border-slate-100">
          <div className={`flex items-center overflow-hidden transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
            <Lamp className="w-7 h-7 mr-2 text-emerald-600 transition-transform duration-300 hover:text-emerald-700" />
            <h1 className="text-xl font-bold tracking-tight text-emerald-600 transform transition-opacity duration-200">
              Admin
            </h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-emerald-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="w-6 h-6 text-slate-600 hover:text-emerald-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`group relative transition-colors duration-200 ${
                  activePage === item.id 
                    ? "bg-emerald-50 border-l-4 border-emerald-500 font-semibold" 
                    : "hover:bg-slate-50"
                }`}
              >
                <button
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    activePage === item.id 
                      ? "text-emerald-700" 
                      : "text-slate-600 hover:text-emerald-600"
                  }`}
                  aria-current={activePage === item.id ? "page" : undefined}
                >
                  <span className={`transform transition-colors duration-200 ${activePage === item.id ? "text-emerald-600" : "text-slate-500"}`}>
                    {cloneElement(item.icon, { className: "w-5 h-5" })}
                  </span>
                  {!isCollapsed && (
                    <span className="ml-3 text-sm tracking-wide transition-opacity duration-200">
                      {item.name}
                    </span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-4 px-3 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      {item.name}
                      <div className="absolute w-3 h-3 bg-slate-800 rotate-45 -left-1.5 top-1/2 -translate-y-1/2" />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapsed State Helper */}
        {isCollapsed && (
          <div className="mt-auto p-2 text-center border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">v1.2.0</span>
          </div>
        )}
      </aside>


      <div className="flex flex-col w-full">
        <header className="w-full h-20 flex justify-between items-center bg-white shadow-sm px-6 lg:px-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              {menuItems.find((item) => item.id === activePage)?.icon}
            </div>
            <h1 className="text-slate-800 text-xl font-semibold">
              {capitalize(activePage)}
              <span className="block text-sm text-slate-500 font-normal mt-1">Admin Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <DropDown
              trigger={
                <div className="flex items-center gap-2 cursor-pointer group">
                  <img
                    src={user.details.picture}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-emerald-100 group-hover:border-emerald-200 transition-colors"
                  />
                  <div className="hidden lg:block">
                    <p className="text-slate-700 text-sm font-medium">
                      {user.details.firstname} {user.details.lastname}
                      <ChevronDown className="w-4 h-4 inline ml-1 text-slate-400" />
                    </p>
                    <p className="text-xs text-slate-500">Admin Account</p>
                  </div>
                </div>
              }
              menuItems={[
                { label: "Profile Settings", icon: <User /> },
                { label: "Notification Preferences", icon: <Bell /> },
                { label: "System Settings", icon: <Settings /> },
                { type: "divider" },
                { label: "Log Out", icon: <LogOut />, className: "text-red-600 hover:bg-red-50" }
              ]}
            />
          </div>
        </header>

        {/* Enhanced Dashboard */}
        {activePage === "dashboard" && (
          <main className="flex-1 p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                  Welcome to <span className="text-emerald-600">Band Register</span> Administration
                </h1>
                <p className="text-slate-600">Last login: {new Date().toLocaleDateString()}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-slate-500 mb-2">{stat.title}</p>
                        <p className="text-2xl font-bold text-slate-800 mb-2">{stat.value}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stat.change.includes('+') 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        {cloneElement(stat.icon, { className: "w-6 h-6 text-emerald-600" })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Hours Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-800">Attendance by Division</h2>
                    <p className="text-sm text-slate-500">Past 3 Months Total Attendance</p>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={totalHoursAttended}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fill: '#64748b' }}
                          axisLine={{ stroke: '#cbd5e1' }}
                        />
                        <YAxis 
                          tick={{ fill: '#64748b' }}
                          axisLine={{ stroke: '#cbd5e1' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                        {totalHoursAttended.length > 0 &&
                          Object.keys(totalHoursAttended[0])
                            .filter(key => key !== 'month')
                            .map((key, index) => (
                              <Bar 
                                key={key}
                                dataKey={key}
                                fill={COLORS[index % COLORS.length]}
                                radius={[4, 4, 0, 0]}
                              />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top Members Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-800">Top Performers</h2>
                    <p className="text-sm text-slate-500">Most active members for past 3 months</p>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={getTop5Users()}
                        margin={{ left: 120, right: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          type="number"
                          tick={{ fill: '#64748b' }}
                          axisLine={{ stroke: '#cbd5e1' }}
                        />
                        <YAxis 
                          dataKey="name"
                          type="category"
                          tick={{ fill: '#64748b', fontSize: 12 }}
                          axisLine={{ stroke: '#cbd5e1' }}
                          width={140}
                        />
                        <Tooltip 
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar 
                          dataKey="total"
                          fill="#4f46e5"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Schedules Card */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 rounded-xl text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold mb-2">Schedule Management</h3>
                      <p className="text-sm opacity-90">{pendingReq.length} pending reviews</p>
                      <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                        Review Now
                      </button>
                    </div>
                    <CalendarCheck className="w-12 h-12 opacity-20" />
                  </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">System Health</h3>
                      <p className="text-sm text-slate-500">Platform performance</p>
                    </div>
                    <div className="text-emerald-600 bg-emerald-100 p-2 rounded-lg">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">Storage Usage</span>
                        <span className="text-slate-600">65%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: '65%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">Active Users</span>
                        <span className="text-slate-600">84%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: '84%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      
        {activePage === "users" && (
          <main className="flex-1 p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Manage <span className="text-emerald-600">Users</span>
                </h1>
                
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mt-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="w-5 h-5 text-emerald-500" />
                    </div>
                    <input
                      type="text"
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                      placeholder="Search users..."
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 
                        focus:border-emerald-500 transition-all shadow-sm text-sm"
                      aria-label="Search users"
                    />
                  </div>
                </div>
              </div>

              {/* User Grid with Pagination */}
              <SectionWithPagination
                title="Registered Users"
                items={filtereUsers.filter(u => searchUser !== '' || u.id !== user.id)}
                page={currentPageUsers}
                setPage={setCurrentPageUsers}
                itemsPerPage={9}
                renderItem={(u) => (
                  <UserCard 
                    user={u}
                    currentUserId={user.id}
                    onDetails={() => handleUserDetails(u.id)}
                    onMakeAdmin={() => handleMakeAdmin(u.id)}
                    onDeactivate={() => handleDeactivate(u.id)}
                    onDelete={() => handleDeleteUser(u.id)}
                  />
                )}
                emptyMessage="No users found matching your search criteria"
              />
            </div>
          </main>
        )}

        {activePage === "divisions" && (
          <main className="flex-1 p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
                  Manage Band Register 
                  <span className="text-indigo-600 ml-2">Divisions</span>
                </h1>
                
                {/* Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
                  <button 
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
                    onClick={() => setShowDivCreateForm(true)}
                  >
                    <Plus className="w-5 h-5 text-white" />
                    <span className="text-sm font-semibold">Create Division</span>
                  </button>

                  <div className="w-full md:max-w-xs relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={searchDivsion}
                      onChange={(e) => setSearchDivsion(e.target.value)}
                      placeholder="Search divisions..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>

              
              {showDivCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative p-8">
                    <button 
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                      onClick={() => setShowDivCreateForm(false)}
                    >
                      <X className="h-6 w-6 text-slate-600" />
                    </button>
                    
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                      Create New Division
                    </h2>

                    {/* Form Grid */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Division Name</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Marketing Team"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Primary Role</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Brand Management"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Inspiring Words</label>
                        <input 
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Empowering creativity"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Mission Title</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Global Outreach"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Expand market reach"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Inspirational Quote</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Innovate or stagnate"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-slate-200">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Upload Logo</label>
                          <input 
                            type="file"
                            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                          />
                        </div>
                        <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors self-end">
                          Create Division
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {filtereDivisions.map((division, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="p-4 border-b border-slate-100">
                      <div className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center">
                        {division.value ? (
                          <img 
                            src={division.value}
                            alt={division.name}
                            className="w-full h-full object-contain p-4"
                          />
                        ) : (
                          <Image className="w-12 h-12 text-slate-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {capitalize(division.name)}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {countUsersInDiv(division.id)} {capitalize(division.baseUser)}{addS(countUsersInDiv(division.id))}
                          </p>
                        </div>
                        
                        <DropDown
                          dalay={2000}
                          onTop={true}
                          chevronSize='w-6 h-6 text-slate-600'
                          menuItems={[
                            {
                              label: "Update",
                              icon: <Edit className="w-4 h-4 mr-2" />,
                              onClick: () => {},
                              className: "text-slate-700 hover:bg-slate-50 px-4 py-2"
                            },
                            {
                              label: "Delete Division",
                              icon: <Trash className="w-4 h-4 mr-2 text-red-500" />,
                              onClick: () => {},
                              className: "text-red-600 hover:bg-red-50 px-4 py-2"
                            }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}









        {activePage === "schedules" && (
          <main className="flex-1 p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
                  Manage <span className="text-indigo-600 ml-2">Schedules</span>
                </h1>
                
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
                  <button 
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 
                      hover:shadow-lg transition-all duration-200 font-semibold text-sm"
                    onClick={() => setShowScheduleCreate(true)}
                  >
                    <Plus className="w-5 h-5 text-white" />
                    Create Schedule
                  </button>

                  <div className="w-full md:max-w-xs relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={searchSchedule}
                      onChange={(e) => setSearchSchedule(e.target.value)}
                      placeholder="Search Schedules..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 
                        focus:border-indigo-500 transition-all shadow-sm text-sm"
                    />
                  </div>
                </div>
              </div>

              {showScheduleCreate && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative p-8">
                    <button 
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                      onClick={() => setShowScheduleCreate(false)}
                    >
                      <X className="h-6 w-6 text-slate-600" />
                    </button>
                    
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                      Create Schedule
                    </h2>

                    
                    <form className="">
                      <div className={`grid grid-cols-1 md:grid-cols-2 ${isActivity? 'gap-2': 'space-y-6 gap-6'}`}>
                        {/* Toggle Switch */}
                        <div className="flex items-center justify-between col-span-full">
                          <span className="text-gray-700 font-medium">Create Activity</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={isActivity}
                              onChange={() => setIsActivity(!isActivity)} 
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-300
                              peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                              after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all">
                            </div>
                          </label>
                        </div>

                        {/* Date and Time Inputs */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                          <input 
                            type="date"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                          <input 
                            type="time"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">End Time</label>
                          <input 
                            type="time"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                          />
                        </div>

                        {/* Dynamic Fields Based on Activity Toggle */}
                        {!isActivity ? (
                          <>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Place</label>
                              <input 
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                                placeholder="Enter venue name"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                              <input 
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                                placeholder="Enter role"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Division</label>
                              <DropDown
                                component={<span className="text-sm">Select Division</span>}
                                menuItems={divisions.map(division => ({
                                  label: division.name,
                                  onClick: () => handleDivisionSelect(division.id),
                                }))}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="space-y-1 col-span-full">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Activity Title</label>
                              <input 
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                                placeholder="Enter activity title"
                              />
                            </div>
                            <div className="space-y-1 col-span-full">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                              <textarea
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                                placeholder="Enter activity description"
                                rows="3"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Upload Poster</label>
                              <input 
                                type="file"
                                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors text-sm"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="border-t border-slate-200 pt-6">
                        <button 
                          type="submit"
                          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold float-right"
                        >
                          {isActivity ? 'Create Activity' : 'Create Schedule'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              
              <SectionWithPagination
                title="Pending Activities"
                items={filtereActivities}
                page={currentPageActivities}
                setPage={setCurrentPageActivities}
                itemsPerPage={6}
                renderItem={(activity) => (
                  <ScheduleCard 
                    item={activity}
                    type="activity"
                    onEdit={handleEditActivity}
                    onDelete={handleDeleteActivity}
                  />
                )}
              />

              <SectionWithPagination
                title="Pending Schedules"
                items={filtereVenues}
                page={currentPageVenues}
                setPage={setCurrentPageVenues}
                itemsPerPage={3}
                renderItem={(venue) => (
                  <ScheduleCard
                    item={venue}
                    type="venue"
                    onEdit={handleEditVenue}
                    onDelete={handleDeleteVenue}
                  />
                )}
              />

              
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Attendance Approval ({pendingReq.length})
                </h2>
                
                {pendingReq.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pendingReq.slice((currentPageRegisters-1)*registersPerPage, ((currentPageRegisters-1)*registersPerPage)+registersPerPage).map((req, index) => (
                        <AttendanceCard 
                          key={index}
                          request={req}
                          onApprove={handleApproveAttendance}
                          onReject={handleRejectAttendance}
                        />
                      ))}
                    </div>
                    <PaginationControls
                      currentPage={currentPageRegisters}
                      totalPages={Math.ceil(pendingReq.length / registersPerPage)}
                      onPrev={() => setCurrentPageRegisters(p => Math.max(1, p - 1))}
                      onNext={() => setCurrentPageRegisters(p => Math.min(Math.ceil(pendingReq.length / registersPerPage), p + 1))}
                      className="mt-8"
                    />
                  </>
                ) : (
                  <div className="bg-white rounded-lg p-6 text-center text-slate-500">
                    No attendance records requiring approval
                  </div>
                )}
              </div>
            </div>
          </main>
        )}









      </div>
    </div>
  );
}