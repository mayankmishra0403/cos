
import React, { useState } from 'react';
import { databases, appwriteConfig } from '../lib/appwrite';
import { ID } from 'appwrite';
import { Plus, Book, Briefcase, Loader2, CheckCircle, AlertCircle, FileText, Info } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'academics' | 'placements'>('academics');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Academics Form State
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [semester, setSemester] = useState('');
  const [unitsJson, setUnitsJson] = useState(`[
  { 
    "id": 1, 
    "title": "Unit Title Here", 
    "description": "Brief description of the unit...",
    "pdfLink": "https://drive.google.com/..."
  }
]`);

  // Placements Form State
  const [problemTitle, setProblemTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [topic, setTopic] = useState('');
  const [companies, setCompanies] = useState('');
  const [link, setLink] = useState('');

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      try {
        JSON.parse(unitsJson);
      } catch (err) {
        throw new Error("Invalid JSON format. Please check the syntax for commas and quotes.");
      }

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionIdAcademics,
        ID.unique(),
        {
          name: subjectName,
          code: subjectCode,
          semester: parseInt(semester),
          units: unitsJson 
        }
      );
      
      setSuccessMsg(`Subject '${subjectName}' added successfully.`);
      setSubjectName('');
      setSubjectCode('');
      setSemester('');
      // Reset JSON to template
      setUnitsJson(`[
  { 
    "id": 1, 
    "title": "Unit Title Here", 
    "description": "Brief description of the unit...",
    "pdfLink": "https://drive.google.com/..."
  }
]`);
    } catch (error: any) {
      setErrorMsg(error.message || 'Failed to add subject.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const companyArray = companies.split(',').map(c => c.trim()).filter(c => c);

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionIdPlacements,
        ID.unique(),
        {
          title: problemTitle,
          difficulty,
          topic,
          companies: companyArray,
          link
        }
      );
      
      setSuccessMsg(`Problem '${problemTitle}' added successfully.`);
      setProblemTitle('');
      setTopic('');
      setCompanies('');
      setLink('');
    } catch (error: any) {
      setErrorMsg(error.message || 'Failed to add problem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 mt-2">Manage content for Code of Shiksha.</p>
          </div>
          <div className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <CheckCircle size={14} />
            <span>Admin Verified</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-t-xl border border-slate-200 border-b-0 px-6 pt-4 flex space-x-6">
          <button
            onClick={() => { setActiveTab('academics'); setSuccessMsg(''); setErrorMsg(''); }}
            className={`pb-4 px-2 font-medium text-sm transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === 'academics' 
                ? 'text-indigo-600 border-indigo-600' 
                : 'text-slate-500 border-transparent hover:text-slate-700'
            }`}
          >
            <Book size={18} />
            <span>Academics & PDFs</span>
          </button>
          <button
            onClick={() => { setActiveTab('placements'); setSuccessMsg(''); setErrorMsg(''); }}
            className={`pb-4 px-2 font-medium text-sm transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === 'placements' 
                ? 'text-indigo-600 border-indigo-600' 
                : 'text-slate-500 border-transparent hover:text-slate-700'
            }`}
          >
            <Briefcase size={18} />
            <span>Placement Material</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-b-xl shadow-sm border border-slate-200 p-8">
          
          {/* Status Messages */}
          {successMsg && (
            <div className="mb-8 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center animate-in fade-in">
              <CheckCircle size={20} className="mr-3 text-green-600" /> 
              <span className="font-medium">{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center animate-in fade-in">
              <AlertCircle size={20} className="mr-3 text-red-600" /> 
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {activeTab === 'academics' ? (
            <form onSubmit={handleAddSubject} className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-slate-900">Subject Details</h3>
                  <p className="text-sm text-slate-500 mt-1">Define the course information for AKTU syllabus.</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject Name</label>
                    <input required type="text" value={subjectName} onChange={e => setSubjectName(e.target.value)} className="w-full border-slate-300 rounded-lg p-2.5 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Operating Systems" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Subject Code</label>
                      <input required type="text" value={subjectCode} onChange={e => setSubjectCode(e.target.value)} className="w-full border-slate-300 rounded-lg p-2.5 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. KCS-401" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Semester</label>
                      <input required type="number" value={semester} onChange={e => setSemester(e.target.value)} className="w-full border-slate-300 rounded-lg p-2.5 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. 4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-slate-900">Units & PDF Resources</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Add units using JSON format. Include <code className="bg-slate-100 px-1 rounded">pdfLink</code> to provide download buttons for students.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Units Data (JSON)</label>
                  <div className="relative">
                    <textarea 
                      required 
                      value={unitsJson} 
                      onChange={e => setUnitsJson(e.target.value)} 
                      rows={8} 
                      className="w-full bg-slate-50 border-slate-300 rounded-lg p-4 border font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500" 
                    />
                    <div className="absolute top-2 right-2">
                        <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded font-semibold">JSON Editor</span>
                    </div>
                  </div>
                  <div className="flex items-start mt-2 space-x-2 text-xs text-slate-500 bg-blue-50 p-2 rounded text-blue-800">
                    <Info size={16} className="mt-0.5 flex-shrink-0" />
                    <p>
                      Tip: Paste your Google Drive or hosting link in the "pdfLink" field. Ensure the link is publicly accessible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition shadow-lg flex items-center font-medium">
                  {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Plus size={18} className="mr-2" />}
                  Publish Academic Content
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAddProblem} className="space-y-8 animate-in fade-in duration-300">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-slate-900">Problem Info</h3>
                  <p className="text-sm text-slate-500 mt-1">Add a new DSA problem for placement prep.</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                   <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Problem Title</label>
                    <input required type="text" value={problemTitle} onChange={e => setProblemTitle(e.target.value)} className="w-full border-slate-300 rounded-lg p-2.5 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Two Sum" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
                      <input required type="text" value={topic} onChange={e => setTopic(e.target.value)} className="w-full border-slate-300 rounded-lg p-2.5 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Arrays, DP" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
                      <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full border-slate-300 rounded-lg p-2.5 border bg-white focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                  </div>
                </div>
               </div>

               <div className="border-t border-slate-100 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-1">
                    <h3 className="text-lg font-semibold text-slate-900">Company Tags & Link</h3>
                    <p className="text-sm text-slate-500 mt-1">Tag companies that asked this question.</p>
                 </div>
                 <div className="md:col-span-2 space-y-4">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Companies (Comma separated)</label>
                       <input required type="text" value={companies} onChange={e => setCompanies(e.target.value)} className="w-full border-slate-300 rounded-lg p-2.5 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Google, Amazon, Meta" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Problem URL</label>
                       <div className="relative">
                        <input required type="url" value={link} onChange={e => setLink(e.target.value)} className="w-full border-slate-300 rounded-lg p-2.5 pl-10 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://leetcode.com/..." />
                        <ExternalLinkIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                       </div>
                    </div>
                 </div>
               </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition shadow-lg flex items-center font-medium">
                  {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Plus size={18} className="mr-2" />}
                  Publish Problem
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper icon
const ExternalLinkIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

export default Admin;
