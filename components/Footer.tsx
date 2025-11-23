import React from 'react';
import { GraduationCap, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted border-t border-border text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap size={32} className="text-primary" />
              <span className="text-xl font-bold text-foreground">Code of Shiksha</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Empowering AKTU students and aspiring developers with comprehensive learning resources and AI-powered guidance.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Github size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter size={20} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/academics" className="hover:text-foreground transition-colors hover:underline">
                  Academic Resources
                </Link>
              </li>
              <li>
                <Link to="/placements" className="hover:text-foreground transition-colors hover:underline">
                  Placement Prep
                </Link>
              </li>
              <li>
                <Link to="/ai-tutor" className="hover:text-foreground transition-colors hover:underline">
                  AI Tutor
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-foreground transition-colors hover:underline">
                  Study Materials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors hover:underline">
                  DSA Problems
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors hover:underline">
                  Previous Papers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors hover:underline">
                  Interview Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:support@codeofshiksha.com" className="hover:text-foreground transition-colors">
                  support@codeofshiksha.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-foreground font-semibold mb-2">Stay Updated</h4>
              <p className="text-xs text-muted-foreground mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-background text-foreground rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring border border-border flex-1"
                />
                <Button className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Code of Shiksha. All rights reserved. Made with ❤️ for AKTU Students.
            </div>
            <div className="flex space-x-6 text-xs">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;