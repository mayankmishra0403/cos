
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-indigo-700 py-20 lg:py-32 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-800 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-800 bg-opacity-50 text-indigo-200 text-sm font-semibold mb-6 border border-indigo-600">
             Smart Learning & Placement Platform
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Master <span className="text-yellow-400">AKTU Exams</span> <br/> 
            & Crack <span className="text-yellow-400">Top Placements</span>
          </h1>
          <p className="text-lg lg:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Code of Shiksha simplifies your engineering journey. Get unit-wise notes, company-specific DSA sheets, and 24/7 AI mentorship in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/academics" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 transition-all shadow-xl transform hover:-translate-y-1"
            >
              Start Learning <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link 
              to="/ai-tutor" 
              className="inline-flex items-center justify-center px-8 py-4 border border-indigo-400 text-base font-bold rounded-xl text-white bg-indigo-800/40 hover:bg-indigo-800/60 transition-all shadow-lg backdrop-blur-sm"
            >
              Ask AI Tutor <Sparkles className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Code of Shiksha?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">We bridge the gap between academic curriculum and industry requirements.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <BookOpen className="text-blue-600 group-hover:text-white transition-colors duration-300" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Academic Excellence</h3>
            <p className="text-slate-600 leading-relaxed">
              Access simplified, unit-wise notes tailored strictly to the AKTU syllabus. Download revision materials and previous year papers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
            <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
              <Briefcase className="text-green-600 group-hover:text-white transition-colors duration-300" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Placement Ready</h3>
            <p className="text-slate-600 leading-relaxed">
              Practice with structured DSA problem sets categorized by companies (Google, Amazon) and difficulty levels.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
            <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
              <Sparkles className="text-purple-600 group-hover:text-white transition-colors duration-300" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">AI Doubt Solving</h3>
            <p className="text-slate-600 leading-relaxed">
              A 24/7 virtual AI teacher powered by Gemini to clear doubts instantly, explain complex logic, and provide code examples.
            </p>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="bg-slate-900 py-16 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">500+</div>
            <div className="text-slate-400 font-medium">Curated DSA Problems</div>
          </div>
          <div className="p-4">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-2">20+</div>
            <div className="text-slate-400 font-medium">AKTU Subjects Covered</div>
          </div>
          <div className="p-4">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">24/7</div>
            <div className="text-slate-400 font-medium">Intelligent AI Support</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
