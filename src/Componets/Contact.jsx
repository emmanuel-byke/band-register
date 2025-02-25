import { Guitar } from "lucide-react";
import { capitalize } from "../assets";

export default function Contact() {
    return (
      <footer className="bg-gray-900 text-gray-300 font-lora rounded-t-[100px] mt-20" id="contact-us">
        
        <div className="container mx-auto px-4 pt-12">
          <div className="flex flex-row gap-8 justify-between">

            <div className="w-1/2">
                <div className="flex flex-row items-start gap-4">
                    <Guitar className="w-15 h-15 text-emerald-500" />
                    <h3 className="text-[30px] font-bold text-emerald-500">Band 
                        <span className="font-normal text-white"> Register</span></h3>
                </div>
                <p className="text-gray-500 text-justify mt-4">
                    Let everything that has breath praise the Lord. Praise the Lord! (Psalm 150:6) Come join our choir and lift your voice in 
                    praise as we make a joyful noise unto the Lord! 
                </p>
              
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Explore</h3>
              <ul className="space-y-1">
                {['home', 'division', 'schedules', 'activities', 'statistics'].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} className="text-gray hover:text-emerald-500 transition-colors">{capitalize(item)}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Support</h3>
              <ul className="space-y-1">
                {['register', 'Church Site', 'contact admin', 'complain'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray hover:text-emerald-500 transition-colors">{capitalize(item)}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* About Section */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Developer</h3>
              <ul className="space-y-1">
                {['Emmanuel Basikolo', '086467564', 'ebasikolo@unima.ac.mw'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-emerald-500 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            
          </div>
  
  
          <div className="flex flex-row items-start mt-10">
            <p className="text-sm text-gray-400">
              © 2025 emmanuel basikolo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  