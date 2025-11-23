
import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center space-x-3">
             <div className="bg-slate-800 p-2 rounded-lg text-white">
                <GraduationCap size={20} />
             </div>
             <div>
                <p className="text-lg font-bold text-white tracking-tight">Code of Shiksha</p>
                <p className="text-xs text-slate-500 mt-0.5">Empowering Students & Developers</p>
             </div>
          </div>
          <div className="flex space-x-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Contact Support</a>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-900 pt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Code of Shiksha. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
