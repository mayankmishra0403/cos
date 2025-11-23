import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold text-white">Code of Shiksha</p>
            <p className="text-sm mt-1">Empowering AKTU Students & Future Developers</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-4 text-center text-xs">
          &copy; {new Date().getFullYear()} Code of Shiksha. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;