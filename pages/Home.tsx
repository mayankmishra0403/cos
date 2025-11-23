import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white border-b border-slate-100">
        {/* Subtle background gradient mesh */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-32 items-center">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-200 mb-6 hover:bg-slate-200 transition-colors cursor-default">
                <Sparkles size={12} className="mr-1.5 text-indigo-500" />
                Code of Shiksha v1.0
              </span>
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-[1.1]">
              Master your Exams <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
                Crack Placements
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-lg mx-auto lg:mx-0">
              A unified, intelligent platform tailored for AKTU students. Get simplified academic notes and company-specific coding preparation in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-x-6 gap-y-4 justify-center lg:justify-start">
              <Link
                to="/academics"
                className="w-full sm:w-auto rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Start Learning
              </Link>
              <Link to="/ai-tutor" className="text-sm font-semibold leading-6 text-slate-900 flex items-center group hover:text-indigo-600 transition-colors">
                Ask AI Tutor <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32 w-full lg:w-1/2">
            <div className="relative w-full max-w-lg mx-auto">
                {/* Decorative blob */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
                
                <div className="relative rounded-2xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:rounded-3xl lg:p-4 backdrop-blur-sm">
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                          <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">learning_path.js</div>
                      </div>
                      <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                          <div className="text-slate-400 mb-2">// Initialize your future</div>
                          <div className="text-purple-600 font-bold">const <span className="text-slate-800 font-normal">student</span> = <span className="text-yellow-600">new</span> <span className="text-blue-600">Engineer</span>();</div>
                          <div className="mt-2">
                              <span className="text-blue-600">student</span>.<span className="text-indigo-600">loadResources</span>({'{'}
                              <br/>&nbsp;&nbsp;platform: <span className="text-green-600">'Code of Shiksha'</span>,
                              <br/>&nbsp;&nbsp;goal: <span className="text-green-600">'Success'</span>
                              <br/>{'}'});
                          </div>
                          <div className="mt-2">
                              <span className="text-blue-600">await</span> <span className="text-blue-600">student</span>.<span className="text-indigo-600">crackPlacement</span>(<span className="text-slate-900">['Google', 'Amazon']</span>);
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded">
                              <CheckCircle2 size={14} />
                              <span>Output: Offer Letter Received!</span>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Comprehensive Learning</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything structured for your success
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
             Bridging the gap between university curriculum and industry expectations with a clean, focused approach.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {[
              {
                title: 'Academic Excellence',
                desc: 'Unit-wise notes aligned with AKTU syllabus. Download PDF resources and simplified explanations.',
                icon: <BookOpen className="h-6 w-6 text-white" />,
                link: '/academics',
                color: 'bg-blue-600'
              },
              {
                title: 'Placement Ready',
                desc: 'Curated DSA sheets categorized by difficulty and company tags. Prepare specifically for interviews.',
                icon: <Briefcase className="h-6 w-6 text-white" />,
                link: '/placements',
                color: 'bg-slate-900'
              },
              {
                title: 'AI Tutor Support',
                desc: 'Stuck on a concept? Our AI tutor provides instant explanations, code snippets, and study guidance.',
                icon: <Sparkles className="h-6 w-6 text-white" />,
                link: '/ai-tutor',
                color: 'bg-indigo-600'
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative flex flex-col bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <dt className="text-xl font-bold leading-7 text-slate-900">
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-500">
                  <p className="flex-auto">{feature.desc}</p>
                  <p className="mt-8">
                    <Link to={feature.link} className="text-sm font-semibold leading-6 text-slate-900 flex items-center group-hover:text-indigo-600 transition-colors">
                      Explore <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-y border-slate-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {[
              { label: 'Total Problems', value: '500+' },
              { label: 'University Subjects', value: '25+' },
              { label: 'Active Students', value: '1000+' }
            ].map((stat, idx) => (
              <div key={idx} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-sm leading-7 text-slate-500 font-medium uppercase tracking-wider">{stat.label}</dt>
                <dd className="order-first text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Home;