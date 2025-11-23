import React, { useState, useMemo, useEffect } from 'react';
import { Problem, Difficulty } from '../types';
import { Search, ExternalLink, Loader2, AlertCircle, Filter, ChevronDown } from 'lucide-react';
import { databases, DATABASE_ID, COLLECTION_ID_PLACEMENTS } from '../lib/appwrite';

const Placement: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_PLACEMENTS
        );
        
        const mappedProblems: Problem[] = response.documents.map((doc: any) => ({
          id: doc.$id,
          title: doc.title,
          difficulty: doc.difficulty as Difficulty,
          companies: doc.companies || [],
          topic: doc.topic,
          link: doc.link
        }));

        setProblems(mappedProblems);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
        setError("Failed to load placement problems.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    problems.forEach(p => p.companies.forEach(c => companies.add(c)));
    return ['All', ...Array.from(companies)];
  }, [problems]);

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          problem.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany === 'All' || problem.companies.includes(selectedCompany);
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;

    return matchesSearch && matchesCompany && matchesDifficulty;
  });

  const getDifficultyBadge = (diff: string) => {
    const d = diff.toLowerCase();
    if (d === 'easy') return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
    if (d === 'medium') return 'bg-amber-50 text-amber-700 ring-amber-600/20';
    if (d === 'hard') return 'bg-rose-50 text-rose-700 ring-rose-600/20';
    return 'bg-slate-50 text-slate-600 ring-slate-500/10';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-900" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Placement Preparation</h1>
                <p className="mt-2 text-slate-600 max-w-2xl">
                    Master Data Structures & Algorithms with our curated list of problems asked in top product-based companies.
                </p>
            </div>
            <div className="flex-shrink-0">
                 <span className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200">
                    {problems.length} Problems
                 </span>
            </div>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center text-sm shadow-sm">
                <AlertCircle className="mr-2" size={16} /> {error}
            </div>
        )}

        {/* Toolbar */}
        <div className="bg-white p-5 rounded-t-2xl border border-slate-200 border-b-0 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center z-10 relative">
          <div className="relative w-full lg:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border-0 py-2.5 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow"
              placeholder="Search by title or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
             <div className="relative w-full sm:w-48">
                 <select 
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="block w-full appearance-none rounded-lg border-0 py-2.5 pl-3 pr-10 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                 >
                     {allCompanies.map(c => <option key={c} value={c}>{c === 'All' ? 'All Companies' : c}</option>)}
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <Filter size={14} />
                 </div>
             </div>

             <div className="relative w-full sm:w-40">
                 <select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="block w-full appearance-none rounded-lg border-0 py-2.5 pl-3 pr-10 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                 >
                     <option value="All">All Difficulty</option>
                     <option value={Difficulty.EASY}>Easy</option>
                     <option value={Difficulty.MEDIUM}>Medium</option>
                     <option value={Difficulty.HARD}>Hard</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <ChevronDown size={14} className="opacity-0" /> {/* Spacer hack */}
                    <div className="h-4 w-4 bg-slate-400 rounded-full" style={{clipPath: 'polygon(50% 100%, 0 0, 100% 0)'}}></div>
                 </div>
             </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden shadow-sm ring-1 ring-slate-200 rounded-b-2xl bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                <tr>
                    <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Problem Title</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Topic</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Difficulty</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Companies</th>
                    <th scope="col" className="relative py-4 pl-3 pr-6">
                    <span className="sr-only">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                {filteredProblems.map((problem) => (
                    <tr key={problem.id} className="group hover:bg-slate-50/80 transition-colors duration-200">
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-slate-900">
                        {problem.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 font-mono text-xs">{problem.topic}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getDifficultyBadge(problem.difficulty)}`}>
                        {problem.difficulty}
                        </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        <div className="flex flex-wrap gap-1">
                            {problem.companies.slice(0, 2).map((c, i) => (
                                <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                                    {c}
                                </span>
                            ))}
                            {problem.companies.length > 2 && <span className="text-slate-400 text-xs self-center">+{problem.companies.length - 2}</span>}
                        </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                        <a 
                            href={problem.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-900 hover:underline decoration-indigo-300 underline-offset-4 transition-all"
                        >
                        Solve <ExternalLink size={14} className="ml-1 opacity-70" />
                        </a>
                    </td>
                    </tr>
                ))}
                {filteredProblems.length === 0 && (
                    <tr>
                        <td colSpan={5} className="px-6 py-16 text-center text-slate-500 text-sm">
                            <div className="flex flex-col items-center justify-center">
                                <Search className="h-8 w-8 text-slate-300 mb-2" />
                                <p>No problems match your filters.</p>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placement;