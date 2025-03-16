import { Calendar, Clock, Music, User } from 'lucide-react';
import React, { useContext } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AppContext } from '../AppProvider';
import { capitalize, getStat, getUser } from "../assets";
import SectionDivider from "./SectionDivider";

export default function StatisticalSummary() {

  const{ userId, loggedIn } = useContext(AppContext)
  if(loggedIn) {
    const user = getUser(userId);
    const stats = getStat(user, "", "", true, 1.3);


    const getStatusColor = (percentage) => {
      if (percentage >= 90) return 'text-green-500';
      if (percentage >= 60) return 'text-yellow-500';
      return 'text-red-500';
    };

    const getBgColor = (percentage) => {
      if (percentage >= 80) return `bg-green-500/30`;
      if (percentage >= 60) return `bg-yellow-500/30`;
      return `bg-red-500/${100-percentage}`;
    };

    const item = (title, desc, ico, autoCol=false, value=0, borderColor="border-blue-500") => {
      return(
        <div 
          className={`w-100 h-20 flex items-center gap-7 p-4 bg-gray-200 rounded-lg hover:border-b-4 hover:border-l-1
            ${borderColor} hover:bg-gray-300 cursor-pointer`}
        >
          {ico()}
          <div>
            <p className="text-2xl text-gray-600 font-bold font-montserrat">{title}</p>
            <p className={`text-xl font-bold ${autoCol?getStatusColor(value):""} font-montserrat-alt`}>{desc}</p>
          </div>
        </div>
      );
    }

    return(
      <header className='flex flex-col justify-center items-center gap-12'>
        <div className="mt-40" id="statistics">
            <SectionDivider value="Statistical Overview" />
        </div>

        <div className='flex flex-row gap-4 mt-8'>
          <Music className="h-10 w-10 stroke-green-500" />
          <h2 className='text-[30px] text-gray font-montserrat font-bold' >Attendance Overview for
            <span className='text-green-500'> {capitalize(user.details.username)}</span>
          </h2>
        </div>

        <div className={`flex flex-row justify-center items-start flex-wrap gap-2`}>
          <div className={`flex flex-row justify-center items-center`}>
            <div className="flex flex-col justify-center items-center gap-2 ">
              {
                item("Total Sessions", stats.totalSessions, ()=>(<Calendar className="h-10 w-10 text-blue-500" />))
              }
              {
                item("Training Hours", stats.attendedHours, ()=>(<Clock className="h-10 w-10 text-purple-500" />), 
                  true, stats.attendancePercentage, "border-purple-500")
              }
              {
                item("Attendance Rate", `${stats.attendancePercentage}%`, ()=>(<User className="h-10 w-10 text-green-500" />), 
                  true, stats.attendancePercentage, "border-green-500")
              }
            </div>
          </div>

            <div className='w-110 h-68 rounded-2xl hover:border-b-3 hover:border-l-1 border-blue-500 hover:shadow-2xl'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.attendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ angle: -45, textAnchor: 'end' }} interval={1} />
                  <YAxis domain={[0, 15]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey='attendance' 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            { stats.attendance.length > 0 &&
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Month
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
                    {stats.attendance.slice(-6).map((row, index) => (
                      <tr 
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                          {row.month}
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
      </header>
    );
  }
  return <></>;
  
};