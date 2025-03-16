import { Activity, Edit, Image, Lock, MapPin, MessageSquare, MoreVertical, Shield, ShieldBan, Trash, Trash2, Unlock, User } from "lucide-react";
import { capitalize, getDateDetails, getFormattedTime } from "../assets";
import DropDown from "./DropDown";


export const UserCard = ({ user, currentUserId, onDetails, onMakeAdmin, onDeactivate, onDelete, onFeedback }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* User Image */}
      <div className="relative aspect-square bg-slate-100 flex justify-center items-center">
        {
          user.profile_picture?
          <img
            src={user.profile_picture}
            alt={`${user.fname} ${user.lname}`}
            className="w-full h-full object-cover object-center"
          /> :
        <User className={`w-60 h-60 ${user.is_admin&&user.is_active?'text-emerald-400': user.is_active? 'text-blue-400': 'text-red-400'}`} />
        }
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
              {capitalize(user.fname)} {capitalize(user.lname)}
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
                  label: user.is_admin? "Revoke Admin" : "Make Admin",
                  icon: user.is_admin?
                    <ShieldBan className="w-4 h-4 mr-2" />
                    :<Shield className="w-4 h-4 mr-2" />,
                  onClick: onMakeAdmin
                },
                {
                  label: "Send Feedback",
                  icon: <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />,
                  onClick: onFeedback
                },
                {
                  type: 'divider'
                },
                {
                  label: `${user.is_active?'Dea':'A'}ctivate Account`,
                  icon: user.is_active?
                    <Lock className="w-4 h-4 mr-2 text-amber-600" />
                    :<Unlock className="w-4 h-4 mr-2 text-emerald-400"/>,
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
  
export const ScheduleCard = ({ item, type, onEdit, onDelete }) => (
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
              {type === 'venue' ? <MapPin className='w-24 h-24 text-indigo-600'/>: <Image className='w-24 h-24'/>}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">
              {type === 'activity' ? item.title : item.role===''? 'New Activity' : `${item.role} - ${item.place}` }
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {type === 'activity' 
                ? getDateDetails(item.venue.date).date2
                : `${getDateDetails(item.date).date2} | ${getFormattedTime(item.startTime)} - ${getFormattedTime(item.endTime)}`
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
  
export const AttendanceCard = ({ request, onApprove, onReject }) => {
    console.log(request)
  
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="text-slate-500 text-lg font-medium">
                {request.user_detail.firstname[0]}{request.user_detail.lastname[0]}
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">
              {request.user_detail.firstname} {request.user_detail.lastname}
            </h4>
            <p className="text-sm text-slate-500">
              {`${capitalize(request.division_detail.name)} ${capitalize(request.division_detail.role)} on 
               ${getDateDetails(request.venue_detail.date).date2}`}
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
  
  