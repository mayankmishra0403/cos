import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Briefcase, GraduationCap, Menu, X, Sparkles, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Academics', path: '/academics', icon: <BookOpen size={18} />, protected: false },
    { name: 'Placements', path: '/placements', icon: <Briefcase size={18} />, protected: false },
    { name: 'AI Tutor', path: '/ai-tutor', icon: <Sparkles size={18} />, protected: false },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm' 
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-slate-900 text-white p-1.5 rounded-lg transition-transform duration-300 group-hover:scale-110">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                Code of Shiksha
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}

              <div className="h-4 w-px bg-slate-200 mx-2"></div>

              {/* Only show Admin link if logged in as admin */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 mr-2 transition-colors"
                >
                  Admin
                </Link>
              )}

              {user ? (
                <div className="flex items-center gap-4 ml-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <User size={14} className="text-indigo-600"/>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-slate-400 hover:text-red-600 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 animate-in slide-in-from-top-2 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 block px-3 py-3 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-slate-50 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {isAdmin && (
               <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                Admin Dashboard
              </Link>
            )}

            {user && (
              <div className="border-t border-slate-100 pt-3 mt-3 px-3">
                   <div className="flex items-center gap-2 mb-3 text-slate-900 font-medium px-2">
                      <div className="bg-indigo-50 p-1 rounded-full">
                        <User size={16} className="text-indigo-600" />
                      </div>
                      {user.name}
                   </div>
                   <button
                    onClick={handleLogout}
                    className="block w-full text-left rounded-lg bg-red-50 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-100 transition-colors"
                   >
                     Sign Out
                   </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;