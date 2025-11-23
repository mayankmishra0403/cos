import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Briefcase, GraduationCap, Menu, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Academics', path: '/academics', icon: <BookOpen size={18} /> },
    { name: 'Placements', path: '/placements', icon: <Briefcase size={18} /> },
    { name: 'AI Tutor', path: '/ai-tutor', icon: <Sparkles size={18} /> },
  ];

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <GraduationCap size={32} className="text-primary" />
              <span className="font-bold text-xl tracking-tight text-foreground">Code of Shiksha</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  asChild
                  variant={isActive(link.path) ? "default" : "ghost"}
                  size="sm"
                >
                  <Link to={link.path} className="flex items-center space-x-1">
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant={isActive(link.path) ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setIsOpen(false)}
              >
                <Link to={link.path} className="flex items-center space-x-2">
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;