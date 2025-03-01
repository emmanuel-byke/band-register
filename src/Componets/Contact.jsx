import { Guitar, Mail, Phone, MapPin } from "lucide-react";
import { capitalize } from "../assets";

export default function Contact() {
    return (
      <footer className="bg-gray-950 text-gray-300 rounded-t-3xl mt-24" id="contact-us">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Branding Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Guitar className="w-16 h-16 text-emerald-400 hover:text-emerald-300 transition-colors" />
                <h3 className="text-2xl font-bold text-white">
                  Band<span className="text-emerald-400">Register</span>
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                "Let everything that has breath praise the Lord. Praise the Lord!" 
                <span className="block mt-2 text-sm italic">Psalm 150:6</span>
              </p>
              <p className="text-gray-400 text-sm mt-4">
                Join our musical ministry and elevate your worship through song
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
              <nav className="space-y-3">
                {['home', 'divisions', 'schedules', 'activities', 'statistics'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`} 
                    className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {capitalize(item)}
                  </a>
                ))}
              </nav>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <div className="space-y-3">
                {['Registration Help', 'Church Portal', 'Contact Leadership', 'Feedback'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-400">University of Malawi</p>
                    <p className="text-gray-400 text-sm">Music Ministry Department</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <a href="tel:+26586467564" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    +265 86 467 564
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <a href="mailto:ebasikolo@unima.ac.mw" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    ebasikolo@unima.ac.mw
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 text-center">
                © 2025 Emmanuel Basikolo. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
};