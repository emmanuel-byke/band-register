import { PictureInPicture, User } from "lucide-react";

export default function UserCard(props) {
    const name = `${props.user.fname} ${props.user.lname}`;
    
    return(
        <article className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-800">
    {/* Image Container with Gradient Overlay */}
    <div className="relative aspect-square">
        {
            props.user.profile_picture ?
                <img 
                    src={props.user.profile_picture}
                    alt={name}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                /> :
                <User className="w-full h-full object-cover text-emerald-600 transform transition-transform duration-300 group-hover:scale-105" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
    </div>

    {/* Content Overlay */}
    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
        <p className="text-emerald-400 font-medium text-sm">{props.userRole}</p>
    </div>

    {/* Hover Content */}
    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-emerald-400 text-sm font-medium">{props.userRole}</p>
            
            {/* Additional Info - Add more fields as needed */}
            <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-gray-900 text-gray-300 text-xs rounded-full">
                    Joined: 2023
                </span>
                <span className="px-3 py-1 bg-gray-900 text-gray-300 text-xs rounded-full">
                    ★ 4.9 Rating
                </span>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-4 mt-4">
                <button className="text-gray-300 hover:text-emerald-400 transition-colors">
                    <span className="sr-only">Profile</span>
                    👤
                </button>
                <button className="text-gray-300 hover:text-emerald-400 transition-colors">
                    <span className="sr-only">Message</span>
                    💬
                </button>
            </div>
        </div>
    </div>
</article>
    );
}