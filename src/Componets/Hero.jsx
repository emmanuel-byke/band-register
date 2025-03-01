import { useContext } from "react";
import { AppContext } from '../AppProvider';
import ImageChooser from "./ImageChooser";


export default function Hero() {
    const{ loggedIn } = useContext(AppContext)

    return(
        <header className="w-full bg-gradient-to-br from-sky-50 to-blue-50 py-16 md:py-24" id="home">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-center md:text-left space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-lora leading-tight">
                            Sing For The Lord <br />
                            Our <span className="text-blue-600">God</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 font-montserrat-alt leading-relaxed max-w-2xl">
                            We are devoted to glorifying our Lord God through the power of song. Our voices unite in harmonious praise, 
                            transcending boundaries and touching hearts. Join us as we lift our spirits and celebrate His boundless grace 
                            through music.
                        </p>

                        <div className="flex items-center justify-center md:justify-start space-x-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 text-blue-500" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 
                                    5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V11a1 1 0 001 1h2a1 1 0 001-1V7.5A1.5 1.5 0 0114.5 6c.525 0 .988.27 
                                    1.256.321a6.027 6.027 0 012.58 3.072 6.028 6.028 0 01-1.073 6.413c-.23.248-.495.465-.783.647a.75.75 0 
                                    01-.833-1.248c.22-.147.42-.31.6-.487A4.5 4.5 0 0010 3.5 4.5 4.5 0 004.332 8.027z" clipRule="evenodd" />
                            </svg>
                            <p className="text-gray-500 font-montserrat italic">
                                "Sing to the Lord, for He has done glorious things; let this be known to all the world."
                                <span className="block text-sm mt-1 text-gray-400">Isaiah 12:5, NIV</span>
                            </p>
                        </div>
                    </div>

                    {/* Image Section */}
                    {loggedIn && (
                        <div className="relative group flex justify-center md:justify-end">
                            <div className="relative w-full max-w-md">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-sky-100 rounded-2xl shadow-lg 
                                    transform rotate-1 group-hover:rotate-0 transition-transform"></div>
                                <div className="relative rounded-2xl bg-white shadow-lg overflow-hidden transition-transform duration-300 
                                    hover:scale-105">
                                    <ImageChooser />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}