import { useContext } from "react";
import { AppContext } from '../AppProvider';
import ChooserCard from "./ChooserCard";
import { NavLink } from "react-router-dom";
import { getUser } from "../assets";

export default function ImageChooser() {
    const{ currentInstr, setCurrentInstr, userId } = useContext(AppContext)
    const user = getUser(userId);

    return (
        <header className="w-100 h-100 rounded-sm shadow-xl hover:shadow-2xl">
            <div className="flex flex-col items-center justify-center">
                {
                    currentInstr?
                        <NavLink 
                            to={`/instrument/detail/${currentInstr.id}`} 
                            className="flex justify-center"
                            state={currentInstr}>
                                <img
                                    src={currentInstr.value}
                                    alt={currentInstr.name}
                                    className="w-[400px] h-[400px] object-contain transform transition-transform duration-500 hover:scale-120"
                                />
                        </NavLink> : Object.values(user.divisions).length>0?
                        <div className="h-[400px] flex justify-center items-center">
                            <h1 className="text-[30px] text-gray-300 text-center font-montserrat">
                                Please select any <span className="text-emerald-300">Instrument</span>
                            </h1>
                        </div> :
                        <></>
                }
                <div className="w-full h-full pt-6 flex justify-center">
                    {
                        (user && user.divisions)?
                            Object.values(user.divisions).map((item, index) => (
                                <ChooserCard 
                                    key={index}
                                    currentImg={currentInstr}
                                    setCurrentImg={setCurrentInstr}
                                    item={item}
                                />
                        )):
                        <></>
                    }
                </div>
            </div>
        </header>
    );
}