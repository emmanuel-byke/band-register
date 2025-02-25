import { useContext } from "react";
import { AppContext } from '../AppProvider';
import ImageChooser from "./ImageChooser";


export default function Hero() {
    const{ loggedIn } = useContext(AppContext)

    return(
        <header className="w-full pb-60 bg-gradient-to-r from-[#F59763] to-[#3863B7]" id="home">
            <div className="flex flex-row flex-wrap justify-center gap-40 items-center pt-10 ml-3 mr-3 ">
                <div className="w-150 flex flex-col justify-center items-center text-white font-lora">
                    <h1 className="text-[60px] text-center ">
                        Sing For The Lord <br/>Our <span className="text-black">GOD</span>
                    </h1>
                    <p className="text-[25px] text-justify font-montserrat-alt">
                        We are devoted to glorifying our Lord God through the power of song. Our voices unite in harmonious praise, 
                        transcending boundaries and touching hearts. Join us as we lift our spirits and celebrate His boundless grace 
                        through music. "Sing to the Lord, for He has done glorious things; let this be known to all the world."
                    </p>
                    <p className="text-gray-300 text-[20px] font-montserrat">➡Isaiah 12:5, NIV</p>
                </div>
                {
                    (loggedIn != null && loggedIn != undefined && loggedIn)?
                        <ImageChooser  />
                        : <></>
                }
            </div>
        </header>
    );
}