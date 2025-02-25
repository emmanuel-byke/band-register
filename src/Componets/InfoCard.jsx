import { getDateDetails, getFormattedTime } from "../assets";



export default function InfoCard(props) {
    const date = getDateDetails(props.card.date);
    const fromTime = getFormattedTime(props.card.from);
    const endTime = getFormattedTime(props.card.to);

    return (
        <header 
            className="bg-gray-800 h-35 w-100 rounded-xl shadow-4xl hover:border-b-4 hover:border-l-1 border-blue-500 cursor-pointer"
            onClick={()=>props.setIsOpen(prev=>!prev)}>

            <div className="flex flex-row items-center">
                <img 
                    src={props.card.img} 
                    alt={props.card.place} 
                    className="w-[100px] h-[140px] object-contain rounded-xl"
                />
                <div className="flex flex-col ">
                    <h2 className="text-[23px] font-bold font-montserrat text-white">{date.dayName} 
                        <span className="font-montserrat-alt text-blue-500"> {props.card.place}</span>
                    </h2>
                    <p className="text-[14px] text-white font-merienda">{fromTime}-{endTime} {props.card.role} </p>
                </div>
            </div>
        </header>
    );
}