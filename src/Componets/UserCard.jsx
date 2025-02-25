
export default function UserCard(props) {
    const name = `${props.user.details.firstname} ${props.user.details.lastname}`;
    
    return(
        <header className="flex flex-col justify-items-center transform transition-transform duration-300 hover:scale-120 cursor-pointer">
            <div className="w-55 h-70 border-r-1 border-b-4 border-blue-400 rounded-3xl flex justify-center items-center">
                <img 
                    src={props.user.details.picture}
                    alt={name}
                    className="w-[217px] h-[277px] object-contain rounded-3xl"
                />
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-gray-300 text-[30px]">{name}</h1>
                <p className="text-gray-500 text-[20px]">{props.userRole}</p>
            </div>
        </header>
    );
}