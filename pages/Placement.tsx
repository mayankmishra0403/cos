import React, { useState, useMemo } from 'react';
import { PLACEMENT_PROBLEMS } from '../constants';
import { Problem, Difficulty } from '../types';
import { Code, Filter, Search, ExternalLink } from 'lucide-react';

const Placement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Extract unique companies for filter
  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    PLACEMENT_PROBLEMS.forEach(p => p.companies.forEach(c => companies.add(c)));
    return ['All', ...Array.from(companies)];
  }, []);

  const filteredProblems = PLACEMENT_PROBLEMS.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          problem.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany === 'All' || problem.companies.includes(selectedCompany);
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;

    return matchesSearch && matchesCompany && matchesDifficulty;
  });

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.EASY: return 'bg-green-100 text-green-800';
      case Difficulty.MEDIUM: return 'bg-yellow-100 text-yellow-800';
      case Difficulty.HARD: return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Code className="mr-3 text-indigo-600" /> Placement Preparation
          </h1>
          <p className="mt-2 text-slate-600">Master Data Structures and Algorithms with company-specific questions.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search problems or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full lg:w-auto">
             <div className="relative">
               <select 
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
               >
                 {allCompanies.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                 <Filter size={16} />
               </div>
             </div>

             <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
               >
                 <option value="All">All Difficulty</option>
                 <option value={Difficulty.EASY}>Easy</option>
                 <option value={Difficulty.MEDIUM}>Medium</option>
                 <option value={Difficulty.HARD}>Hard</option>
               </select>
          </div>
        </div>

        {/* Problem Table */}
        <div className="bg-white shadow overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Problem Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Topic</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Difficulty</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Companies</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredProblems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600 hover:underline cursor-pointer">{problem.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-600">
                        {problem.topic}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {problem.companies.slice(0, 2).join(', ')} {problem.companies.length > 2 && `+${problem.companies.length - 2}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end ml-auto">
                        Solve <ExternalLink size={14} className="ml-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredProblems.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No problems found matching your criteria.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Placement;