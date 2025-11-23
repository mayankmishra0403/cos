
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Briefcase, GraduationCap, Menu, X, Sparkles, LogIn, LogOut, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Academics', path: '/academics', icon: <BookOpen size={18} /> },
    { name: 'Placements', path: '/placements', icon: <Briefcase size={18} /> },
    { name: 'AI Tutor', path: '/ai-tutor', icon: <Sparkles size={18} /> },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin', icon: <ShieldCheck size={18} /> });
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap size={32} className="text-indigo-600" />
              <div className="flex flex-col">
                 <span className="font-bold text-lg leading-tight text-slate-800">Code of Shiksha</span>
                 <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Smart Learning</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-600 flex items-center">
                  <User size={16} className="mr-2 text-slate-400" />
                  {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-50 inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            <div className="border-t border-slate-100 my-2 pt-2">
              {user ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex w-full items-center space-x-3 px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={18} />
                  <span>Sign Out ({user.name})</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-2 p-2">
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-4 py-2 border border-slate-300 rounded-md text-slate-700 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-4 py-2 bg-indigo-600 rounded-md text-white font-medium"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
