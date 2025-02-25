import { AppContext } from '../AppProvider';
import { addDateDesc, capitalize, combineByDateDesc, getAllDiv, getDateDetails, getDateRange, getStat, getUser, timeDiff } from "../assets";
import React, { useState, useContext , useCallback, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SectionDivider from './SectionDivider';

export default function StatisticalDetails() {
  const{ userId, loggedIn } = useContext(AppContext)
  if(loggedIn) {
    const user = getUser(userId);
    const allDiv = getAllDiv(user);
    const [currentDiv, setCurrentDiv] = useState(allDiv.length>0? user.divisions[0].id:null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [stats, setStats] = useState({});
    const [attendanceStat, setAttendanceStat] = useState({});
    const [cardData, setCardData] = useState([]);

    const updateStats = useCallback(() => {
      const newStats = getStat(user, currentDiv, startDate, endDate);
      setStats(newStats);

      const newAttendanceStat = combineByDateDesc(addDateDesc(newStats.attendance || []));
      setAttendanceStat(newAttendanceStat);

      const newCardData = [
        { metric: 'Total Practice Hours', value: `${newStats.attendedHours || 0}h`, change: '+1%' },
        { metric: 'Attendance Rate', value: `${newStats.attendancePercentage || 0}%`, change: '+4%' },
        { metric: 'Songs Mastered', value: '8', change: '2 new' },
        { metric: 'Avg. Session Duration', value: '2h', change: '+0.3h' },
      ];
      setCardData(newCardData);
    }, [user, currentDiv, startDate, endDate]);

    useEffect(() => {
      updateStats();
    }, [updateStats]);


    
    // Sample data
    const vocalRangeData = [
      { month: 'Jan', soprano: 12, alto: 8, tenor: 6, bass: 4 },
      { month: 'Feb', soprano: 14, alto: 9, tenor: 7, bass: 5 },
      { month: 'Mar', soprano: 16, alto: 10, tenor: 8, bass: 6 },
    ];

    const activityData = [
      { activity: 'Vocal Practice', hours: 15 },
      { activity: 'Section Rehearsal', hours: 10 },
      { activity: 'Full Choir Practice', hours: 20 },
      { activity: 'Performance Prep', hours: 12 },
    ];

    const absentPieColors = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#F472B6', '#60A5FA', '#FBBF24', '#34D399', '#F87171', 
      '#FBBF24', '#93C5FD']

    const AbsentCustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-amber-100 p-4 rounded-sm shadow-2xl shadow-emerald-300 border border-gray-200">
            <p className="font-semibold font-inter-tight">{payload[0].payload.name}</p>
            <p className="text-sm">Absences: {payload[0].value}</p>
          </div>
        );
      }
      return null;
    };

    const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
      <button
        className="w-full px-6 py-2 text-left border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 
          focus:ring-emerald-500 shadow-md hover:shadow-2xl hover:shadow-emerald-400 hover:border-emerald-300"
        onClick={onClick}
        ref={ref}
      >
        {value ? (
          <span className="text-gray-700 font-poppins">
            {getDateDetails(value).date}
          </span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </button>
    ));

    const getBgColor = (percentage) => {
      if (percentage >= 80) return `bg-green-500/30`;
      if (percentage >= 60) return `bg-yellow-500/30`;
      return `bg-red-500/${100-percentage}`;
    };

    return (
      <div className="min-h-screen bg-gray-50 p-8 font-inter-tight">
        <div className="my-30 " id="statistics">
            <SectionDivider value="Statistical Overview" />
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="w-1/2 text-3xl text-[30px] font-bold font-poppins text-gray-900 truncate whitespace-nowrap 
                overflow-hidden text-ellipsis">
              {capitalize(user.details.firstname)}'s Analytics
            </h1>
            <div className='relative'>
              <select 
                className={`block appearance-none w-full bg-white border border-gray-300 text-gray-700 
                            py-2 px-6 pr-8 rounded-md leading-tight focus:outline-none focus:border-emerald-500
                            shadow-md hover:shadow-2xl hover:shadow-emerald-400 hover:border-emerald-300
                            font-poppins `}
                onChange={(e) => setCurrentDiv(Number(e.target.value))}>
                {
                  allDiv.map((item) => (
                    <option key={item.id} value={item.id}>
                      {capitalize(item.name)}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="flex gap-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<CustomInput />}
                placeholderText='Select Start Date'
                
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                customInput={<CustomInput />}
                placeholderText='Select End Date'
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cardData.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-500 text-sm mb-2">{stat.metric}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-sm text-emerald-600">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            
            {/* Attendance Trend */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold font-poppins mb-4">
                Attendance Trend <span className='font-normal font-lora text-[18px] text-gray'> ({getDateRange(attendanceStat)})</span>
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceStat}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateDesc" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Attendance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold font-poppins mb-4 flex flex-row items-center">
                Absence Trend <span className='font-normal font-lora text-[18px] text-gray'> ({getDateRange(stats.absentByDate)})</span>
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.absentByDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateDesc" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      name="Absent times"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Vocal Range Progress */}
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

            {/* Activity Distribution */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold font-poppins mb-4">Activity Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="hours"
                    >
                      {activityData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold font-poppins mb-4">Absence Reasons</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.absentByName}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {absentPieColors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry} />
                      ))}
                    </Pie>
                    <Tooltip content={<AbsentCustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          { stats.attendance && stats.attendance.length>0 &&
              <div className="w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                        Sessions
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stats.attendance.slice(-5).map((row, index) => (
                      <tr 
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                          {getDateDetails(row.date).date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600">
                          {row.attendance} out of {row.sessions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`inline-block ${getBgColor(Math.round(row.attendance/row.sessions*100))}  px-3 py-1 rounded-full text-sm font-medium`}>
                            {Math.round(row.attendance/row.sessions*100)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            }
          </div>


          
          {stats.attendance && stats.attendance.length>0 && <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold font-poppins mb-4">Detailed Practice History</h2>
              <table className="w-full">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm text-gray-700 ">Date</th>
                    <th className="font-bold font-poppins px-6 py-3 text-right text-sm text-gray-700">Duration</th>
                    <th className="font-bold font-poppins px-6 py-3 text-right text-sm text-gray-700">Type</th>
                    <th className="font-bold font-poppins px-6 py-3 text-right text-sm text-gray-700">Songs Practiced</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.attendance.map((att, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">{getDateDetails(att.date).date2}</td>
                      <td className="px-6 py-4 text-right">{timeDiff(att.startTime, att.endTime)}</td>
                      <td className="px-6 py-4 text-right">{capitalize(att.role)}</td>
                      <td className="px-6 py-4 text-right">{i + 2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}
        </div>
      </div>
    );
  } return <></>
};










































// import React, { useState } from 'react';
// import { Calendar, User, Clock, Music, Award, BookOpen, Users, Mic2, Mic } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// export default function StatisticalDetails() {
//   const attendanceData = [
//     { month: 'Jan', sessions: 12, attendance: 10, percentage: 83, duration: 24, newSongs: 3, performances: 1 },
//     { month: 'Feb', sessions: 12, attendance: 11, percentage: 92, duration: 26, newSongs: 2, performances: 0 },
//     { month: 'Mar', sessions: 12, attendance: 9, percentage: 75, duration: 22, newSongs: 4, performances: 1 },
//     { month: 'Apr', sessions: 12, attendance: 12, percentage: 100, duration: 28, newSongs: 3, performances: 2 },
//     { month: 'May', sessions: 12, attendance: 10, percentage: 83, duration: 25, newSongs: 2, performances: 1 },
//     { month: 'Jun', sessions: 12, attendance: 8, percentage: 67, duration: 20, newSongs: 3, performances: 1 },
//   ];

//   const timeSlotData = [
//     { name: 'Morning (9-12)', count: 25 },
//     { name: 'Afternoon (2-5)', count: 35 },
//     { name: 'Evening (6-9)', count: 12 },
//   ];

//   const reasonsData = [
//     { name: 'Work/Study', value: 45 },
//     { name: 'Health', value: 20 },
//     { name: 'Family', value: 15 },
//     { name: 'Travel', value: 10 },
//     { name: 'Other', value: 10 },
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

//   const getStatusColor = (percentage) => {
//     if (percentage >= 90) return 'text-green-500';
//     if (percentage >= 75) return 'text-yellow-500';
//     return 'text-red-500';
//   };

//   const item = (title, desc, ico, autoCol=false, value=0, borderColor="border-blue-500") => {
//     return(
//       <div 
//         className={`w-100 h-20 flex items-center gap-7 p-4 bg-gray-200 rounded-lg hover:border-b-4 hover:border-l-1
//           ${borderColor} hover:bg-gray-300 cursor-pointer`}
//       >
//         {ico()}
//         <div>
//           <p className="text-2xl text-gray-600 font-bold font-montserrat">{title}</p>
//           <p className={`text-xl font-bold ${autoCol?getStatusColor(value):""} font-montserrat-alt`}>{desc}</p>
//         </div>
//       </div>
//     );
//   }

//   return(
//     <header className='flex flex-wrap'>
//         <div className='flex flex-col gap-4'>
//             { item("Attendance Rate", "82%", ()=>(<Users className="h-10 w-10 text-blue-500" />), true, 82) }
//             { item("Songs Learned", "17", ()=>(<BookOpen className="h-10 w-10 text-green-500" />)) }
//             { item("Performances", "6", ()=>(<Mic className="h-10 w-10 text-purple-500" />)) }
//             { item("Total Hours", 145, ()=>(<Clock className="h-10 w-10 text-orange-500" />)) }
//         </div>
//         <div className='h-100 w-140'>
//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={attendanceData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis yAxisId="left" domain={[0, 100]} />
//                 <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
//                 <Tooltip />
//                 <Line 
//                     yAxisId="left"
//                     type="monotone" 
//                     dataKey="percentage" 
//                     stroke="#2563eb" 
//                     strokeWidth={2}
//                     name="Attendance %"
//                 />
//                 <Line 
//                     yAxisId="right"
//                     type="monotone" 
//                     dataKey="newSongs" 
//                     stroke="#16a34a" 
//                     strokeWidth={2}
//                     name="New Songs"
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>

//         <div className="h-64 w-90">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={timeSlotData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#2563eb" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>


//         <div className="h-100 w-100">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={reasonsData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={150}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {reasonsData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left py-2">Month</th>
//                 <th className="text-left py-2">Attendance</th>
//                 <th className="text-left py-2">Hours</th>
//                 <th className="text-left py-2">New Songs</th>
//                 <th className="text-left py-2">Performances</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceData.map((month) => (
//                 <tr key={month.month} className="border-b">
//                   <td className="py-2">{month.month}</td>
//                   <td className={`py-2 ${getStatusColor(month.percentage)}`}>
//                     {month.percentage}%
//                   </td>
//                   <td className="py-2">{month.duration}</td>
//                   <td className="py-2">{month.newSongs}</td>
//                   <td className="py-2">{month.performances}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//     </header>

//   );
