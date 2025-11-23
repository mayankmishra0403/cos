import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-indigo-700 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Master <span className="text-yellow-400">AKTU Exams</span> & Crack <span className="text-yellow-400">Top Placements</span>
          </h1>
          <p className="text-lg lg:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Code of Shiksha provides simplified unit-wise notes for university exams and curated DSA sheets for your dream job. Powered by AI guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/academics" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-white hover:bg-indigo-50 transition shadow-lg"
            >
              Start Learning <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link 
              to="/ai-tutor" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-500 hover:bg-indigo-400 transition shadow-lg bg-opacity-40 backdrop-blur-sm border-indigo-400"
            >
              Ask AI Tutor <Sparkles className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-slate-100">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Academic Excellence</h3>
            <p className="text-slate-600">
              Unit-wise simplified notes tailored strictly to the AKTU syllabus. Downloadable revision materials to save time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-slate-100">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Placement Ready</h3>
            <p className="text-slate-600">
              Structured DSA problem sets categorized by companies (Google, Amazon) and difficulty levels.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-slate-100">
            <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="text-purple-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">AI Doubt Solving</h3>
            <p className="text-slate-600">
              A 24/7 virtual teacher powered by Gemini 2.5 to clear doubts instantly and provide code examples.
            </p>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="bg-indigo-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-around items-center text-center">
          <div className="mb-8 md:mb-0">
            <div className="text-4xl font-bold text-yellow-400">500+</div>
            <div className="text-indigo-200 mt-2">DSA Problems</div>
          </div>
          <div className="mb-8 md:mb-0">
            <div className="text-4xl font-bold text-yellow-400">20+</div>
            <div className="text-indigo-200 mt-2">AKTU Subjects</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-400">24/7</div>
            <div className="text-indigo-200 mt-2">AI Support</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;