import {
  Activity,
  Ban,
  Bell,
  Calendar,
  CalendarCheck,
  ChevronDown,
  Edit,
  Home,
  Image,
  Lamp,
  LayoutDashboard,
  LogOut,
  Menu,
  Mic,
  Plus,
  Power,
  Search,
  Settings,
  Trash,
  User,
  UserRoundX,
  Users,
  X
} from "lucide-react";
import { cloneElement, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { addS, capitalize, countUsersInDiv } from "../assets";
import { useActivity, useAttendance, useDivision, useFeedback, useSchedule, useUser } from "../state/hooks/ContextUser";
import { AttendanceCard, ScheduleCard, UserCard } from "./AdminCards";
import DropDown from "./DropDown";
import { PaginationControls, SectionWithPagination } from "./Pagination";


export default function AdminSite() {
  const { getActivities, updateActivity, createActivity, deleteActivity } = useActivity();
  const { getAllDivVenues, getDivisions, getDivisionsDetails, createDivision, updateDivision, deleteDivision } = useDivision();
  const { getAllPendingSchedules, updateVenue, createScheduleVenue, deleteVenue, handleScheduleResponse } = useSchedule();
  const { getTopAttendee, getUsers, changeUserPermissions, user } = useUser();
  const { getMonthlyAttendance } = useAttendance();
  const { createFeedback } = useFeedback();

  const loggedIn = !!user;

  const [users, setUsers] = useState([]);
  const [userChanged, setUserChanged] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackDetails, setFeedbackDetails] = useState({
    sender: null,
    user: null,
    title: '',
    highlighted_title: '',
    desc: ''
  });
  
  const [activities, setActivities] = useState([]);
  const [activityFormData, setActivityFormData] = useState(
    {title: '', desc:'', showPoster:true, poster:null, division_id:'', venue: {date:'', startTime:'', endTime:'', place:'', role:'', img:null}}
  );
  const [activityChanged, setActivityChanged] = useState(false);
  const [scheduleChanged, setScheduleChanged] = useState(false);
  const [divisionChanged, setDivisionChanged] = useState(false);
  const [activityIsEditing, setActivityIsEditing] = useState(false);
  const [venues, setVenues] = useState([]);
  const [scheduleIsEditing, setScheduleIsEditing] = useState(false);
  const [divisionIsEditing, setDivisionIsEditing] = useState(false);
  const [divisionFormData, setDivisionFormData] = useState(
    { name:'', role:'', userRole:'', isRegistered: true, is_active:true, value:null, showRatings:true, shortWords:'', showVenue:'',
      title: '', titleDesc:'', titleQuote:'', showUser:true, baseUser:'Member', baseUserModifier:'Available'}
  );

  const [ pendingRequests, setPendingRequests] = useState([]);

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
  
  const [pendingRequestsChanged, setPendingRequestsChanged] = useState(false);
  
  const [topAttendance, setTopAttendance] = useState([]);
  const [topAbsentReason, setTopAbsentReason] = useState({reason: '', value: 0});
  const [attendanceOverview, setAttendanceOverview] = useState({
    total_attendance: 0,
    total_sessions: 0,
    top_user: null
  });
  const [divOverview, setDivOverview] = useState([]);
  const [avgAttendance, setAvgAttendance] = useState([]);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getActivities(searchSchedule);
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, [searchSchedule, activityChanged]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getAllDivVenues(searchSchedule);
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching All Div Schedules:', error);
      }
    };
    loggedIn && fetchSchedules();
  }, [searchSchedule, scheduleChanged]);
  
  useEffect(() => {
    const fetchAllPendingSchedules = async () => {
      try {
        const params = {param: {search: searchSchedule }}
        const response = await getAllPendingSchedules(params);
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Error fetching All Div Schedules:', error);
      }
    };
    loggedIn && fetchAllPendingSchedules();
  }, [searchSchedule, pendingRequestsChanged]);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await getDivisions(searchDivsion);
        setDivisions(response.data);
      } catch (error) {
        console.error('Error fetching divisions:', error);
      }
    };
    loggedIn && fetchDivisions();
  }, [searchDivsion, divisionChanged]);
  
  const handleActivitySubmit = async (e) => {
    if(!loggedIn) return;
    e.preventDefault();
    const formData = new FormData();
    ['title', 'desc', 'showPoster', 'poster', 'division_id'].forEach(key => {
      if((key==='poster' && activityFormData[key] instanceof File) || key!=='poster') {
        formData.append(key, activityFormData[key]);
      }
    });
    const venueFields = ['date', 'startTime', 'endTime', 'place', 'role'];
    venueFields.forEach(field => {
      formData.append(`venue[${field}]`, activityFormData.venue[field] || '');
    });
    if (activityFormData.venue.img instanceof File) {
      formData.append('venue[img]', activityFormData.venue.img);
    }
    try {
      if(isActivity) {
        activityIsEditing ? await updateActivity(activityFormData.id, formData) : await createActivity(formData);
        setActivityChanged(!activityChanged);
      } else {
        scheduleIsEditing
        ? await updateVenue(activityFormData.venue.id, activityFormData.venue)
        : await createScheduleVenue(activityFormData.division_id, activityFormData.venue);
        setScheduleChanged(prev=>!prev);
      }
      setActivityFormData(
        {title:'', desc:'', showPoster:true, poster:null, division_id:'', venue: {date:'', startTime:'', endTime:'', place:'', role:'', img:null}}
      )
      setShowScheduleCreate(false);
    } catch (error) {
      console.error('Error:', error.response?.data);
    }
  };
  
  useEffect(()=>{
    const fetchDivisions = async() => {  
      
      try{
        const max_users = 5;
        const response = await getTopAttendee({max_users});
        setTopAttendance(response.data.top)
        setAvgAttendance(response.data.sessions>0?((response.data.attendance/response.data.sessions)*100).toFixed(1):0);
        setActiveUsersCount(response.data.active_users)
        setAttendanceOverview({
          total_attendance:response.data.attendance,
          total_sessions: response.data.sessions,
          top_user: response.data.top[0] 
        })
      } catch(error) {
        console.error(error?.response?.data);
      }
      try{
        const totalMonths = 3;
        const response = await getMonthlyAttendance({totalMonths});
        setDivOverview(response.data)
      } catch(error) {
        console.error(error?.response?.data);
      }
      try{
        const divId = 'all';
        const startDate = '2025-03-01';
        const endDate = '2025-03-14';
        const response = await getDivisionsDetails({startDate, endDate, divId});
        // getTopAbsenceReason(users, {start: '2025-03-01', end: '2025-03-14'})
        // setTopAbsentReason({
        //   reason: response.data.stats.top_absence_reason || "No absentee", 
        //   value: (response.data.stats.totalSessions-response.data.stats.attendedSessions) || 0
        // });
        setTopAbsentReason(
          response.data.stats.top_absence_reason || {reason: "No absentee", value: 0}
        );
        console.log(response.data);
      } catch(error) {
        console.error(error?.response?.data);
      }
    }
    loggedIn && fetchDivisions();
  }, [user])

  useEffect(()=>{
    const fetchUsers = async() => {
      try{
        const response = await getUsers({ param: { search: searchUser} });
        setUsers(response.data);
        console.log(response.data);
      } catch(error) {
        console.error(error?.response?.data);
      }
    }
    loggedIn && fetchUsers();
  }, [userChanged]);
  
  const filtereDivisions = divisions.filter(division =>
    division.name.toLowerCase().includes(searchDivsion.toLowerCase())
  );
  
  const handleDivisionCreate = async(e) => {
    if(!loggedIn) return;
    e.preventDefault();
    try{
      divisionIsEditing? await updateDivision(divisionFormData.id, divisionFormData) : await createDivision(divisionFormData);
      setDivisionChanged(prev=>!prev);
      setShowDivCreateForm(false);
      setDivisionFormData(
        { name:'', role:'', userRole:'', isRegistered: true, is_active:true, value:null, showRatings:true, shortWords:'', showVenue:'',
          title: '', titleDesc:'', titleQuote:'', showUser:true, baseUser:'Member', baseUserModifier:'Available'}
      );
    } catch(error) {
      console.error(error.response?.data)
    }
  }
  
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleEditDivision = (division) => {
    setDivisionFormData(division);
    setDivisionIsEditing(true);
    setShowDivCreateForm(true);
  }
  
  const handleDeleteDivision = async(division_id) =>{
    if(!loggedIn) return;
    try {
      await deleteDivision(division_id);
      setDivisionChanged(prev=>!prev);
    } catch (error) {
      console.error('Error Deleting activities:', error);
    }
  }

  const handleActivateDivision = async(division) => {
    if(!loggedIn) return;
    try{
      await updateDivision(division.id, {is_active: !division.is_active});
      setDivisionChanged(prev=>!prev);
    } catch(error) {
      console.error(error?.response?.data);
      
    }
  }
  
  const handleEditActivity = (activity) =>{
    setActivityIsEditing(true);
    setIsActivity(true);
    setActivityFormData(activity);
    setShowScheduleCreate(true);
  }
  const handleDeleteActivity = async(activity_id) =>{
    if(!loggedIn) return;
    try {
      await deleteActivity(activity_id);
      setActivityChanged(!activityChanged);
    } catch (error) {
      console.error('Error Deleting activities:', error);
      }
      
    }
    const handleEditVenue = (venue) =>{
      setActivityFormData({...activityFormData, venue: venue});
      setScheduleIsEditing(true);
    setIsActivity(false);
    setShowScheduleCreate(true);
  }
  const handleDeleteVenue = async(venue) =>{
    if(!loggedIn) return;
    try {
      await deleteVenue(venue.id);
      setScheduleChanged(prev=>!prev);
    } catch(error) {
      console.error(error?.response?.data);
    }
  }

  const handleAttendanceResponse = async(pending_req, accepted) =>{
    if(!loggedIn) return;
    try {
      const myForm = {
        id: pending_req.venue, 
        username: pending_req.user_detail.username,
        req_admin_accept: accepted,
        is_user_state: false,
      }
      const response = await handleScheduleResponse(pending_req.division, myForm);
      setPendingRequestsChanged(prev=>!prev);
    } catch(error) {
      console.error(error?.response?.data)
    }
  }
  
  const handleUserDetails = (userId) => {
    console.log(userId);
  }
  const changePermissions = async(userId, formData) => {
    if(!loggedIn) return;
    try{
      const response = await changeUserPermissions(userId, formData)
      setUserChanged(prev=>!prev);
    } catch(error) {
      console.error(error?.response?.data);
    }
  }
  const handleDeleteUser = (userId) => {
    console.log(userId);
  }

  const handleFeedback = async() => {
    if(!loggedIn) return;
    try{
      const response = await createFeedback(feedbackDetails);
      console.log(response.data);
    } catch(error){
      console.error(error?.response?.data);
    }
  }

  // Updated menu items to match the image
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, id: "dashboard" },
    { name: "Users", icon: <Users className="w-5 h-5" />, id: "users" },
    { name: "Divisions", icon: <Mic className="w-5 h-5" />, id: "divisions" },
    { name: "Schedules", icon: <Edit className="w-5 h-5" />, id: "schedules" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, id: "settings" },
  ];

  // Updated stats with colors and icons from the image
  const stats = [
    { title: "Total Users", value: activeUsersCount, change: "+1.7k%", icon: <Users className="w-6 h-6 text-white" />, bg: "bg-gradient-to-r from-pink-500 to-red-400" },
    { title: "Total Divisions", value: divisions.length, change: "+1 new", icon: <Mic className="w-6 h-6 text-white" />, bg: "bg-gradient-to-r from-green-300 to-emerald-500" },
    { title: "Average Attendance", value: `${avgAttendance}%`, change: "+0.3% today", icon: <Calendar className="w-6 h-6 text-white" />, bg: "bg-gradient-to-r from-[#2196F3] to-sky-700" },
    { title: "Top Absence Reason", value: topAbsentReason.reason, change: `${topAbsentReason.value} time${topAbsentReason.value===1?'':'s'}`, 
      icon: <UserRoundX className="w-6 h-6 text-white" />, bg: "bg-gradient-to-r from-purple-400 to-[#9C27B0]" },
  ];


  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  
  if (!loggedIn) return <></>;
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
            <a href="/">
              <Home className="w-5 h-5 text-slate-500 hover:shadow-2xl hover:text-black" />
            </a>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <DropDown
              trigger={
                <div className="flex items-center gap-2 cursor-pointer group">
                  <img
                    src={user.profile_picture}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-emerald-100 group-hover:border-emerald-200 transition-colors"
                  />
                  <div className="hidden lg:block">
                    <p className="text-slate-700 text-sm font-medium">
                      {user.fname} {user.lname}
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
                      <BarChart data={divOverview}>
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
                        {divOverview.length > 0 &&
                          Object.keys(divOverview[0])
                            .filter(key => key !== 'month')
                            .map((key, index) => (
                              <Bar 
                                key={key}
                                dataKey={key}
                                fill={COLORS[index % COLORS.length]}
                                radius={[4, 4, 0, 0]}
                                minPointSize={3}
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
                        data={topAttendance}
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
                          dataKey="total_attendance"
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
                      <p className="text-sm opacity-90">{pendingRequests.length} pending review{pendingRequests.length===1?'':'s'}</p>
                      <button 
                        className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                        onClick={()=>setActivePage('schedules')}>
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
                      <h3 className="font-semibold text-slate-800">Attendance Analysis</h3>
                      <p className="text-sm text-slate-500">Quick Attendance Statistics</p>
                    </div>
                    <div className="text-emerald-600 bg-emerald-100 p-2 rounded-lg">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">Total Attendance</span>
                        <span className="text-slate-600">
                          {attendanceOverview.total_sessions>0?(attendanceOverview.total_attendance/attendanceOverview.total_sessions)*100:0}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${attendanceOverview.total_sessions>0?(attendanceOverview.total_attendance/attendanceOverview.total_sessions)*100:0}%` }}
                        />
                      </div>
                    </div>
                    {attendanceOverview.top_user && <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">{attendanceOverview.top_user.name}'s Contribution</span>
                        <span className="text-slate-600">
                          {attendanceOverview.total_sessions>0?(attendanceOverview.top_user.total_attendance/attendanceOverview.total_attendance)*100:0}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${attendanceOverview.total_sessions>0?(attendanceOverview.top_user.total_attendance/attendanceOverview.total_attendance)*100:0}%` }}
                        />
                      </div>
                    </div>}
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
                items={users.filter(u => searchUser !== '' || u.id !== user.id)}
                page={currentPageUsers}
                setPage={setCurrentPageUsers}
                itemsPerPage={9}
                renderItem={(renderedUser) => (
                  <UserCard 
                    user={renderedUser}
                    currentUserId={user.id}
                    onDetails={() => handleUserDetails(renderedUser.id)}
                    onMakeAdmin={() => changePermissions(renderedUser.id, {request_id: user.id, admin: !renderedUser.is_admin })}
                    onDeactivate={() => changePermissions(renderedUser.id, {request_id: user.id, activate: !renderedUser.is_active })}
                    onDelete={() => handleDeleteUser(renderedUser.id)}
                    onFeedback={()=> {
                      setShowFeedbackForm(true);
                      setFeedbackDetails({...feedbackDetails, sender: user.id, user: renderedUser.id})
                    }}
                  />
                )}
                emptyMessage="No users found matching your search criteria"
              />
            </div>
            {
              showFeedbackForm && 
              <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative p-8">
                    <button 
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                      onClick={() => setShowFeedbackForm(false)}
                    >
                      <X className="h-6 w-6 text-slate-600" />
                    </button>
                    
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                      Send Feedback
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                        <input 
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="You're awesome"
                          value={feedbackDetails.title}
                          onChange={(e)=>{setFeedbackDetails({...feedbackDetails, title: e.target.value})}}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Highlighted Part</label>
                        <input 
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Singer"
                          value={feedbackDetails.highlighted}
                          onChange={(e)=>{setFeedbackDetails({...feedbackDetails, highlighted_title: e.target.value})}}
                        />
                      </div>
                    </div>
                  <div className="space-y-1 col-span-full">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                      placeholder="This past month, you have...."
                      rows="3"
                      value={feedbackDetails.desc}
                      onChange={(e)=>{setFeedbackDetails({...feedbackDetails, desc: e.target.value})}}
                    />
                  </div>
                  <div className="w-full flex flex-row-reverse">
                    <button 
                      className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors self-end"
                      onClick={()=>{
                        setShowFeedbackForm(false);
                        handleFeedback();
                      }}
                      >
                      Create Feedback
                    </button>
                  </div>
                </div>
              </div>
            }
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
                    onClick={() => {
                      setShowDivCreateForm(true);
                      setDivisionIsEditing(false);
                    }}
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
                            placeholder="Keyboard"
                            value={divisionFormData.name}
                            onChange={(e)=>{setDivisionFormData({...divisionFormData, name: e.target.value})}}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Primary Role</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Training"
                            value={divisionFormData.role}
                            onChange={(e)=>{setDivisionFormData({...divisionFormData, role: e.target.value})}}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Inspiring Words</label>
                        <input 
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Talent for Jesus"
                          value={divisionFormData.shortWords}
                          onChange={(e)=>{setDivisionFormData({...divisionFormData, shortWords: e.target.value})}}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Mission Title</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Mission"
                            value={divisionFormData.title}
                            onChange={(e)=>{setDivisionFormData({...divisionFormData, title: e.target.value})}}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Expand market reach"
                            value={divisionFormData.titleDesc}
                            onChange={(e)=>{setDivisionFormData({...divisionFormData, titleDesc: e.target.value})}}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Inspirational Quote</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Innovate or stagnate"
                            value={divisionFormData.titleQuote}
                            onChange={(e)=>{setDivisionFormData({...divisionFormData, titleQuote: e.target.value})}}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-slate-200">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Upload Logo</label>
                          <input 
                            type="file"
                            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                            onChange={(e)=>{setDivisionFormData({...divisionFormData, value: e.target.files[0]})}}
                          />
                        </div>
                        <button 
                          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors self-end"
                          onClick={handleDivisionCreate}
                          >
                          {divisionIsEditing?'Update':'Create'} Division
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
                      <div className={`aspect-square ${division.is_active?'bg-slate-50': 'bg-slate-300'} rounded-lg flex items-center justify-center`}>
                        {division.value ? (
                          <img 
                            src={division.value}
                            alt={division.name}
                            className={`w-full h-full object-contain p-4 ${division.is_active?'': 'filter grayscale'}`}
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
                              onClick: () => {handleEditDivision(division)},
                              className: "text-slate-700 hover:bg-slate-50 px-4 py-2"
                            },
                            {
                              label: `${division.is_active?'De':''}activate ${capitalize(division.name)} Division`,
                              icon: division.is_active? <Ban className="w-4 h-4 mr-2 mt-2 text-red-500" />
                                : <Power className="w-4 h-4 mr-2 mt-2 text-emerald-400" />,
                              onClick: () => {handleActivateDivision(division)},
                              className: "text-red-600 hover:bg-red-50 px-4 py-2"
                            },
                            {
                              label: "Delete Division",
                              icon: <Trash className="w-4 h-4 mr-2 text-red-500" />,
                              onClick: () => {handleDeleteDivision(division.id)},
                              className: "text-red-600 hover:bg-red-50 px-4 py-2"
                            },
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
                    onClick={() => {
                      setShowScheduleCreate(true);
                      setActivityIsEditing(false);
                      setScheduleIsEditing(false);
                    }}
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
                          <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                          <input 
                            type="date"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                            value={activityFormData.venue.date}
                            onChange={(e)=>{setActivityFormData({...activityFormData, venue: { ...activityFormData.venue, date: e.target.value }})}}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Start Time *</label>
                          <input 
                            type="time"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                            value={activityFormData.venue.startTime}
                            onChange={(e)=>{setActivityFormData({...activityFormData, venue:{...activityFormData.venue, startTime: e.target.value}})}}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">End Time {isActivity?'': '*'} </label>
                          <input 
                            type="time"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                            value={activityFormData.venue.endTime}
                            onChange={(e)=>{setActivityFormData({...activityFormData, venue:{...activityFormData.venue, endTime: e.target.value}})}}
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
                                value={activityFormData.venue.place}
                                onChange={(e)=>{setActivityFormData({...activityFormData, venue:{...activityFormData.venue, place: e.target.value}})}}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                              <input 
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                                placeholder="Enter role"
                                value={activityFormData.venue.role}
                                onChange={(e)=>{setActivityFormData({...activityFormData, venue:{...activityFormData.venue, role: e.target.value}})}}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Division</label>
                              <DropDown
                                component={<span className="text-sm">Select Division</span>}
                                onTop={true}
                                menuItems={divisions.map(division => ({
                                  label: division.name,
                                  onClick: () =>setActivityFormData({...activityFormData, division_id: division.id}),
                                }))}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="space-y-1 col-span-full">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Activity Title *</label>
                              <input 
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                                placeholder="Enter activity title"
                                value={activityFormData.title}
                                onChange={(e)=>{setActivityFormData({...activityFormData, title: e.target.value})}}
                              />
                            </div>
                            <div className="space-y-1 col-span-full">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                              <textarea
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                                placeholder="Enter activity description"
                                rows="3"
                                value={activityFormData.desc}
                                onChange={(e)=>{setActivityFormData({...activityFormData, desc: e.target.value})}}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-slate-700 mb-1">Upload Poster</label>
                              <input 
                                type="file"
                                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors text-sm"
                                onChange={(e) => {
                                  setActivityFormData(prev => ({...prev, poster: e.target.files[0]
                                  }))
                                }}
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
                          onClick={handleActivitySubmit}
                        >
                          {activityIsEditing||scheduleIsEditing?'Update':'Create'} {isActivity ? ' Activity' : ' Schedule'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              
              <SectionWithPagination
                title="Pending Activities"
                items={activities}
                page={currentPageActivities}
                setPage={setCurrentPageActivities}
                itemsPerPage={3}
                renderItem={(activity) => (
                  <ScheduleCard 
                    item={activity}
                    type="activity"
                    onEdit={()=>handleEditActivity(activity)}
                    onDelete={()=>handleDeleteActivity(activity.id)}
                  />
                )}
              />

              <SectionWithPagination
                title="Pending Schedules"
                items={venues}
                page={currentPageVenues}
                setPage={setCurrentPageVenues}
                itemsPerPage={3}
                renderItem={(venue) => (
                  <ScheduleCard
                    item={venue}
                    type="venue"
                    onEdit={()=>handleEditVenue(venue)}
                    onDelete={()=>handleDeleteVenue(venue)}
                  />
                )}
              />

              
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Attendance Approval ({pendingRequests.length})
                </h2>
                
                {pendingRequests.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pendingRequests.slice((currentPageRegisters-1)*registersPerPage, ((currentPageRegisters-1)*registersPerPage)+registersPerPage).map((req, index) => (
                        <AttendanceCard 
                          key={index}
                          request={req}
                          onApprove={()=>handleAttendanceResponse(req, true)}
                          onReject={()=>handleAttendanceResponse(req, false)}
                        />
                      ))}
                    </div>
                    <PaginationControls
                      currentPage={currentPageRegisters}
                      totalPages={Math.ceil(pendingRequests.length / registersPerPage)}
                      onPrev={() => setCurrentPageRegisters(p => Math.max(1, p - 1))}
                      onNext={() => setCurrentPageRegisters(p => Math.min(Math.ceil(pendingRequests.length / registersPerPage), p + 1))}
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