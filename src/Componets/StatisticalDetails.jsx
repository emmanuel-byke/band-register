import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { absentCal, addDateDesc, capitalize, combineByDateDesc, getDateDetails, getDateRange, timeDiff } from "../assets";
import { useDivision, useUser } from '../state/hooks/ContextUser';
import SectionDivider from './SectionDivider';

export default function StatisticalDetails() {
  const { getDivisionsByUser } = useDivision();
  const { user, userUpdator } = useUser();
  const loggedIn = !!user;

  const [allDivisions, setAllDivisions] = useState([]);
  const [currentDiv, setCurrentDiv] = useState(allDivisions?.length>0&&user?.divisions?user.divisions[0].id:null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [stats, setStats] = useState([]);
  const [attendanceStat, setAttendanceStat] = useState([]);
  const [absentStat, setAbsentStat] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  useEffect(()=>{
    const fetchDivisions = async() => {  
      try{
        const divId = currentDiv===null||capitalize(currentDiv)==='All'? 'all' : Number(currentDiv)
        const response = await getDivisionsByUser(user.id, {startDate, endDate, divId});
        setAllDivisions(response.data.serializers.divisions);
        setStats(response.data.stats);
        setAttendanceStat(combineByDateDesc(addDateDesc(response.data.serializers.attendances, response.data.date_range)));
        setAbsentStat(absentCal(response.data.serializers.absents, response.data.date_range));

        setDateRange(response.data.date_range);
        setCardData([
          { metric: 'Total Practice Hours', value: `${(response.data.stats.attendedHours/3600).toFixed(1)}h`, change: '+1%' },
          { metric: 'Total Scheduled Hours', value: `${(response.data.stats.totalHours/3600).toFixed(1)}h`, change: '+0.4h' },
          { metric: 'Attendance Rate', value: `${(response.data.stats.attendancePercentage).toFixed(1)}%`, change: '+4%' },
          { metric: 'Songs Mastered', value: '8', change: '2 new' },
        ]);

      } catch(error) {
        console.error(error?.response?.data);
      }
    }
    loggedIn && fetchDivisions();
  }, [user, userUpdator, currentDiv, startDate, endDate])


  
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
          <p className="font-semibold font-inter-tight">{payload[0].payload.reason}</p>
          <p className="text-sm">{payload[0].value} Session{payload[0].value===1?'':'s'}</p>
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
  
  if(!loggedIn || stats.length === 0) return null;
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
            {capitalize(user.fname)}'s Analytics
          </h1>


          <div className="relative">
            <select 
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 
                        py-2 pl-2 pr-2 rounded-md leading-tight focus:outline-none focus:border-emerald-500
                        shadow-md hover:shadow-2xl hover:shadow-emerald-400 hover:border-emerald-300
                        font-poppins"
              onChange={(e) => setCurrentDiv(e.target.value)}
            >
              <option value="all">All</option>
              {allDivisions.map((item) => (
                <option key={item.id} value={item.id}>
                  {capitalize(item.name)}
                </option>
              ))}
            </select>
          </div>



          <div className="flex gap-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date.toISOString().split('T')[0])}
              customInput={<CustomInput />}
              placeholderText='Select Start Date'
              dateFormat='yyyy-MM-dd'
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date.toISOString().split('T')[0])}
              customInput={<CustomInput />}
              placeholderText='Select End Date'
              dateFormat='yyyy-MM-dd'
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
              Attendance Trend <span className='font-normal font-lora text-[18px] text-gray'> ({getDateRange(dateRange)})</span>
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
              Absence Trend <span className='font-normal font-lora text-[18px] text-gray'> ({getDateRange(dateRange)})</span>
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={absentStat.byDate}>
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
                    data={absentStat.byReason}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="reason"
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

        { attendanceStat &&
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
                  {attendanceStat.slice(-5).map((row, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                        {getDateDetails(row.venue_detail.date).date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600">
                        {row.attendance} out of {row.sessions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`inline-block ${getBgColor(Math.round(row.sessions>0?(row.attendance/row.sessions*100):0))}  
                          px-3 py-1 rounded-full text-sm font-medium`}>
                          {Math.round(row.sessions>0?(row.attendance/row.sessions*100):0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          }
        </div>


        
        {attendanceStat && 
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                {attendanceStat.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{getDateDetails(row.venue_detail.date).date2}</td>
                    <td className="px-6 py-4 text-right">{timeDiff(row.venue_detail.startTime, row.venue_detail.endTime)}</td>
                    <td className="px-6 py-4 text-right">{capitalize(row.venue_detail.role)}</td>
                    <td className="px-6 py-4 text-right">{(i + 2)%4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>}
      </div>
    </div>
  );
};











